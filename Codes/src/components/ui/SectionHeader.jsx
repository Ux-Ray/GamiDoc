export function SectionHeader({ title, subtitle, centered = true }) {
  return (
    <header className={`section-header ${centered ? "section-header--center" : ""}`.trim()}>
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </header>
  );
}
