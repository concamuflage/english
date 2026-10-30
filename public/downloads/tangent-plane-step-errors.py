import textwrap

import tkinter as tk
import numpy as np
from matplotlib.figure import Figure
from matplotlib.ticker import MaxNLocator
from matplotlib.backends.backend_tkagg import (
    FigureCanvasTkAgg,
    NavigationToolbar2Tk
)

# Function and coordinates
def f(x, y):
    """Return the surface height; for example, f(0.5, 0.5) is 0.5."""
    return x**2 + y**2

a, b = 0.5, 0.5
dx, dy = 0.3, -0.3
# Apply the requested increments: (0.5, 0.5) becomes (0.8, 0.2).
x1, y1 = a + dx, b + dy

fa = f(a, b)             # 0.5
true_z = f(x1, y1)       # 0.68
fx, fy = 2*a, 2*b        # 1, 1

def L(x, y):
    """Return the tangent approximation at (0.5, 0.5); L(0.8, 0.2) is 0.5."""
    return fa + fx*(x-a) + fy*(y-b)

approx_z = L(x1, y1)    # 0.5
step_z = fa + fx*dx     # 0.8

# Compare each actual step with the original tangent plane. For example,
# the x-step error is 0.89-0.8=0.09 and the added y-step error is also 0.09.
first_true_z = f(x1, b)
first_step_error = first_true_z - step_z
second_true_change = true_z - first_true_z
second_step_error = second_true_change - fy*dy
step_error = true_z - approx_z
# Apply the original tangent y-change after the actual first step:
# 0.89 + (-0.3) = 0.59; the actual endpoint at 0.68 is 0.09 higher.
y_prediction_from_actual = first_true_z + fy*dy

# Tkinter window
root = tk.Tk()
root.title("Interactive 3D Tangent Plane")
root.geometry("1750x950")

fig = Figure(figsize=(17, 9), dpi=100)
# Keep the graph beside separate calculation and construction legends.
ax = fig.add_axes([0.01, 0.06, 0.50, 0.84], projection="3d", proj_type="ortho")

# Frame the small increments with 60% padding on each side.
# For dx=0.3 and dy=-0.3, show x=0.32..0.98 and y=0.02..0.68.
x_pad, y_pad = 0.6 * abs(dx), 0.6 * abs(dy)
x_min, x_max = min(a, x1) - x_pad, max(a, x1) + x_pad
y_min, y_max = min(b, y1) - y_pad, max(b, y1) + y_pad

# Bound the curved surface to the same start/end rectangle as the tangent patch:
# x=0.5..0.8 and y=0.2..0.5; padding applies only to the viewing window.
xs = np.linspace(min(a, x1), max(a, x1), 85)
ys = np.linspace(min(b, y1), max(b, y1), 85)
X, Y = np.meshgrid(xs, ys)

ax.plot_surface(
    X, Y, f(X, Y),
    color="cornflowerblue",
    alpha=0.45,
    linewidth=0,
    shade=False
)

# Bound the tangent patch by the start/end rectangle:
# x=0.5..0.8 and y=0.2..0.5 for the current increments.
px = np.linspace(min(a, x1), max(a, x1), 25)
py = np.linspace(min(b, y1), max(b, y1), 25)
PX, PY = np.meshgrid(px, py)

ax.plot_surface(
    PX, PY, L(PX, PY),
    color="steelblue",
    alpha=0.65,
    linewidth=0,
    shade=False
)

# Scale axes and vertical annotation offsets to the local surface heights.
# The highest corner is f(0.8, 0.5)=0.89 for the current patch.
z_height = max(float(np.max(f(X, Y))), float(np.max(L(PX, PY))))

# Place the x/z reference grid behind the construction at the back y boundary.
# The tick locator gives a readable height scale: 0, 0.2, ..., 1 for this patch.
back_y = y_min
z_ticks = MaxNLocator(nbins=5, min_n_ticks=3).tick_values(0, 1.1*z_height)
z_axis_top = z_ticks[-1]
x_ticks = np.linspace(a, x1, 3)

ax.plot([x_min, x_max], [back_y, back_y], [0, 0], "k", lw=1.7)
ax.plot([x_min, x_min], [back_y, y_max], [0, 0], "k", lw=1.7)
ax.plot([x_min, x_min], [back_y, back_y], [0, z_axis_top], "k", lw=1.7)
ax.text(x_max, back_y, 0.025*z_axis_top, "x", fontsize=14)
ax.text(x_min, y_max, 0.025*z_axis_top, "y", fontsize=14)
ax.text(x_min, back_y, 1.045*z_axis_top, "z", fontsize=14)

# Use light grid lines so the rear reference plane does not obscure the surfaces.
for z_tick in z_ticks:
    ax.plot([x_min, x_max], [back_y, back_y], [z_tick, z_tick],
            color="gray", alpha=0.3, lw=0.7)
    ax.plot([x_min-0.005, x_min+0.005], [back_y, back_y], [z_tick, z_tick],
            "k", lw=1)
    ax.text(x_min-0.015, back_y, z_tick, f"{z_tick:g}",
            fontsize=10, ha="right", va="center")
for x_tick in x_ticks:
    ax.plot([x_tick, x_tick], [back_y, back_y], [0, z_axis_top],
            color="gray", alpha=0.3, lw=0.7)
    ax.plot([x_tick, x_tick], [back_y-0.003, back_y+0.003], [0, 0], "k", lw=1)
    ax.text(x_tick, back_y-0.012, -0.025*z_axis_top, f"{x_tick:g}",
            fontsize=10, ha="center")
for y_tick in np.linspace(b, y1, 3):
    ax.plot([x_min-0.003, x_min+0.003], [y_tick, y_tick], [0, 0], "k", lw=1)
    ax.text(x_min-0.008, y_tick, 0, f"{y_tick:g}", fontsize=10, ha="right")

# Dashed helper lines
def dashed(p, q):
    """Draw a guide between 3D points, e.g. (0.5, 0.5, 0) and (0.5, 0.5, 0.5)."""
    ax.plot(
        [p[0], q[0]],
        [p[1], q[1]],
        [p[2], q[2]],
        "k--", alpha=0.65, lw=1.2
    )

def draw_height_arrow(x, y, start_height, end_height, color, dashed=False):
    """Draw a vertical 3D arrow and return its drawing artists.

    For example, draw_height_arrow(0.8, 0.5, 0.8, 0.5, "forestgreen")
    places the tail at height 0.8 and the cone tip at 0.5. Equal heights
    produce no geometry because there is no height change to display.
    Set dashed=True to use a thin dashed shaft with the same solid cone tip,
    e.g. for a reference arrow shifted away from the surface.
    The head occupies 10% of the vector length: for 0.8 -> 0.5 it spans
    0.53 -> 0.5, half its former height, without changing either endpoint.
    """
    length = abs(end_height - start_height)
    if np.isclose(length, 0):
        return ()

    direction = np.sign(end_height - start_height)
    neck_height = end_height - direction * 0.10 * length
    shaft_radius = 0.006 * min(x_max-x_min, y_max-y_min)
    head_radius = 2.8 * shaft_radius
    angles = np.linspace(0, 2*np.pi, 40)

    # Each pair of circular rings forms a solid arrow component: cylinder,
    # cone, tail cap, and the flat shoulder around the base of the cone.
    # The same geometry works for a downward 0.8 -> 0.5 or upward 0.5 -> 0.8.
    rings = [
        ((shaft_radius, shaft_radius), (start_height, neck_height)),
        ((head_radius, 0), (neck_height, end_height)),
        ((0, shaft_radius), (start_height, start_height)),
        ((shaft_radius, head_radius), (neck_height, neck_height)),
    ]
    surfaces = []
    if dashed:
        # The reference shaft is a dashed 3D line so it does not hide nearby
        # vectors. Keep just the cone and its base from the solid geometry.
        surfaces.extend(ax.plot([x,x], [y,y], [start_height,neck_height],
                                color=color, ls="--", lw=1.8, zorder=60))
        rings = [rings[1], ((0, head_radius), (neck_height, neck_height))]
    for radii, heights in rings:
        radius_grid = np.asarray(radii)[:, None]
        arrow_x = x + radius_grid*np.cos(angles)
        arrow_y = y + radius_grid*np.sin(angles)
        arrow_z = np.broadcast_to(np.asarray(heights)[:, None], arrow_x.shape)
        surfaces.append(ax.plot_surface(
            arrow_x, arrow_y, arrow_z, color=color, shade=True,
            linewidth=0, antialiased=True
        ))
    return tuple(surfaces)


# Complete the reference box from the textbook: four base edges, four top
# edges, and four verticals. For this example its top is z=f(0.5, 0.5)=0.5.
# This horizontal reference measures changes from fa; with negative dy,
# parts of the tangent plane can lie below the reference box's top.
box_corners = [(a, b), (x1, b), (x1, y1), (a, y1)]
for index, (corner_x, corner_y) in enumerate(box_corners):
    next_x, next_y = box_corners[(index + 1) % len(box_corners)]
    dashed((corner_x, corner_y, 0), (next_x, next_y, 0))
    dashed((corner_x, corner_y, fa), (next_x, next_y, fa))
    dashed((corner_x, corner_y, 0), (corner_x, corner_y, fa))

# Extend the box guides to the tangent construction where the heights differ:
# the x step rises from the reference height 0.5 to 0.8 here.
dashed((x1,b,fa), (x1,b,step_z))
if not np.isclose(approx_z, fa):
    dashed((x1,y1,fa), (x1,y1,approx_z))

# The solid green vector is the predicted x-step rise at y=b:
# L(0.8,0.5)-L(0.5,0.5)=0.8-0.5=+0.3, so its arrow points upward.
green_arrow = draw_height_arrow(x1, b, fa, step_z, "forestgreen")
for height in (fa, step_z):
    ax.plot([x1-0.015*abs(dx),x1+0.015*abs(dx)], [b,b],
            [height,height], color="forestgreen", lw=1.8, zorder=60)

# Keep the error and labels above the additional solid-arrow mesh artists.
# The first-step error is the gap above the green arrow's ending height at (x1,b).
# Draw it on that vertical: L(0.8,0.5)=0.8 to f(0.8,0.5)=0.89, a gap of 0.09.
# Error arrows point down from the actual height to its reference height.
first_error_arrow = draw_height_arrow(x1, b, first_true_z, step_z, "purple")
for height in (step_z, first_true_z):
    ax.plot([x1-0.015*abs(dx),x1+0.015*abs(dx)], [b,b], [height,height],
            color="purple", lw=1.8, zorder=60)

# Project the actual intermediate height horizontally to the y-step endpoint.
# The blue arrow measures the surface's change 0.89 -> 0.68, or -0.21,
# rather than the original tangent plane's contribution fy*dy=-0.3.
dashed((x1,b,first_true_z), (x1,y1,first_true_z))
dashed((x1,y1,fa), (x1,y1,true_z))
blue_arrow = draw_height_arrow(x1, y1, first_true_z, true_z, "blue")
for height in (first_true_z, true_z):
    ax.plot([x1-0.015*abs(dx),x1+0.015*abs(dx)], [y1,y1], [height,height],
            color="blue", lw=1.8, zorder=60)

# Reproduce the sketched black guides. The upper/lower connectors shift
# the tangent y-step upward by the first error of 0.09. The diagonal guide
# has the tangent slope fy=1 and ends at the transported prediction 0.59.
dashed((x1,b,step_z), (x1,y1,first_true_z))
dashed((x1,b,approx_z), (x1,y1,y_prediction_from_actual))
dashed((x1,b,first_true_z), (x1,y1,y_prediction_from_actual))

# Show the predicted y-step drop of -0.3 starting at 0.89, using a dashed
# reference arrow. Offset only in y so both green arrows and the blue arrow
# stay in the same y/z cross-section x=x1 (x=0.8 for this example).
y_comparison_y = y1 + np.sign(dy)*0.20*abs(dy)
translated_green_arrow = draw_height_arrow(
    x1, y_comparison_y, first_true_z, y_prediction_from_actual,
    "forestgreen", dashed=True
)
for height in (first_true_z, y_prediction_from_actual):
    dashed((x1,y1,height), (x1,y_comparison_y,height))
    ax.plot([x1-0.015*abs(dx),x1+0.015*abs(dx)],
            [y_comparison_y,y_comparison_y], [height,height],
            color="forestgreen", lw=1.8, zorder=60)

# Color the transported first error purple, matching the intermediate gap.
# The additional y-step error is yellow: 0.5 -> 0.59 -> 0.68 splits the
# cumulative 0.18 error into two equal contributions of 0.09.
endpoint_error_segments = [
    (approx_z, y_prediction_from_actual, "purple"),
    (y_prediction_from_actual, true_z, "gold"),
]
endpoint_error_arrows = {}
for lower_height, upper_height, error_color in endpoint_error_segments:
    endpoint_error_arrows[error_color] = draw_height_arrow(
        x1, y1, upper_height, lower_height, error_color,
        dashed=(error_color=="purple")
    )
    for height in (lower_height, upper_height):
        ax.plot([x1-0.015*abs(dx),x1+0.015*abs(dx)], [y1,y1], [height,height],
                color=error_color, lw=1.6, zorder=60)

# A separate solid red arrow shows the total downward correction 0.68 -> 0.5.
# Keep x=x1 for the same y/z cross-section and offset it beyond the green copy.
total_error_y = y1 + np.sign(dy)*0.40*abs(dy)
total_error_arrow = draw_height_arrow(x1, total_error_y, true_z, approx_z, "red")
for height in (true_z, approx_z):
    dashed((x1,y1,height), (x1,total_error_y,height))
    ax.plot([x1-0.015*abs(dx),x1+0.015*abs(dx)],
            [total_error_y,total_error_y], [height,height], color="red", lw=1.8, zorder=60)

# Mark important points
points = [
    (a,b,0),
    (a,b,fa),
    (x1,b,0),
    (x1,b,step_z),
    (x1,b,first_true_z),
    (x1,y1,0),
    (x1,y1,approx_z),
    (x1,y1,true_z),
    (x1,y1,y_prediction_from_actual)
]

for xp, yp, zp in points:
    ax.scatter(xp, yp, zp, color="black", s=35,
               depthshade=False)

# Show only the numeric heights beside the existing critical-point dots.
# For example, the intermediate surface/plane heights are 0.89 and 0.8.
intersection_heights = [
    (x1, b, first_true_z, 0.035),
    (x1, b, step_z, -0.04),
    (x1, y1, true_z, 0.04),
    (x1, y1, approx_z, -0.04),
    (x1, y1, y_prediction_from_actual, 0),
]
for point_x, point_y, height, label_offset in intersection_heights:
    ax.text(point_x-0.055*abs(dx),point_y,height+label_offset*z_height,
            f"{height:g}", fontsize=10,
            color="deeppink", ha="right", va="center", zorder=63,
            bbox=dict(facecolor="white", edgecolor="none", alpha=0.85, pad=1))

# Use small annotation offsets within the local 0.3-by-0.3 rectangle.
ax.text(a-0.008,b+0.008,0,f"({a:g},{b:g})",fontsize=10,ha="right")
ax.text(x1+0.008,y1,0,f"({x1:g},{y1:g})",fontsize=10)

# The x-step ends at (x1,b) before the y-step begins: (0.8,0.5) here.
# Place its coordinate just outside the corner where the two base edges meet.
ax.text(x1+0.04*abs(dx),b+0.04*abs(dy),0,
        f"({x1:g},{b:g})",fontsize=10,ha="left",va="top")

# Label each displacement beside its base edge: x=0.5..0.8 gives Δx=0.3,
# and y=0.5..0.2 gives Δy=-0.3. Offsets keep text clear of the dashed edges.
ax.text((a+x1)/2,b+0.06*abs(dy),0.025*z_height,
        rf"$\Delta x={dx:g}$", fontsize=12, ha="center")
ax.text(x1+0.06*abs(dx),(b+y1)/2,0.025*z_height,
        rf"$\Delta y={dy:g}$", fontsize=12, ha="left")

# Keep decreasing y pointing back/right while magnifying the local x/y window.
ax.set_xlim(x_min,x_max)
ax.set_ylim(y_max,y_min)
# Leave room above the top height tick and its z label, e.g. scale 0..1.
ax.set_zlim(0,1.08*z_axis_top)
DEFAULT_BOX_ASPECT = (1.65, 1.45, 1.5)
# Enlarge the graph by 25% from the previous 0.96 zoom; Reset uses this too.
DEFAULT_ZOOM = 1.2
ax.set_box_aspect(DEFAULT_BOX_ASPECT, zoom=DEFAULT_ZOOM)

# Hide Matplotlib's default box
ax.set_axis_off()

# Starting orientation:
# x points right, decreasing y points diagonally back/right, z points up
DEFAULT_ELEV = 18
DEFAULT_AZIM = -68

ax.view_init(elev=DEFAULT_ELEV, azim=DEFAULT_AZIM)

# Save the local frame before mouse or toolbar interactions change it.
# For example, resetting restores x=0.32..0.98 after zooming or panning.
DEFAULT_XLIM = ax.get_xlim()
DEFAULT_YLIM = ax.get_ylim()
DEFAULT_ZLIM = ax.get_zlim()

fig.suptitle(
    "Surface: z = x² + y²\n"
    f"Start = ({a:g},{b:g})     End = ({x1:g},{y1:g})"
    f"     Δx = {dx:g}, Δy = {dy:g}",
    fontsize=14, y=0.98
)

# Group the color key by the step that introduces each error. For example,
# purple is the first step gap; yellow is the extra gap from the second step.
error_legend_ax = fig.add_axes([0.52, 0.04, 0.23, 0.85])
construction_legend_ax = fig.add_axes([0.765, 0.04, 0.225, 0.85])

# Explain each colored vector in its column, preserving the supplied values.
# Wrap long explanations below so added calculations stay inside the column.
error_sections = [
    (0.77, "forestgreen", "Solid green", "-",
     "The estimated height change in the first step."),
    (0.62, "purple", "Solid purple-the first step error", "-",
     "The difference between the estimated\n"
     "height change (0.8-0.5=0.3)\n"
     "and real height change (0.89-0.5=0.39); The difference is 0.09"),
]
# Match the requested reading order: actual blue change, dashed green
# prediction, then the yellow gap between their endpoints.
construction_sections = [
    (0.34, "blue", "Blue vector", "-",
     "The real height change in the second step."),
    (0.20, "forestgreen", "Dashed green", "--",
     "The estimated height change;\n"
     "its length (0.89-0.59=0.3) is equal to the length of\n"
     "the solid green vector(length = 0.3), which is equal\n"
     "to the estimated change in height."),
    (0.81, "gold", "Yellow-the second step error", "-",
     "This is the difference between the actual\n"
     "height change (blue vector) and the\n"
     "estimated height change (green dashed\n"
     "vector)."),
]
# Group the carried first error with the total it contributes to. For example,
# the red arrow spans both the purple and yellow error segments.
total_sections = [
    (0.53, "purple", "Dashed purple", "--",
     "Its length is equal to the solid purple\n"
     "vector, which is the first step error."),
    (0.38, "red", "Red", "-",
     "The full gap from the actual endpoint\n"
     "down to the original tangent plane.\n"
     "It includes both steps' errors."),
]
# Flow the second group into the space below the first group, then continue
# at the top of the right column. For example, blue and dashed green stay
# together on the left; yellow follows on the right, then Total error.
for legend_ax in (error_legend_ax, construction_legend_ax):
    legend_ax.set_axis_off()
    legend_ax.set_navigate(False)
    legend_ax.plot([0, 0], [0, 1], color="lightgray", lw=1,
                   transform=legend_ax.transAxes)

for legend_ax, heading, heading_y, sections in [
    (error_legend_ax, "First step error", 0.85, error_sections),
    (error_legend_ax, "Second step error", 0.42, construction_sections[:2]),
    (construction_legend_ax, "Second step error (continued)", 0.89,
     construction_sections[2:]),
    (construction_legend_ax, "Total error", 0.61, total_sections),
]:
    legend_ax.text(0.06, heading_y, heading, fontsize=14, weight="bold",
                   va="top", transform=legend_ax.transAxes)
    for section_y, color, title, line_style, body in sections:
        # Match the actual arrow style, e.g. the carried purple error is dashed.
        legend_ax.plot([0.055, 0.12], [section_y-0.011, section_y-0.011],
                       color=color, lw=2.2, ls=line_style,
                       transform=legend_ax.transAxes)
        legend_ax.text(0.15, section_y, title, color=color, fontsize=11,
                       weight="bold", va="top", transform=legend_ax.transAxes)
        # Reflow the full explanation rather than trusting source-line breaks.
        # For example, the long purple calculation wraps before the divider.
        wrapped_body = textwrap.fill(body, width=38, break_long_words=False,
                                     break_on_hyphens=False)
        legend_ax.text(0.06, section_y-0.04, wrapped_body, fontsize=10.5,
                       va="top", linespacing=1.5, transform=legend_ax.transAxes)

# Show the two coordinate moves in order above the height-label note.
# For example, the first move is (0.5, 0.5) -> (0.8, 0.5).
error_legend_ax.text(
    0.06, 0.99,
    f"Step 1: ({a:g}, {b:g}) → ({x1:g}, {b:g})\n"
    f"Step 2: ({x1:g}, {b:g}) → ({x1:g}, {y1:g})",
    fontsize=10.5, va="top", linespacing=1.5,
    transform=error_legend_ax.transAxes
)

# Heights remain labeled on the graph; this note explains the pink labels
# without repeating the arithmetic removed from the color explanations.
error_legend_ax.text(0.06, 0.92, "Pink numbers label point heights.",
                     color="deeppink", fontsize=10.5, va="top",
                     transform=error_legend_ax.transAxes)

# Separate the final group from the second step explanation above it.
construction_legend_ax.plot([0.06, 0.96], [0.64, 0.64], color="lightgray", lw=1,
                             transform=construction_legend_ax.transAxes)

# Embed the graph in Tkinter
canvas = FigureCanvasTkAgg(fig, master=root)
canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)
canvas.draw()

# Controls and navigation toolbar
controls = tk.Frame(root)
controls.pack(fill=tk.X, padx=10, pady=5)

toolbar = NavigationToolbar2Tk(
    canvas, controls, pack_toolbar=False
)
toolbar.pack(side=tk.LEFT)

def reset_view():
    """Restore the full starting view, e.g. elevation 18° and x=0.32..0.98."""
    # Exit toolbar tools so ordinary mouse rotation works immediately afterward.
    if toolbar.mode == "pan/zoom":
        toolbar.pan()
    elif toolbar.mode == "zoom rect":
        toolbar.zoom()

    # Zoom and pan change limits independently of the camera angles.
    ax.set_xlim(DEFAULT_XLIM)
    ax.set_ylim(DEFAULT_YLIM)
    ax.set_zlim(DEFAULT_ZLIM)
    ax.set_box_aspect(DEFAULT_BOX_ASPECT, zoom=DEFAULT_ZOOM)
    ax.view_init(
        elev=DEFAULT_ELEV,
        azim=DEFAULT_AZIM,
        roll=0
    )

    # Start fresh navigation history so Home also returns to this restored view.
    toolbar.update()
    toolbar.push_current()
    canvas.draw_idle()

tk.Button(
    controls,
    text="Reset textbook view",
    command=reset_view
).pack(side=tk.RIGHT, padx=8)

tk.Label(
    root,
    text="Left-click and drag to rotate. Scroll to zoom.",
    font=("Arial", 11)
).pack(pady=8)

root.mainloop()
