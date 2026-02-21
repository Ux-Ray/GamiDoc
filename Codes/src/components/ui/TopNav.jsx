import { Button } from "./Button";
import { Container } from "./Container";

export function TopNav({ onLogin, onSignup }) {
  return (
    <nav className="top-nav" aria-label="Main">
      <Container className="top-nav__content">
        <a className="top-nav__brand" href="/">
          GamiDoc
        </a>
        <div className="top-nav__actions">
          <Button variant="nav-small" onClick={onLogin}>
            Log In
          </Button>
          <Button variant="nav-small-primary" onClick={onSignup}>
            Sign Up
          </Button>
        </div>
      </Container>
    </nav>
  );
}
