import fi1 from "@/FashionAsset/FI-1.jpg";
import fi2 from "@/FashionAsset/FI-2.avif";
import fi3 from "@/FashionAsset/FI-3.avif";
import fi4 from "@/FashionAsset/FI-4.jpg";
import fi5 from "@/FashionAsset/FI-5.avif";
import fi6 from "@/FashionAsset/FI-6.avif";
import fi7 from "@/FashionAsset/FI-7.webp";
import fi8 from "@/FashionAsset/FI-8.avif";
import fi9 from "@/FashionAsset/FI-9.jpg";
import fi10 from "@/FashionAsset/FI-10.webp";
import fi11 from "@/FashionAsset/FI-11.jpg";
import fi12 from "@/FashionAsset/FI-12.webp";
import fi13 from "@/FashionAsset/FI-13.webp";
import fi14 from "@/FashionAsset/FI-14.jpg";
import fi15 from "@/FashionAsset/FI-15.webp";
import fi16 from "@/FashionAsset/FI-16.jpg";
import fi17 from "@/FashionAsset/FI-17.jpg";
import fi18 from "@/FashionAsset/FI-18.jpg";
import fi19 from "@/FashionAsset/FI-19.jpg";
import fi20 from "@/FashionAsset/FI-20.jpg";
import fi21 from "@/FashionAsset/FI-21.webp";
import fi22 from "@/FashionAsset/FI-22.jpg";
import fi23 from "@/FashionAsset/FI-23.jpg";
import fi24 from "@/FashionAsset/FI-24.jpg";
import { OUTFITS } from "@/lib/stylar";

export const FASHION_IMAGES = [
  fi1, fi2, fi3, fi4, fi5, fi6, fi7, fi8, fi9, fi10, fi11, fi12,
  fi13, fi14, fi15, fi16, fi17, fi18, fi19, fi20, fi21, fi22, fi23, fi24,
];

export function getOutfitImage(outfitId: string): string {
  const idx = OUTFITS.findIndex((o) => o.id === outfitId);
  const i = idx < 0 ? 0 : idx;
  return FASHION_IMAGES[i % FASHION_IMAGES.length];
}
