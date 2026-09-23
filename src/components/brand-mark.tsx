import Image from "next/image";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg" | "xl";
  withWordmark?: boolean;
  className?: string;
  priority?: boolean;
}

/**
 * Logotipo oficial de GC Studio.
 * Utiliza el isotipo/imagotipo tipográfico dorado caligráfico oficial.
 */
export function BrandMark({
  size = "md",
  className = "",
  priority = false,
}: BrandMarkProps) {
  const sizeClasses = {
    sm: "h-9 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto",
    xl: "h-24 w-auto",
  };

  return (
    <span className={`inline-flex items-center justify-center select-none py-0.5 group ${className}`}>
      <Image
        src="/logo-official.png"
        alt="GC Studio"
        width={678}
        height={475}
        priority={priority || size === "sm"}
        className={`${sizeClasses[size]} object-contain drop-shadow-[0_1px_2px_rgba(138,108,47,0.12)] transition-transform duration-300 group-hover:scale-[1.03]`}
      />
    </span>
  );
}
