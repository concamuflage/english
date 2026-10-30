
# for demonstrating cancellation to heights.


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

# Tkinter window
root = tk.Tk()
root.title("Interactive 3D Tangent Plane")
root.geometry("1450x950")

fig = Figure(figsize=(14, 9), dpi=100)
# Reserve a fixed side panel so explanatory text does not rotate with the graph.
ax = fig.add_axes([0.01, 0.06, 0.68, 0.84], projection="3d", proj_type="ortho")

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

def draw_height_arrow(x, y, start_height, end_height, color):
    """Draw a solid vertical 3D arrow and return its surface artists.

    For example, draw_height_arrow(0.8, 0.5, 0.8, 0.5, "forestgreen")
    places the tail at height 0.8 and the cone tip at 0.5. Equal heights
    produce no geometry because there is no height change to display.
    """
    length = abs(end_height - start_height)
    if np.isclose(length, 0):
        return ()

    direction = np.sign(end_height - start_height)
    neck_height = end_height - direction * 0.20 * length
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

# Changes along tangent plane
ax.plot(
    [a,x1], [b,b], [fa,step_z],
    color="darkblue", lw=2.5
)

ax.plot(
    [x1,x1], [b,y1], [step_z,approx_z],
    color="darkblue", lw=2.5
)

# Integrate the y-change arrow into the endpoint's vertical construction.
# At (0.8,0.2), the tangent y-step drops from 0.8 to 0.5; its top is
# projected horizontally from the end of the x-step.
dashed((x1,b,step_z), (x1,y1,step_z))
for height in (step_z, approx_z):
    ax.plot([x1-0.015*abs(dx),x1+0.015*abs(dx)],
            [y1,y1], [height,height], color="darkorange", lw=1.8, zorder=30)
end_y_arrow = draw_height_arrow(x1, y1, step_z, approx_z, "darkorange")

# The sketched helper joins (a,y1,fa) to (x1,y1,step_z). It is parallel
# to the x-step edge: both rise by 0.3 over an x increment of 0.3 here.
dashed((a,y1,fa), (x1,y1,step_z))

# Show the second y-section of the tangent plane at the starting x value.
# Its direction (0,dy,fy*dy) matches the y-step edge at x1 exactly.
ax.plot([a,a], [b,y1], [fa,L(a,y1)], color="darkblue", lw=1.7)

# Highlight the marked vertical at the other y-edge in the same color.
# Its drop 0.5 -> 0.2 equals the existing marker's drop 0.8 -> 0.5:
# L(a,y1)-fa = L(x1,y1)-L(x1,b) = fy*dy = -0.3.
start_y_height = L(a,y1)
start_y_arrow = draw_height_arrow(a, y1, fa, start_y_height, "darkorange")
for height in (fa, start_y_height):
    ax.plot([a-0.015*abs(dx),a+0.015*abs(dx)], [y1,y1], [height,height],
            color="darkorange", lw=1.8, zorder=30)
# Mark the inclination to the horizontal in each parallel y/z section.
# Match the orange y-height markers. Both angles are atan(|fy|)=45° here;
# the apparent screen angles can differ
# because the 3D view scales and projects y and z differently.
y_angle = np.arctan2(fy*dy, abs(dy))
y_angle_degrees = abs(np.degrees(y_angle))
angle_radius = 0.2 * abs(dy)
arc_angles = np.linspace(0, y_angle, 40)
for angle_x, angle_z, angle_label in ((a,fa,r"\theta_1"),
                                       (x1,step_z,r"\theta_2")):
    ax.plot(np.full_like(arc_angles,angle_x),
            b + np.sign(dy)*angle_radius*np.cos(arc_angles),
            angle_z + angle_radius*np.sin(arc_angles),
            color="darkorange", lw=1.8, zorder=30)
    ax.text(angle_x,
            b + np.sign(dy)*1.6*angle_radius*np.cos(y_angle/2),
            angle_z + 1.6*angle_radius*np.sin(y_angle/2),
            rf"${angle_label}$", fontsize=12, color="darkorange", ha="center",
            zorder=31, bbox=dict(facecolor="white", edgecolor="none", pad=0.5))

# The green angle is the x-section inclination at the starting point.
# With fx=1, theta3=atan(1)=45°; its vertical rise is 0.5 -> 0.8.
x_angle = np.arctan2(fx*dx, abs(dx))
x_angle_degrees = abs(np.degrees(x_angle))
x_angle_radius = 0.2 * abs(dx)
x_arc_angles = np.linspace(0, x_angle, 40)
ax.plot(a + np.sign(dx)*x_angle_radius*np.cos(x_arc_angles),
        np.full_like(x_arc_angles,b), fa + x_angle_radius*np.sin(x_arc_angles),
        color="forestgreen", lw=1.8, zorder=30)
ax.text(a + np.sign(dx)*1.6*x_angle_radius*np.cos(x_angle/2), b,
        fa + 1.6*x_angle_radius*np.sin(x_angle/2),
        r"$\theta_3$", fontsize=12, color="forestgreen", ha="center",
        zorder=31, bbox=dict(facecolor="white", edgecolor="none", pad=0.5))
x_arrow = draw_height_arrow(x1, b, fa, step_z, "forestgreen")
for height in (fa, step_z):
    ax.plot([x1-0.015*abs(dx),x1+0.015*abs(dx)], [b,b], [height,height],
            color="forestgreen", lw=1.8, zorder=30)

# Display the approximation error outside the surfaces, with dashed connections
# to its actual heights. For example, the segment spans 0.5 to 0.68 while
# the orange y-change remains integrated at the original endpoint.
error_height_x = x1 + 0.35 * abs(dx)
for height in (approx_z, true_z):
    ax.plot([x1,error_height_x], [y1,y1], [height,height],
            color="red", ls="--", lw=1.2)
    ax.plot([error_height_x-0.015*abs(dx),error_height_x+0.015*abs(dx)],
            [y1,y1], [height,height], color="red", lw=1.8)
ax.plot([error_height_x,error_height_x], [y1,y1], [approx_z,true_z],
        color="red", lw=2.2)

# Mark important points
points = [
    (a,b,0),
    (a,b,fa),
    (x1,y1,0),
    (x1,y1,approx_z),
    (x1,y1,true_z)
]

for xp, yp, zp in points:
    ax.scatter(xp, yp, zp, color="black", s=35,
               depthshade=False)

# Use small annotation offsets within the local 0.3-by-0.3 rectangle.
ax.text(a-0.008,b+0.008,0,f"({a:g},{b:g})",fontsize=10,ha="right")
ax.text(x1+0.008,y1,0,f"({x1:g},{y1:g})",fontsize=10)

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

# Compare each actual step with the original tangent plane. For example,
# the x-step error is 0.89-0.8=0.09 and the added y-step error is also 0.09.
first_true_z = f(x1, b)
first_step_error = first_true_z - step_z
second_true_change = true_z - first_true_z
second_step_error = second_true_change - fy*dy
step_error = true_z - approx_z
fig.suptitle(
    "Surface: z = x² + y²\n"
    f"Start = ({a:g},{b:g})     End = ({x1:g},{y1:g})"
    f"     Δx = {dx:g}, Δy = {dy:g}",
    fontsize=14, y=0.98
)

# Keep numeric angle, height, and error annotations in a non-interactive legend.
# Color keys identify the matching markers on the graph; only theta labels
# and base coordinates remain attached to the 3D construction.
legend_ax = fig.add_axes([0.72, 0.04, 0.27, 0.85])
legend_ax.set_axis_off()
legend_ax.set_navigate(False)
legend_ax.plot([0,0], [0,1], color="lightgray", lw=1, transform=legend_ax.transAxes)
legend_ax.text(0.06, 0.99, "Angles and heights", fontsize=14, weight="bold",
               va="top", transform=legend_ax.transAxes)
legend_sections = [
    (0.925, "black", "Partial derivatives",
     rf"$f_x(x,y)=2x,\quad f_x({a:g},{b:g})={fx:g}$" "\n"
     rf"$f_y(x,y)=2y,\quad f_y({a:g},{b:g})={fy:g}$"),
    (0.805, "darkorange", rf"$\theta_1=\theta_2={y_angle_degrees:g}^\circ$ — y-sections",
     rf"Each angle is $\arctan|f_y({a:g},{b:g})|$." "\n"
     "The y-edges and their horizontal guides\nare parallel, so the angles are equal."),
    (0.66, "forestgreen", rf"$\theta_3={x_angle_degrees:g}^\circ$ — x-section",
     rf"The green angle is $\arctan|f_x({a:g},{b:g})|$." "\n"
     "All three angles equal 45° here because\n"
     rf"$f_x({a:g},{b:g})=f_y({a:g},{b:g})={fx:g}$.") ,
    (0.515, "forestgreen", "Height change contributed by\n"
     f"movement along the x-axis: {fx*dx:+g}",
     rf"$f_x({a:g},{b:g})\Delta x={fx*dx:g}$"),
    (0.405, "darkorange", "Height change contributed by\n"
     f"movement along the y-axis: {fy*dy:g}",
     rf"$f_y({a:g},{b:g})\Delta y={fy*dy:g}$" "\n"
     f"Both vertical drops have height {abs(fy*dy):g}."),
    (0.265, "black", f"Dashed guide: f({a:g},{b:g}) = {fa:g}", ""),
    (0.215, "red", f"Red height: final error = {step_error:g}",
     f"f({x1:g},{y1:g}) = {true_z:g}; L({x1:g},{y1:g}) = {approx_z:g}")
    # The +0.3 and -0.3 contributions cancel in the tangent approximation;
    # the true change remains 0.68-0.5=0.18 because the surface is curved.
]
for section_y, section_color, section_title, section_body in legend_sections:
    # Match the reference-height key to its box edge, e.g. z=0..0.5 at (0.5,0.5).
    is_reference_guide = section_title.startswith("Dashed guide:")
    legend_ax.plot([0.055,0.12], [section_y-0.011,section_y-0.011],
                   color=section_color, lw=1.2 if is_reference_guide else 2.2,
                   ls="--" if is_reference_guide else "-",
                   alpha=0.65 if is_reference_guide else 1,
                   transform=legend_ax.transAxes)
    legend_ax.text(0.15, section_y, section_title, color=section_color,
                   fontsize=11, weight="bold", va="top", transform=legend_ax.transAxes)
    if section_body:
        # Leave extra room for wrapped contribution headings, e.g. the x-axis label.
        body_offset = 0.06 if "\n" in section_title else 0.035
        legend_ax.text(0.06, section_y-body_offset, section_body, fontsize=10.5,
                       va="top", linespacing=1.4, transform=legend_ax.transAxes)

# Keep the conclusion separate from the four-field legend entries.
# Here +0.3 and -0.3 cancel in the tangent plane, while the surface rises by 0.18.
legend_ax.text(0.06, 0.135, "Conclusion: height change = 0",
               fontsize=11, weight="bold", va="top", transform=legend_ax.transAxes)
conclusion_text = (
    f"The orange and green vectors have equal\n"
    f"heights ({abs(fx * dx):g}) and opposite directions.\n"
    "Their height contributions cancel, so the\n"
    "tangent plane predicts no height increase.\n"
    f"The actual surface rises by {true_z - fa:g}."
)
legend_ax.text(0.06, 0.095, conclusion_text, fontsize=10.5,
               va="top", linespacing=1.25, transform=legend_ax.transAxes)

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
