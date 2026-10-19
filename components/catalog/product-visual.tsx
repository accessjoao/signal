import Image from "next/image";
import { Network, Radio, Video } from "lucide-react";

import type { Product } from "@/types/product";

type ProductVisualProps = {
  product: Pick<Product, "id" | "name" | "category" | "image">;
  variant: "card" | "details" | "featured";
  featuredLabel?: string;
};

const categoryIcons = {
  "Communication Devices": Radio,
  "Video & Monitoring": Video,
  "Network & Infrastructure": Network,
} as const;

const visualStyles = {
  card: {
    container: "relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#303538]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    image: "object-cover transition-transform duration-500 group-hover:scale-105",
    outerRing: "absolute h-56 w-56 rounded-full border border-white/[0.07]",
    innerRing: "absolute h-40 w-40 rounded-full border border-[#D9F36A]/15",
    glow: "absolute h-24 w-24 rounded-full bg-[#D9F36A]/[0.04] blur-2xl",
    iconSize: 72,
    iconStroke: 0.9,
    icon: "relative text-[#D9F36A]/60 transition-transform duration-500 group-hover:scale-110",
  },
  details: {
    container: "relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#303538]",
    sizes: "(max-width: 768px) 100vw, 800px",
    image: "object-cover",
    outerRing: "absolute h-[75%] aspect-square rounded-full border border-white/[0.07]",
    innerRing: "absolute h-[52%] aspect-square rounded-full border border-[#D9F36A]/15",
    glow: "absolute h-32 w-32 rounded-full bg-[#D9F36A]/[0.04] blur-3xl",
    iconSize: 88,
    iconStroke: 0.8,
    icon: "relative text-[#D9F36A]/65",
  },
  featured: {
    container: "relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#303538]",
    sizes: "(max-width: 768px) 100vw, 33vw",
    image: "object-cover transition-transform duration-500 group-hover:scale-105",
    outerRing: "absolute h-44 w-44 rounded-full border border-white/10",
    innerRing: "absolute h-28 w-28 rounded-full border border-[#D9F36A]/20",
    glow: null,
    iconSize: 64,
    iconStroke: 0.9,
    icon: "relative text-[#D9F36A]/55 transition-transform duration-500 group-hover:scale-110",
  },
} as const;

export default function ProductVisual({
  product,
  variant,
  featuredLabel,
}: ProductVisualProps) {
  const styles = visualStyles[variant];
  const CategoryIcon =
    categoryIcons[product.category as keyof typeof categoryIcons] ?? Radio;
  const image = product.image ? (
    <Image
      src={product.image}
      alt={product.name}
      fill
      sizes={styles.sizes}
      className={styles.image}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {image ? (
        image
      ) : (
        <>
          <div aria-hidden="true" className={styles.outerRing} />
          <div aria-hidden="true" className={styles.innerRing} />
          {styles.glow && <div aria-hidden="true" className={styles.glow} />}
          <CategoryIcon
            size={styles.iconSize}
            strokeWidth={styles.iconStroke}
            aria-hidden="true"
            className={styles.icon}
          />
          {variant === "details" && (
            <span className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
              SIGNAL / Product visual
            </span>
          )}
        </>
      )}

      {variant === "card" && (
        <>
          <span className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
            SIGNAL / Equipment
          </span>
          <span className="absolute bottom-5 right-6 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
            {product.id}
          </span>
        </>
      )}
      {variant === "details" && (
        <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-[#171A1D]/75 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
          {product.category}
        </span>
      )}
      {variant === "featured" && featuredLabel && (
        <span className="absolute left-6 top-6 rounded-full bg-black/40 px-2 py-1 text-xs text-white/80">
          {featuredLabel}
        </span>
      )}
    </div>
  );
}
