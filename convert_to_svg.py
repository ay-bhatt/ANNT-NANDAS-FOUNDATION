#!/usr/bin/env python3
"""
Convert JPEG/PNG images to SVG format by embedding them as base64-encoded
<image> elements inside an SVG container. This creates self-contained,
valid SVG files that can be used as background images or <img> sources.

Usage: python convert_to_svg.py <input_image> <output_svg> [max_width]
"""

import sys
import os
import base64

try:
    from PIL import Image
except ImportError:
    print("PIL/Pillow not available. Installing...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "-q"])
    from PIL import Image


def jpeg_quality_for_size(img_width_px, target_bytes=700_000):
    """Estimate a JPEG quality that gets the base64 SVG near target_bytes."""
    # Rough heuristic: 1000px wide at quality 85 ≈ 150KB raw JPEG
    # We want to target ~500-800KB for the base64 SVG
    if img_width_px > 2000:
        return 82
    elif img_width_px > 1500:
        return 85
    else:
        return 88


def convert_image_to_svg(input_path, output_path, max_width=1600):
    """Convert an image file to an SVG containing the image as base64."""
    if not os.path.exists(input_path):
        print(f"ERROR: Input file not found: {input_path}")
        return False

    img = Image.open(input_path)
    orig_width, orig_height = img.size

    # Resize if exceeds max_width while maintaining aspect ratio
    if orig_width > max_width:
        ratio = max_width / orig_width
        new_width = max_width
        new_height = int(orig_height * ratio)
        img = img.resize((new_width, new_height), Image.LANCZOS)
    else:
        new_width, new_height = orig_width, orig_height

    # Convert to RGB if needed (JPEG doesn't support RGBA/alpha)
    if img.mode in ("RGBA", "P", "L"):
        # Create white background for transparency
        if img.mode == "RGBA":
            background = Image.new("RGB", img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1] if img.mode == "RGBA" else None)
            img = background
        elif img.mode == "P":
            img = img.convert("RGB")
        elif img.mode == "L":
            img = img.convert("RGB")

    quality = jpeg_quality_for_size(new_width)

    # Save image as JPEG to a buffer, then base64-encode
    import io
    buffer = io.BytesIO()
    img.save(buffer, format="JPEG", quality=quality, optimize=True)
    img_bytes = buffer.getvalue()
    b64_data = base64.b64encode(img_bytes).decode("ascii")

    # Determine the MIME type from the extension
    ext = os.path.splitext(input_path)[1].lower()
    mime = "image/jpeg" if ext in (".jpg", ".jpeg") else "image/png" if ext == ".png" else "image/jpeg"

    # Build SVG content
    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {new_width} {new_height}" width="{new_width}" height="{new_height}" preserveAspectRatio="xMidYMid slice">
  <image href="data:{mime};base64,{b64_data}" width="{new_width}" height="{new_height}" />
</svg>'''

    # Write SVG file
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(svg_content)

    orig_size = os.path.getsize(input_path)
    svg_size = os.path.getsize(output_path)
    print(f"  Converted: {os.path.basename(input_path)} ({orig_size/1024:.0f}KB) → {os.path.basename(output_path)} ({svg_size/1024:.0f}KB)")
    return True


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python convert_to_svg.py <input_image> <output_svg> [max_width]")
        print("Example: python convert_to_svg.py src/assets/hero/mob-hero\\ \\(1\\).jpeg public/assets/svg/mob-hero-01.svg")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]
    max_width = int(sys.argv[3]) if len(sys.argv) > 3 else 1600

    success = convert_image_to_svg(input_path, output_path, max_width)
    sys.exit(0 if success else 1)
