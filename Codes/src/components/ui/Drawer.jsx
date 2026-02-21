export function Drawer({ open, title, children }) {
  if (!open) return null;
  return (
    <aside className="ui-drawer" aria-label={title}>
      <h2>{title}</h2>
      {children}
    </aside>
  );
}
