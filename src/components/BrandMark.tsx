export default function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <img
      src="/logo.svg"
      width={size}
      height={size}
      alt=""
      className="brand-mark"
    />
  )
}
