export function Card({ title, description, action, icon }) {
  const iconSrc = icon?.src ?? "/icons/design-evaluate.svg";
  const iconAlt = icon?.alt ?? "Feature card icon";

  return (
    <article className="ui-card">
      <div className="ui-card__title-row">
        <img className="ui-card__icon" src={iconSrc} alt={iconAlt} />
        <h3 className="ui-card__title">{title}</h3>
      </div>
      <p className="ui-card__description">{description}</p>
      <div className="ui-card__action">{action}</div>
    </article>
  );
}
