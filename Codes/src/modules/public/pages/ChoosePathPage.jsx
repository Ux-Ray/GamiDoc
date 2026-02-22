import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../../components/ui/Container";
import { FooterColumns } from "../../../components/ui/FooterColumns";
import { TopNav } from "../../../components/ui/TopNav";
import { getChoosePathContent } from "../../../services/choosePathService";
import { getLandingPageContent } from "../../../services/landingService";
import { getSession } from "../../../services/sessionService";
import { ChoosePathHero } from "../components/ChoosePathHero";
import { WorkflowChoiceCards } from "../components/WorkflowChoiceCards";
import { WorkflowIncludesColumns } from "../components/WorkflowIncludesColumns";
import { WorkflowSceneBlock } from "../components/WorkflowSceneBlock";

export function ChoosePathPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [content, setContent] = useState(null);
  const [footer, setFooter] = useState(null);

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      await getSession();
      const [choosePathContent, landingContent] = await Promise.all([
        getChoosePathContent(),
        getLandingPageContent(),
      ]);
      setContent(choosePathContent);
      setFooter(landingContent.footer);
    } catch (fetchError) {
      setError(fetchError.message || "Failed to load page.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <main className="loading-state">
        <p>Loading choose path page...</p>
      </main>
    );
  }

  if (error || !content || !footer) {
    return (
      <main className="error-state">
        <p>Choose-path page content is temporarily unavailable.</p>
        <button type="button" onClick={loadData}>
          Retry
        </button>
      </main>
    );
  }

  return (
    <main className="choose-path-page">
      <TopNav onLogin={() => navigate("/auth/login")} onSignup={() => navigate("/auth/signup")} />
      <Container>
        <ChoosePathHero title={content.title} subtitle={content.subtitle} />
        <WorkflowChoiceCards workflowCards={content.workflowCards} />
        <WorkflowSceneBlock />
        <WorkflowIncludesColumns includes={content.includes} />
      </Container>
      <FooterColumns columns={footer.columns} copyright={footer.copyright} />
    </main>
  );
}
