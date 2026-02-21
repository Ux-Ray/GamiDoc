import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Grid } from "../../../components/ui/Grid";

const icons = {
  "design-evaluate": "📄",
  resources: "💡",
  "shared-designs": "🗂️",
};

export function LandingFeatureCards({ cards }) {
  const navigate = useNavigate();

  return (
    <section className="landing-features">
      <Grid>
        {cards.map((card) => (
          <Card
            key={card.id}
            icon={icons[card.id] ?? "📄"}
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
