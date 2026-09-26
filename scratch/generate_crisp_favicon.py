import os
from PIL import Image, ImageFilter
import numpy as np

# 1. Load clean leaf from scratch
leaf = Image.open(r'C:\Users\HP USER\.gemini\antigravity\brain\65b47c02-e396-45e3-ad10-d3865e1d39f0\scratch\clean_leaf_orig.png').convert('RGBA')

# 2. Let's create an ultra-clean, high-resolution vector-like master leaf at 512x512
# The leaf from clean_leaf_orig is (90, 97).
# We want clean, anti-aliased, crisp contours without blur or pixelation.
arr = np.array(leaf)

# Let's inspect the mask
alpha = arr[:, :, 3]
green_mask = (alpha > 80)
# Clean leaf RGB: vibrant organic green #5F9535 (R: 95, G: 149, B: 53)
clean_rgb = [95, 149, 53]

# Create a clean high-res canvas at 512x512
# Scale up using 8x super-sampling with Bicubic/Lanczos on the alpha channel
alpha_img = Image.fromarray(alpha)
alpha_512 = alpha_img.resize((440, 474), Image.Resampling.LANCZOS)

# Create a thresholded smooth mask
alpha_arr = np.array(alpha_512)
# Apply smooth step to eliminate blur while retaining beautiful anti-aliased edges
smooth_alpha = np.clip((alpha_arr.astype(float) - 70) * (255.0 / 80.0), 0, 255).astype(np.uint8)

# Construct 440x474 crisp RGBA
highres_leaf = Image.new('RGBA', (440, 474), (clean_rgb[0], clean_rgb[1], clean_rgb[2], 0))
highres_arr = np.array(highres_leaf)
highres_arr[:, :, 3] = smooth_alpha
highres_leaf = Image.fromarray(highres_arr)

# Place centered on 512x512 square canvas
leaf_canvas_512 = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
ox = (512 - 440) // 2
oy = (512 - 474) // 2
leaf_canvas_512.paste(highres_leaf, (ox, oy), highres_leaf)

# Save master icon in scratch to inspect
leaf_canvas_512.save(r'C:\Users\HP USER\.gemini\antigravity\brain\65b47c02-e396-45e3-ad10-d3865e1d39f0\scratch\crisp_leaf_512.png')

# 3. Generate multi-resolution icons: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
ico_images = []
for s in ico_sizes:
    res = leaf_canvas_512.resize(s, Image.Resampling.LANCZOS)
    # Apply subtle unsharp mask to keep 16 and 32 ultra-crisp
    if s[0] <= 32:
        res = res.filter(ImageFilter.UnsharpMask(radius=1.0, percent=130, threshold=2))
    ico_images.append(res)
    res.save(rf'C:\Users\HP USER\.gemini\antigravity\brain\65b47c02-e396-45e3-ad10-d3865e1d39f0\scratch\crisp_leaf_{s[0]}.png')

# Save multi-size favicon.ico
leaf_canvas_512.save('public/favicon.ico', format='ICO', sizes=ico_sizes)

# Also save high-res logo.png in public/images/
leaf_canvas_512.save('public/images/logo.png', format='PNG', optimize=True)

print('Generated crisp favicon.ico and public/images/logo.png with sizes 16, 32, 48, 64, 128, 256, 512!')
