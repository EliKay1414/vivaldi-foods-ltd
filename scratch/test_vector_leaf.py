import math
from PIL import Image, ImageDraw

# Create high-res 1024x1024 image
W, H = 1024, 1024
img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Let's generate smooth bezier points
def cubic_bezier(p0, p1, p2, p3, n=100):
    pts = []
    for i in range(n + 1):
        t = i / n
        u = 1 - t
        x = u**3 * p0[0] + 3*u**2*t * p1[0] + 3*u*t**2 * p2[0] + t**3 * p3[0]
        y = u**3 * p0[1] + 3*u**2*t * p1[1] + 3*u*t**2 * p2[1] + t**3 * p3[1]
        pts.append((x, y))
    return pts

# Outer leaf boundary in 1024 coordinate space
# Stem tip: (220, 890)
# Top tip: (880, 90)
stem = (220, 890)
top = (880, 90)

# Left flank curve: stem -> top
# Bows out to left: x around 80, y around 480
left_curve = cubic_bezier(stem, (60, 680), (120, 240), top, n=200)

# Right flank curve: top -> stem
# Bows out to right: x around 920, y around 380
right_curve = cubic_bezier(top, (930, 360), (700, 780), stem, n=200)

leaf_polygon = left_curve + right_curve

# Vibrant leaf green: #5F9535
LEAF_GREEN = (95, 149, 53, 255)
draw.polygon(leaf_polygon, fill=LEAF_GREEN)

# Now the vein cutout
# Vein starts slightly above stem: (250, 840)
# Reaches near top tip: (770, 220)
v_start = (245, 835)
v_end = (775, 215)
vein_up = cubic_bezier(v_start, (330, 660), (500, 430), v_end, n=150)
vein_down = cubic_bezier(v_end, (540, 380), (380, 620), v_start, n=150)
vein_polygon = vein_up + vein_down

# Cut out vein with transparency
draw.polygon(vein_polygon, fill=(0, 0, 0, 0))

# Downsample to 512x512 with anti-aliasing
leaf_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
leaf_512.save(r'C:\Users\HP USER\.gemini\antigravity\brain\65b47c02-e396-45e3-ad10-d3865e1d39f0\scratch\vector_leaf_512.png')

# Also generate 32x32 preview
leaf_32 = leaf_512.resize((32, 32), Image.Resampling.LANCZOS)
leaf_32.save(r'C:\Users\HP USER\.gemini\antigravity\brain\65b47c02-e396-45e3-ad10-d3865e1d39f0\scratch\vector_leaf_32.png')

print('Generated vector leaf 512 and 32!')
