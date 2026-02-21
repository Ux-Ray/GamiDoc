export function LandingProblemStatement({ problem }) {
  return (
    <section className="landing-problem">
      <h2>{problem.title}</h2>
      <p>{problem.body}</p>
      <h3>{problem.listTitle}</h3>
      <ul>
        {problem.bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
