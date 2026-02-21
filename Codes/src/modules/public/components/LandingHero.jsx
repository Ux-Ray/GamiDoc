import { Button } from "../../../components/ui/Button";
import { SectionHeader } from "../../../components/ui/SectionHeader";

export function LandingHero({ hero, onStart }) {
  return (
    <section className="landing-hero">
      <SectionHeader title={hero.title} subtitle={hero.subtitle} />
      <Button variant="primary" onClick={onStart}>
        {hero.primaryCta.label}
      </Button>
    </section>
  );
}
