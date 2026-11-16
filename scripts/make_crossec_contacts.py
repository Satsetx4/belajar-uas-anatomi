from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(r"D:\!AGY\belajar-uas-anatomi")
ASSETS = ROOT / "public" / "assets" / "crossec"
OUT = ROOT / "_extract" / "sheets"
OUT.mkdir(parents=True, exist_ok=True)

for region in ["head", "thorax", "abdomen"]:
    files = sorted((ASSETS / region).glob("*.webp"), key=lambda p: int(p.stem.split("-p")[1]))
    chunk = 4
    for idx in range(0, len(files), chunk):
        batch = files[idx:idx+chunk]
        cw, ch = 960, 720
        canvas = Image.new("RGB", (cw * 2, ch * 2), "#ffffff")
        for k, fp in enumerate(batch):
            im = Image.open(fp).convert("RGB")
            im.thumbnail((cw, ch), Image.Resampling.LANCZOS)
            ox = (k % 2) * cw
            oy = (k // 2) * ch
            canvas.paste(im, (ox, oy))
            d = ImageDraw.Draw(canvas)
            d.rectangle([ox + 8, oy + 8, ox + 170, oy + 36], fill="#0f172a")
            d.text((ox + 14, oy + 14), fp.stem, fill="#38bdf8")
        out_fp = OUT / f"{region}_batch_{idx//chunk + 1}.jpg"
        canvas.save(out_fp, quality=88)

print("Generated contact sheets in", OUT)
print(sorted(p.name for p in OUT.glob("*.jpg")))
