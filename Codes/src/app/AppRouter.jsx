import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "../modules/public/pages/LandingPage";
import { PlaceholderPage } from "../modules/public/pages/PlaceholderPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/choose-path" element={<PlaceholderPage title="Choose Path" />} />
        <Route path="/resources" element={<PlaceholderPage title="Resources" />} />
        <Route path="/shared-designs" element={<PlaceholderPage title="Shared Designs" />} />
        <Route path="/auth/login" element={<PlaceholderPage title="Log In" />} />
        <Route path="/auth/signup" element={<PlaceholderPage title="Sign Up" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
