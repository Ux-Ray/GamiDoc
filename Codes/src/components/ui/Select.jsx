export function Select({ children, ...props }) {
  return (
    <select className="ui-select" {...props}>
      {children}
    </select>
  );
}
