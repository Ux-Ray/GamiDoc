export function SectionHeader({ title, subtitle, centered = true }) {
  const subtitleLines = Array.isArray(subtitle) ? subtitle : subtitle ? [subtitle] : [];

  return (
    <header className={`section-header ${centered ? "section-header--center" : ""}`.trim()}>
      <h1>{title}</h1>
      {subtitleLines.length ? (
        <div className="section-header__subtitle-group">
          {subtitleLines.map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
        </div>
      ) : null}
    </header>
  );
}
