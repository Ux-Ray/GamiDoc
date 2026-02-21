import { Link } from "react-router-dom";
import { Container } from "../../../components/ui/Container";

export function PlaceholderPage({ title }) {
  return (
    <Container className="placeholder-page">
      <h1>{title}</h1>
      <p>This page is a placeholder for the next implementation step.</p>
      <Link to="/">Back to Landing</Link>
    </Container>
  );
}
