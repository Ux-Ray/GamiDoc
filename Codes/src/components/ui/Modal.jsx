export function Modal({ open, title, children }) {
  if (!open) return null;
  return (
    <div className="ui-modal-backdrop" role="presentation">
      <section className="ui-modal" role="dialog" aria-modal="true" aria-label={title}>
        <h2>{title}</h2>
        {children}
      </section>
    </div>
  );
}
