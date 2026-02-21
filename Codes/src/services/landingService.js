import { ENDPOINTS } from "../api/endpoints";
import { getJson } from "./httpClient";

export function getLandingPageContent() {
  return getJson(ENDPOINTS.landingPage);
}
