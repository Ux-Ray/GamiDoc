export function Grid({ children, className = "" }) {
  return <div className={`grid grid--three ${className}`.trim()}>{children}</div>;
}
