"""Zamjena generisanog znaka na fasciklama originalnim logom ACCOUNT.

Ilustrativne fotografije (source-images/v2-izvornici/) imaju generisani znak nalik logu, ali netačnog oblika.
Skripta za svaku sliku:
  1. uklanja generisani znak: osvjetljenje površine rekonstruiše iz okoline (inpaint + zamućenje),
     a teksturu kože prenosi sa susjednog dijela istog fascikla;
  2. originalni znak (source-images/brand/account-znak-original.png) preslikava u perspektivu fascikla
     homografijom preko četiri tačke znaka: vrh, desni krak, donji vrh i lijevi krak;
  3. prilagođava ga osvjetljenju i teksturi površine, bez mijenjanja oblika i boja znaka.

Pokretanje (Python 3, opencv-python-headless, numpy):
    python3 scripts/zamijeni-logo.py
Rezultat: source-images/account-*.png, zatim `npm run images` za web varijante.
"""
import os
import cv2
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'source-images', 'v2-izvornici')
OUT = os.path.join(ROOT, 'source-images')
LOGO = os.path.join(ROOT, 'source-images', 'brand', 'account-znak-original.png')

# Pozadina na koju se spaja prozirna vinjeta (tamnoplava iz palete).
FLATTEN_BG = (46, 24, 10)  # BGR za #0a182e

# Tačke originalnog znaka (nakon uklanjanja praznog lijevog ruba od 233 px): vrh, desni krak, donji vrh, lijevi krak.
LOGO_TRIM_X = 233
LOGO_PTS = np.float32([[403, 1], [805, 737], [403, 1024], [1, 737]])

# Za svaku sliku: odredišne tačke (isti redoslijed), proširenje maske, pomak za uzorak teksture,
# omekšanje i svjetlina znaka. Tačke su očitane s uvećanih isječaka generisanog znaka.
JOBS = [
    dict(src='01-account-hero.png', out='account-hero.png',
         dst=[[1064.2, 454.8], [1070.5, 550.5], [996.8, 568.0], [963.5, 522.8]],
         grow=7, tex=(-150, 60), blur=0.6, gain=0.96),
    dict(src='02-account-knjigovodstvo.png', out='account-knjigovodstvo.png',
         dst=[[454.3, 775.5], [532.2, 816.3], [503.0, 850.5], [439.3, 835.5]],
         grow=9, tex=(-95, -20), blur=0.9, gain=0.9),
    dict(src='03-account-savjetovanje.png', out='account-savjetovanje.png',
         dst=[[1136.8, 363.2], [1144.3, 423.7], [1086.2, 439.5], [1058.5, 404.0]],
         grow=7, tex=(-120, 20), blur=0.8, gain=0.95),
    dict(src='04-account-inostrana-preduzeca.png', out='account-inostrana-preduzeca.png',
         dst=[[455.7, 693.5], [552.7, 721.0], [534.0, 752.3], [462.7, 744.5]],
         grow=7, tex=(130, 60), blur=0.7, gain=0.95),
    dict(src='05-account-registracija.png', out='account-registracija.png',
         dst=[[872.0, 718.0], [944.5, 774.2], [881.2, 803.0], [808.7, 774.7]],
         grow=13, tex=(-215, 10), blur=0.7, gain=0.9),
    dict(src='06-account-poslovni-projekti.png', out='account-poslovni-projekti.png',
         dst=[[1208.5, 282.0], [1263.5, 320.3], [1235.7, 349.0], [1189.3, 334.0]],
         grow=14, tex=(0, -125), blur=0.8, gain=0.92),
]


def load_logo():
    logo = cv2.imread(LOGO, cv2.IMREAD_UNCHANGED)
    return logo[:, LOGO_TRIM_X:].astype(np.float32) / 255.0  # BGRA 0..1


def load_photo(path):
    im = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if im.shape[2] == 4:  # prozirna vinjeta → spoji s tamnoplavom pozadinom
        a = im[:, :, 3:4].astype(np.float32) / 255.0
        bg = np.array(FLATTEN_BG, np.float32).reshape(1, 1, 3)
        im = (im[:, :, :3].astype(np.float32) * a + bg * (1 - a)).round().clip(0, 255).astype(np.uint8)
    return im


def kite_mask(shape, pts, grow):
    """Maska generisanog znaka: poligon kroz četiri tačke, proširen za rubove, sjene i ivice reljefa."""
    m = np.zeros(shape[:2], np.uint8)
    cv2.fillConvexPoly(m, np.int32(np.round(pts)), 255)
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * grow + 1, 2 * grow + 1))
    return cv2.dilate(m, k)


def remove_mark(img, mask, tex):
    x, y, w, h = cv2.boundingRect(mask)
    pad = 48
    x0, y0 = max(0, x - pad), max(0, y - pad)
    x1, y1 = min(img.shape[1], x + w + pad), min(img.shape[0], y + h + pad)
    roi = img[y0:y1, x0:x1].copy()
    m = mask[y0:y1, x0:x1]

    # Niske frekvencije (osvjetljenje) iz okoline.
    inp = cv2.inpaint(roi, m, 9, cv2.INPAINT_TELEA).astype(np.float32)
    low = cv2.GaussianBlur(inp, (0, 0), 7)

    # Visoke frekvencije (tekstura kože) sa susjednog dijela istog fascikla.
    dx, dy = tex
    patch = img[y0 + dy:y1 + dy, x0 + dx:x1 + dx].astype(np.float32)
    detail = patch - cv2.GaussianBlur(patch, (0, 0), 7)

    fill = low + detail
    feather = cv2.GaussianBlur(m.astype(np.float32) / 255.0, (0, 0), 2.5)[..., None]
    out = roi.astype(np.float32) * (1 - feather) + fill * feather
    img[y0:y1, x0:x1] = out.round().clip(0, 255).astype(np.uint8)
    return (x0, y0, x1, y1)


def paste_logo(img, logo, dst, box, blur, gain):
    x0, y0, x1, y1 = box
    roi = img[y0:y1, x0:x1].astype(np.float32)
    S = 4  # nadsemplovanje radi glatkih ivica
    d = (np.float32(dst) - np.float32([x0, y0])) * S
    H = cv2.getPerspectiveTransform(LOGO_PTS, d)
    big = cv2.warpPerspective(logo, H, ((x1 - x0) * S, (y1 - y0) * S), flags=cv2.INTER_LINEAR,
                              borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))
    layer = cv2.resize(big, (x1 - x0, y1 - y0), interpolation=cv2.INTER_AREA)
    if blur > 0:
        layer = cv2.GaussianBlur(layer, (0, 0), blur)
    rgb, a = layer[:, :, :3], layer[:, :, 3:4]
    # Premultiplied → straight boje
    rgb = np.where(a > 1e-4, rgb / np.maximum(a, 1e-4), 0)

    gray = cv2.cvtColor(roi.astype(np.uint8), cv2.COLOR_BGR2GRAY).astype(np.float32)
    # Osvjetljenje površine (relativno na prosjek ispod znaka) i zrnatost kože.
    light = cv2.GaussianBlur(gray, (0, 0), 12)
    ref = float((light * (a[..., 0] > 0.5)).sum() / max(1, (a[..., 0] > 0.5).sum()))
    shade = np.clip(light / max(ref, 1), 0.75, 1.3) ** 0.6
    grain = (gray - cv2.GaussianBlur(gray, (0, 0), 2.5)) / 255.0
    rgb = rgb * 255.0 * gain * shade[..., None] * (1 + 0.8 * grain[..., None])

    out = roi * (1 - a) + rgb * a
    img[y0:y1, x0:x1] = out.round().clip(0, 255).astype(np.uint8)


def main():
    logo = load_logo()
    # Premultiplied alpha za ispravno interpoliranje ivica
    logo[:, :, :3] *= logo[:, :, 3:4]
    for job in JOBS:
        img = load_photo(os.path.join(SRC, job['src']))
        dst = np.float32(job['dst'])
        mask = kite_mask(img.shape, dst, job['grow'])
        box = remove_mark(img, mask, job['tex'])
        paste_logo(img, logo, dst, box, job['blur'], job['gain'])
        cv2.imwrite(os.path.join(OUT, job['out']), img, [cv2.IMWRITE_PNG_COMPRESSION, 6])
        print('✓', job['out'])


if __name__ == '__main__':
    main()
