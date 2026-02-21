import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, it, vi, afterEach } from "vitest";
import { LandingPage } from "../modules/public/pages/LandingPage";

const landingResponse = {
  hero: {
    title: "Welcome To GamiDoc!",
    subtitle: ["line 1", "line 2"],
    primaryCta: { label: "+ Start a New project", target: "/choose-path" },
  },
  featureCards: [
    {
      id: "design-evaluate",
      title: "Design or evaluate a gamified system",
      description: "text",
      cta: { label: "More details", target: "/choose-path" },
    },
    {
      id: "resources",
      title: "Brows frameworks & methods",
      description: "text",
      cta: { label: "Browse resources", target: "/resources" },
    },
    {
      id: "shared-designs",
      title: "View reviewed design",
      description: "text",
      cta: { label: "View shared designs", target: "/shared-designs" },
    },
  ],
  problemStatement: {
    title: "Designing and evaluating gamification is methodologically hard",
    body: "body",
    listTitle: "GamiDoc addresses these issues",
    bullets: ["a", "b", "c"],
  },
  footer: {
    columns: [{ title: "About Gamidoc", links: [{ label: "About", target: "/about" }] }],
    copyright: "©",
  },
};

function renderWithRoutes() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/choose-path" element={<p>Choose Path</p>} />
        <Route path="/resources" element={<p>Resources</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("LandingPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders content from APIs", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ isAuthenticated: false }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => landingResponse,
        }),
    );

    renderWithRoutes();

    await screen.findByText("Welcome To GamiDoc!");
    expect(screen.getByText("Design or evaluate a gamified system")).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Researchers working with gamification design and evaluation artifacts",
      }),
    ).toBeInTheDocument();
  });

  it("shows retry state on API failure and reloads on retry", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({ ok: false, status: 500 })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ isAuthenticated: false }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => landingResponse,
        }),
    );

    renderWithRoutes();

    await screen.findByText("Landing page content is temporarily unavailable.");
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));

    await screen.findByText("Welcome To GamiDoc!");
  });

  it("navigates when user clicks start button", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ isAuthenticated: false }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => landingResponse,
        }),
    );

    renderWithRoutes();

    await screen.findByText("Welcome To GamiDoc!");
    fireEvent.click(screen.getByRole("button", { name: "+ Start a New project" }));

    await waitFor(() => {
      expect(screen.getByText("Choose Path")).toBeInTheDocument();
    });
  });
});
