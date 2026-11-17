/**
 * TiltCard — A crisp, blur-free card container with smooth transition support
 * and zero 3D rasterization artifacts.
 */
export default function TiltCard({
  children,
  className = '',
  style = {},
  ...props
}) {
  return (
    <div
      className={className}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
