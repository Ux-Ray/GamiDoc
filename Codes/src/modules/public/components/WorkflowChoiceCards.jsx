import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Grid } from "../../../components/ui/Grid";

const iconMap = {
  "new-system": {
    src: "/icons/choose-path/new-system.png",
    alt: "Clipboard icon for new system workflow",
  },
  "existing-system": {
    src: "/icons/choose-path/existing-system.png",
    alt: "Monitor icon for existing system evaluation workflow",
  },
};

export function WorkflowChoiceCards({ workflowCards }) {
  const navigate = useNavigate();

  return (
    <section className="workflow-choice-cards">
      <Grid className="workflow-choice-cards__grid">
        {workflowCards.map((card) => (
          <Card
            key={card.id}
            icon={iconMap[card.id]}
            title={card.title}
            description={card.description}
            action={
              <Button
                variant={card.id === "new-system" ? "primary" : "secondary"}
                onClick={() => navigate(card.cta.target)}
              >
                {card.cta.label}
              </Button>
            }
          />
        ))}
      </Grid>
    </section>
  );
}
