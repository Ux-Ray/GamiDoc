import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Grid } from "../../../components/ui/Grid";

const icons = {
  "design-evaluate": {
    src: "/icons/design-evaluate.svg",
    alt: "Document icon for design or evaluate workflow",
  },
  resources: {
    src: "/icons/browse-resources.svg",
    alt: "Search icon for frameworks and methods resources",
  },
  "shared-designs": {
    src: "/icons/shared-designs.svg",
    alt: "Folder icon for reviewed shared designs",
  },
};

export function LandingFeatureCards({ cards }) {
  const navigate = useNavigate();

  return (
    <section className="landing-features">
      <Grid>
        {cards.map((card) => (
          <Card
            key={card.id}
            icon={icons[card.id] ?? icons["design-evaluate"]}
            title={card.title}
            description={card.description}
            action={
              <Button variant="secondary" onClick={() => navigate(card.cta.target)}>
                {card.cta.label}
              </Button>
            }
          />
        ))}
      </Grid>
    </section>
  );
}
