import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  /** Logo height in pixels */
  height?: number;
  /** Link target; pass `false` for a non-clickable logo */
  href?: string | false;
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  height = 40,
  href = "/",
  className = "",
  priority = true,
}: BrandLogoProps) {
  const width = Math.round(height * 2.85);

  const logo = (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width, height }}
    >
      <Image
        src="/Logo.png"
        alt="Go Kids"
        fill
        sizes={`${width}px`}
        className="object-contain object-left"
        priority={priority}
      />
    </span>
  );

  if (href === false) {
    return logo;
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center animate-wobble"
      aria-label="Go Kids Home"
    >
      {logo}
    </Link>
  );
}
