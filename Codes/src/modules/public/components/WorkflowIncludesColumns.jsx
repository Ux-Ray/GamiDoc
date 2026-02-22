const iconByItem = {
  "Define Context": "/icons/choose-path/target-check.png",
  "Review system": "/icons/choose-path/target-check.png",
  "Select game elements": "/icons/choose-path/puzzle.png",
  "Select Methods": "/icons/choose-path/puzzle.png",
  "Plan evaluation": "/icons/choose-path/document-badge.png",
  "Assess metrics": "/icons/choose-path/document-badge.png",
};

function IncludesItem({ label }) {
  return (
    <li className="workflow-includes__item">
      <img src={iconByItem[label]} alt={`${label} icon`} />
      <span>{label}</span>
    </li>
  );
}

export function WorkflowIncludesColumns({ includes }) {
  return (
    <section className="workflow-includes">
      <h2>What each workflow includes</h2>
      <div className="workflow-includes__columns">
        <div>
          <h3>For New Systems</h3>
          <ul>
            {includes.newSystem.map((item) => (
              <IncludesItem key={item} label={item} />
            ))}
          </ul>
        </div>
        <div>
          <h3>For existing systems</h3>
          <ul className="workflow-includes__right">
            {includes.existingSystem.map((item) => (
              <IncludesItem key={item} label={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
