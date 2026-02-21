import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../../components/ui/Container";
import { FooterColumns } from "../../../components/ui/FooterColumns";
import { TopNav } from "../../../components/ui/TopNav";
import { getLandingPageContent } from "../../../services/landingService";
import { getSession } from "../../../services/sessionService";
import { LandingFeatureCards } from "../components/LandingFeatureCards";
import { LandingHero } from "../components/LandingHero";
import { LandingIllustrationBlock } from "../components/LandingIllustrationBlock";
import { LandingProblemStatement } from "../components/LandingProblemStatement";

export function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [content, setContent] = useState(null);

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      await getSession();
      const landingData = await getLandingPageContent();
      setContent(landingData);
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
        <p>Loading landing page...</p>
      </main>
    );
  }

  if (error || !content) {
    return (
      <main className="error-state">
        <p>Landing page content is temporarily unavailable.</p>
        <button type="button" onClick={loadData}>
          Retry
        </button>
      </main>
    );
  }

  return (
    <main className="landing-page">
      <TopNav onLogin={() => navigate("/auth/login")} onSignup={() => navigate("/auth/signup")} />
      <Container>
        <LandingHero hero={content.hero} onStart={() => navigate(content.hero.primaryCta.target)} />
        <LandingFeatureCards cards={content.featureCards} />
        <LandingIllustrationBlock />
        <LandingProblemStatement problem={content.problemStatement} />
      </Container>
      <FooterColumns columns={content.footer.columns} copyright={content.footer.copyright} />
    </main>
  );
}
