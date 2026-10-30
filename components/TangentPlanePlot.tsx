"use client";

import { useEffect, useRef, useState } from "react";

type Point = [number, number, number];
type Color = [number, number, number, number];
type Scene = {
  heightLabels?: boolean;
  faces: { points: Point[]; color: Color }[];
  lines: { points: Point[]; color: Color; width: number; dashed: boolean }[];
  dots: Point[];
  labels: { point: Point; text: string; color: Color; size: number; align: CanvasTextAlign; background: boolean }[];
  limits: [number, number][];
  aspect: number[];
  legends: { title: string; items: { color: string; title: string; body: string; dashed: boolean }[] }[];
};

/** Converts Matplotlib RGBA to canvas color; e.g. [1, 0, 0, 1] becomes opaque red. */
function rgba(color: Color) {
  return `rgba(${color.slice(0, 3).map((channel) => Math.round(channel * 255)).join(",")},${color[3]})`;
}

/**
 * Rotates the fixed geometry exported from a Python construction, with no endpoint, pan, or zoom controls.
 * Example: the real endpoint stays (0.8, 0.2, 0.68) while dragging changes only the camera.
 * The orthographic view preserves parallel guides; Reset restores elevation 18°, azimuth -68°.
 * Surface and start/end coordinates occupy the first caption line; both steps share the second line above Reset.
 * A compact Legend stays beside the canvas, preserving the Python plot's original labels and explanations.
 * Example: dataPath `/plots/canceling-height-changes.json` selects test.py's orange/green cancellation plot.
 */
export function TangentPlanePlot({ dataPath = "/plots/tangent-plane.json" }: { dataPath?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const camera = useRef({ elevation: 18, azimuth: -68 });
  const redraw = useRef<() => void>(() => {});
  const [scene, setScene] = useState<Scene | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(dataPath, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Plot data could not be loaded");
        return response.json();
      })
      .then(setScene)
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, [dataPath]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !scene) return;
    const context = canvas.getContext("2d");
    if (!context) { setError(true); return; }
    let frame = 0;
    let pointer: { id: number; x: number; y: number } | null = null;

    /** Projects a fixed 3D point into the responsive orthographic camera; y limits remain reversed. */
    function project(point: Point, width: number, height: number): Point {
      const p = point.map((value, index) => {
        const [low, high] = scene!.limits[index];
        return ((value - low) / (high - low) - 0.5) * scene!.aspect[index];
      });
      const az = camera.current.azimuth * Math.PI / 180;
      const el = camera.current.elevation * Math.PI / 180;
      const scale = Math.min(width, height) * 0.43;
      return [
        width / 2 + (-Math.sin(az) * p[0] + Math.cos(az) * p[1]) * scale,
        height / 2 - (-Math.sin(el) * Math.cos(az) * p[0] - Math.sin(el) * Math.sin(az) * p[1] + Math.cos(el) * p[2]) * scale,
        Math.cos(el) * Math.cos(az) * p[0] + Math.cos(el) * Math.sin(az) * p[1] + Math.sin(el) * p[2]
      ];
    }

    /** Draws far mesh faces first, then the source's high-visibility guide lines, dots, and labels. */
    function draw() {
      if (!canvas || !context || !scene) return;
      const { width, height } = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const faces = scene.faces.map((face) => {
        const points = face.points.map((point) => project(point, width, height));
        return { ...face, points, depth: points.reduce((sum, point) => sum + point[2], 0) / points.length };
      }).sort((a, b) => a.depth - b.depth);
      for (const face of faces) {
        context.beginPath();
        face.points.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y));
        context.closePath();
        context.fillStyle = rgba(face.color);
        context.fill();
      }
      for (const line of scene.lines) {
        context.beginPath();
        line.points.forEach((point, index) => {
          const [x, y] = project(point, width, height);
          if (index) context.lineTo(x, y); else context.moveTo(x, y);
        });
        context.strokeStyle = rgba(line.color);
        context.lineWidth = line.width;
        context.setLineDash(line.dashed ? [5, 4] : []);
        context.stroke();
      }
      context.setLineDash([]);
      for (const point of scene.dots) {
        const [x, y] = project(point, width, height);
        context.beginPath(); context.arc(x, y, 2.8, 0, 2 * Math.PI);
        context.fillStyle = "black"; context.fill();
      }
      for (const label of scene.labels) {
        const [x, y] = project(label.point, width, height);
        context.font = `${label.size + 1}px Arial`;
        context.textAlign = label.align;
        context.textBaseline = "middle";
        if (label.background) {
          const textWidth = context.measureText(label.text).width;
          context.fillStyle = "rgba(255,255,255,.85)";
          context.fillRect(x - (label.align === "right" ? textWidth : label.align === "center" ? textWidth / 2 : 0) - 2, y - 8, textWidth + 4, 16);
        }
        context.fillStyle = rgba(label.color);
        context.fillText(label.text, x, y);
      }
    }

    /** Coalesces drag events into one render per animation frame, e.g. on a touch screen. */
    function scheduleDraw() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    }
    /** Captures a single pointer for rotation, so dragging outside the canvas still ends cleanly. */
    function pointerDown(event: PointerEvent) {
      if (pointer || event.button !== 0) return;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
      canvas!.setPointerCapture(event.pointerId);
    }
    /** Changes only camera angles; e.g. dragging 100px horizontally rotates 50°. */
    function pointerMove(event: PointerEvent) {
      if (!pointer || pointer.id !== event.pointerId) return;
      camera.current.azimuth -= (event.clientX - pointer.x) * 0.5;
      camera.current.elevation = Math.max(-89, Math.min(89, camera.current.elevation + (event.clientY - pointer.y) * 0.5));
      pointer = { id: pointer.id, x: event.clientX, y: event.clientY };
      scheduleDraw();
    }
    /** Releases drag state on pointer up, cancellation, or lost capture. */
    function pointerEnd() { pointer = null; }
    /** Supports keyboard rotation; e.g. ArrowRight turns the view by five degrees. */
    function keyDown(event: KeyboardEvent) {
      if (!event.key.startsWith("Arrow")) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") camera.current.azimuth += 5;
      if (event.key === "ArrowRight") camera.current.azimuth -= 5;
      if (event.key === "ArrowUp") camera.current.elevation = Math.min(89, camera.current.elevation + 5);
      if (event.key === "ArrowDown") camera.current.elevation = Math.max(-89, camera.current.elevation - 5);
      scheduleDraw();
    }
    redraw.current = scheduleDraw;
    const observer = new ResizeObserver(scheduleDraw);
    observer.observe(canvas);
    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerup", pointerEnd);
    canvas.addEventListener("pointercancel", pointerEnd);
    canvas.addEventListener("lostpointercapture", pointerEnd);
    canvas.addEventListener("keydown", keyDown);
    scheduleDraw();
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerEnd);
      canvas.removeEventListener("pointercancel", pointerEnd);
      canvas.removeEventListener("lostpointercapture", pointerEnd);
      canvas.removeEventListener("keydown", keyDown);
      redraw.current = () => {};
    };
  }, [scene]);

  /** Returns to the Python plot's initial orientation without modifying its geometry. */
  function resetView() {
    camera.current = { elevation: 18, azimuth: -68 };
    redraw.current();
  }

  return (
    <figure className="tangent-figure">
      <figcaption id="tangent-plot-caption">
        Surface: z = x² + y² · Start = (0.5, 0.5) · End = (0.8, 0.2) · Δx = 0.3, Δy = −0.3<br />
        Step 1: (0.5, 0.5) → (0.8, 0.5) · Step 2: (0.8, 0.5) → (0.8, 0.2)
      </figcaption>
      <div className="tangent-controls">
        <button type="button" onClick={resetView}>Reset view</button>
      </div>
      <div className="tangent-layout">
        <div>
          <canvas ref={canvasRef} className="tangent-canvas" tabIndex={0} role="img" aria-label="Rotatable 3D surface and tangent plane. Drag or use arrow keys to rotate." aria-describedby="tangent-plot-caption">
            The surface reaches height 0.68 at the endpoint; the tangent plane predicts 0.5. Each coordinate step contributes 0.09 to the total error of 0.18.
          </canvas>
          {!scene && <p role="status">{error ? "The plot could not load. Please reload the page to try again." : "Loading plot…"}</p>}
        </div>
        <aside className="tangent-legends" aria-labelledby="tangent-legend-title">
          <h3 id="tangent-legend-title">Legend</h3>
          {scene?.heightLabels !== false && <p className="tangent-height-key">Pink numbers label point heights.</p>}
          {scene?.legends.map((group) => (
            <section key={group.title}>
              <h4>{group.title}</h4>
              {group.items.map((item) => (
                <div key={item.title}>
                  <p className="tangent-legend-label"><span className="tangent-swatch" style={{ borderColor: item.color, borderTopStyle: item.dashed ? "dashed" : "solid" }} />{item.title}</p>
                  <p>{item.body}</p>
                </div>
              ))}
            </section>
          ))}
        </aside>
      </div>
    </figure>
  );
}
