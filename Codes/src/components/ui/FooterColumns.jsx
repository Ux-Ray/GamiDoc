import { Container } from "./Container";

export function FooterColumns({ columns, copyright }) {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__grid">
          {columns.map((column) => (
            <section key={column.title}>
              <h3>{column.title}</h3>
              {column.text ? <p>{column.text}</p> : null}
              {column.note ? <p className="footer__note">{column.note}</p> : null}
              {column.links?.length ? (
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.target}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
        <p className="footer__copyright">{copyright}</p>
      </Container>
    </footer>
  );
}
