import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ChoosePathPage } from "../modules/public/pages/ChoosePathPage";

const choosePathResponse = {
  title: "Choose your Path",
  subtitle: "Get started by selecting how you want to use GamiDoc for your project",
  workflowCards: [
    {
      id: "new-system",
      title: "Design & Evaluate a New System",
      description: "Create and evaluate a gamified system from scratch.",
      cta: { label: "Start Designing", target: "/design/context" },
    },
    {
      id: "existing-system",
      title: "Evaluate an Existing System",
      description: "Assess and document the evaluation of a system that is already implemented.",
      cta: { label: "Start Evaluation", target: "/evaluation/review" },
    },
  ],
  includes: {
    newSystem: ["Define Context", "Select game elements", "Plan evaluation"],
    existingSystem: ["Review system", "Select Methods", "Assess metrics"],
  },
};

const landingFooter = {
  footer: {
    columns: [{ title: "About Gamidoc", text: "text", links: [] }],
    copyright: "©",
  },
};

function renderWithRoutes() {
  return render(
    <MemoryRouter initialEntries={["/choose-path"]}>
      <Routes>
        <Route path="/choose-path" element={<ChoosePathPage />} />
        <Route path="/design/context" element={<p>Design Context</p>} />
        <Route path="/evaluation/review" element={<p>Evaluation Review</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ChoosePathPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders choose-path content from API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({ ok: true, json: async () => ({ isAuthenticated: false }) })
        .mockResolvedValueOnce({ ok: true, json: async () => choosePathResponse })
        .mockResolvedValueOnce({ ok: true, json: async () => landingFooter }),
    );

    renderWithRoutes();

    await screen.findByText("Choose your Path");
    expect(screen.getByText("Design & Evaluate a New System")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Workflow scene with generate report icon" }),
    ).toBeInTheDocument();
  });

  it("shows retry state and recovers", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({ ok: false, status: 500 })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ isAuthenticated: false }) })
        .mockResolvedValueOnce({ ok: true, json: async () => choosePathResponse })
        .mockResolvedValueOnce({ ok: true, json: async () => landingFooter }),
    );

    renderWithRoutes();

    await screen.findByText("Choose-path page content is temporarily unavailable.");
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    await screen.findByText("Choose your Path");
  });

  it("navigates through workflow ctas", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({ ok: true, json: async () => ({ isAuthenticated: false }) })
        .mockResolvedValueOnce({ ok: true, json: async () => choosePathResponse })
        .mockResolvedValueOnce({ ok: true, json: async () => landingFooter }),
    );

    renderWithRoutes();

    await screen.findByText("Choose your Path");
    fireEvent.click(screen.getByRole("button", { name: "Start Designing" }));
    await waitFor(() => {
      expect(screen.getByText("Design Context")).toBeInTheDocument();
    });
  });
});
