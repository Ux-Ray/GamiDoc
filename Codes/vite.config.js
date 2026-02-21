import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const landingContent = {
  hero: {
    title: "Welcome To GamiDoc!",
    subtitle: [
      "a tool for Designing and evaluating gamification methodologically easy",
      "Manage your projects, explore evaluation methods, and access shares",
    ],
    primaryCta: { label: "+ Start a New project", target: "/choose-path" },
  },
  featureCards: [
    {
      id: "design-evaluate",
      title: "Design or evaluate a gamified system",
      description:
        "Create a project to design a new gamified system or evaluate an existing one using structured methods.",
      cta: { label: "More details", target: "/choose-path" },
    },
    {
      id: "resources",
      title: "Brows frameworks & methods",
      description:
        "Explore gamification frameworks, UX evaluation instruments, and academic references.",
      cta: { label: "Browse resources", target: "/resources" },
    },
    {
      id: "shared-designs",
      title: "View reviewed design",
      description:
        "See documents and evaluated gamifies systems shared by other researchers and designers.",
      cta: { label: "View shared designs", target: "/shared-designs" },
    },
  ],
  problemStatement: {
    title: "Designing and evaluating gamification is methodologically hard",
    body: "Researchers and practitioners often struggle to connect gamification design choices with evaluation methods and long-term documentation. As a result, design rationales are lost, evaluations are weak, and results are hard to interpret or reproduce.",
    listTitle: "GamiDoc addresses these issues",
    bullets: [
      "Make gamification design decisions explicit and structured",
      "Evaluation methods are chosen late or inconsistently",
      "Design decisions are rarely documented over time",
    ],
  },
  footer: {
    columns: [
      {
        title: "About Gamidoc",
        text: "GamiDoc is a research-driven tool supporting the design, evaluation, and documentation of gamified systems through structured methodologies.",
        note: "Project of the Human-computer interaction group at Fondazione Bruno Kessler",
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", target: "/resources/documentation" },
          { label: "Gamification Frameworks", target: "/resources/frameworks" },
          { label: "UX Evaluation Methods", target: "/resources/evaluation-methods" },
          { label: "Reviewed Designs", target: "/shared-designs" },
        ],
      },
      {
        title: "Research & Publications",
        links: [
          { label: "Related", target: "/research/related" },
          { label: "Publication", target: "/research/publications" },
          { label: "How to cite GamiDoc", target: "/research/cite" },
        ],
      },
      {
        title: "Privacy policy",
        links: [
          { label: "Terms of use", target: "/terms" },
          { label: "Contact us", target: "/contact" },
        ],
      },
    ],
    copyright: "© GamiDoc - Research tool for gamification design & evaluation | University/Lab name | 2024",
  },
};

function liteBackendPlugin() {
  return {
    name: "lite-backend",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/api/v1/auth/session" && req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              isAuthenticated: false,
              user: null,
              allowedActions: ["login", "signup"],
            }),
          );
          return;
        }

        if (req.url?.startsWith("/api/v1/pages/landing") && req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(landingContent));
          return;
        }

        if (req.url === "/api/v1/analytics/events" && req.method === "POST") {
          res.statusCode = 202;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ accepted: true }));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), liteBackendPlugin()],
  test: {
    environment: "happy-dom",
    setupFiles: "./src/tests/setup.js",
  },
});

