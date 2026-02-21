export function Card({ title, description, action, icon = "📄" }) {
  return (
    <article className="ui-card">
      <div className="ui-card__title-row">
        <span className="ui-card__icon" aria-hidden="true">
          {icon}
        </span>
        <h3 className="ui-card__title">{title}</h3>
      </div>
      <p className="ui-card__description">{description}</p>
      <div className="ui-card__action">{action}</div>
    </article>
  );
}
