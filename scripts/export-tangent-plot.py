"""Export the supplied Matplotlib construction as fixed browser geometry.

Example: MPLCONFIGDIR=/tmp/bumblebee-mpl python3 scripts/export-tangent-plot.py
    '/path/to/test2.py' writes public/plots/tangent-plane.json.
Only run this exporter with a trusted Python source: it executes the plot code.
Pass a second output path to export test.py separately, e.g. public/plots/canceling-height-changes.json.
"""

import json
import sys
import re
from pathlib import Path

import matplotlib
import numpy as np

matplotlib.use("Agg")
from matplotlib.colors import to_rgba
from mpl_toolkits.mplot3d.art3d import Poly3DCollection


def browser_text(text):
    """Translate this plot's MathText labels; e.g. `$\\theta_1=45^\\circ$` becomes `θ₁=45°`."""
    for index, subscript in [("1", "₁"), ("2", "₂"), ("3", "₃")]:
        text = text.replace(r"\theta_" + index, "θ" + subscript)
    for original, replacement in [(r"^\circ", "°"), (r"\quad", "  "),
                                  (r"\arctan", "arctan"), (r"\Delta", "Δ"),
                                  ("f_x", "fₓ"), ("f_y", "fᵧ"), ("$", "")]:
        text = text.replace(original, replacement)
    return text


def export(source: Path, destination: Path):
    """Export either construction; e.g. test.py preserves its orange y-step arrows and angle labels."""
    code = source.read_text().split("# Embed the graph in Tkinter")[0]
    # Skip only the desktop window setup; all mathematical drawing calls are unchanged.
    for statement in (
        "root = tk.Tk()",
        'root.title("Interactive 3D Tangent Plane")',
        'root.geometry("1750x950")',
    ):
        code = code.replace(statement, "")
    code = re.sub(r"^root\.geometry\([^\n]*\)$", "", code, flags=re.MULTILINE)
    namespace = {}
    exec(compile(code, str(source), "exec"), namespace)
    ax = namespace["ax"]
    assert np.isclose(namespace["true_z"], 0.68)
    assert np.isclose(namespace["approx_z"], 0.5)
    faces, dots = [], []
    for collection in ax.collections:
        if isinstance(collection, Poly3DCollection):
            colors = collection._facecolor3d
            for index, segment in enumerate(collection._segslices):
                faces.append({
                    "points": collection._vec[:3, segment].T.tolist(),
                    "color": colors[index % len(colors)].tolist(),
                })
        else:
            dots.extend(np.array(collection._offsets3d).T.tolist())
    lines = []
    for line in ax.lines:
        lines.append({
            "points": np.array(line.get_data_3d()).T.tolist(),
            "color": list(to_rgba(line.get_color(), line.get_alpha())),
            "width": line.get_linewidth(),
            "dashed": line.get_linestyle() == "--",
        })
    labels = []
    for text in ax.texts:
        labels.append({
            "point": list(text.get_position_3d()),
            "text": browser_text(text.get_text()),
            "color": list(to_rgba(text.get_color())),
            "size": text.get_fontsize(),
            "align": text.get_ha(),
            "background": text.get_bbox_patch() is not None,
        })
    legends = []
    if "legend_sections" in namespace:
        legends.append({"title": "Angles and heights", "items": [
            {"color": color, "title": browser_text(label), "dashed": label.startswith("Dashed guide:"),
             "body": browser_text(body)}
            for _, color, label, body in namespace["legend_sections"]
        ]})
    for title, key in [("First step error", "error_sections"),
                       ("Second step error", "construction_sections"),
                       ("Total error", "total_sections")]:
        if key not in namespace:
            continue
        legends.append({"title": title, "items": [
            {"color": color, "title": label, "dashed": style == "--",
             "body": " ".join(body.split())}
            for _, color, label, style, body in namespace[key]
        ]})
    data = {"faces": faces, "lines": lines, "dots": dots, "labels": labels,
            "legends": legends,
            "limits": [list(ax.get_xlim()), list(ax.get_ylim()), list(ax.get_zlim())],
            "aspect": list(namespace["DEFAULT_BOX_ASPECT"])}
    if "legend_sections" in namespace:
        # test.py has theta labels rather than the pink numeric-height labels in test2.py.
        data["heightLabels"] = False
    destination.write_text(json.dumps(data, separators=(",", ":")))
    print(f"Exported {len(faces)} faces, {len(lines)} lines, {len(labels)} labels to {destination}")


if __name__ == "__main__":
    export(Path(sys.argv[1]), Path(sys.argv[2]) if len(sys.argv) > 2 else Path("public/plots/tangent-plane.json"))
