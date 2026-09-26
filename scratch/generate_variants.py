from PIL import Image, ImageDraw, ImageFilter
import numpy as np

# Load the original clean leaf
leaf = Image.open(r'C:\Users\HP USER\.gemini\antigravity\brain\65b47c02-e396-45e3-ad10-d3865e1d39f0\scratch\clean_leaf_orig.png').convert('RGBA')

# 1. High-quality transparent leaf
# Tight crop
bbox = leaf.getbbox()
tight = leaf.crop(bbox)
tw, th = tight.size

def create_leaf_icon(size, with_background=False, is_circle=False):
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    
    if with_background:
        pad = int(size * 0.04)
        if is_circle:
            draw.ellipse([pad, pad, size - pad, size - pad], fill=(255, 255, 255, 255))
        else:
            r = int(size * 0.22)
            draw.rounded_rectangle([pad, pad, size - pad, size - pad], radius=r, fill=(255, 255, 255, 255))
        
        # Leaf inside with margin
        inner_margin = int(size * 0.16)
        avail = size - 2 * inner_margin
        scale = min(avail / tw, avail / th)
        nw, nh = int(tw * scale), int(th * scale)
        res = tight.resize((nw, nh), Image.Resampling.LANCZOS)
        ox = (size - nw) // 2
        oy = (size - nh) // 2
        canvas.paste(res, (ox, oy), res)
    else:
        inner_margin = int(size * 0.08)
        avail = size - 2 * inner_margin
        scale = min(avail / tw, avail / th)
        nw, nh = int(tw * scale), int(th * scale)
        res = tight.resize((nw, nw), Image.Resampling.LANCZOS)
        ox = (size - nw) // 2
        oy = (size - nh) // 2
        canvas.paste(res, (ox, oy), res)
        
    return canvas

# Test at 512
t1 = create_leaf_icon(512, with_background=False)
t2 = create_leaf_icon(512, with_background=True, is_circle=False)
t3 = create_leaf_icon(512, with_background=True, is_circle=True)

t1.save(r'C:\Users\HP USER\.gemini\antigravity\brain\65b47c02-e396-45e3-ad10-d3865e1d39f0\scratch\variant_transparent.png')
t2.save(r'C:\Users\HP USER\.gemini\antigravity\brain\65b47c02-e396-45e3-ad10-d3865e1d39f0\scratch\variant_rounded_tile.png')
t3.save(r'C:\Users\HP USER\.gemini\antigravity\brain\65b47c02-e396-45e3-ad10-d3865e1d39f0\scratch\variant_circle.png')

# Also generate 48px previews of all 3
create_leaf_icon(48, False).save(r'C:\Users\HP USER\.gemini\antigravity\brain\65b47c02-e396-45e3-ad10-d3865e1d39f0\scratch\variant_trans_48.png')
create_leaf_icon(48, True, False).save(r'C:\Users\HP USER\.gemini\antigravity\brain\65b47c02-e396-45e3-ad10-d3865e1d39f0\scratch\variant_rounded_48.png')
create_leaf_icon(48, True, True).save(r'C:\Users\HP USER\.gemini\antigravity\brain\65b47c02-e396-45e3-ad10-d3865e1d39f0\scratch\variant_circle_48.png')

print('Variants generated successfully!')
