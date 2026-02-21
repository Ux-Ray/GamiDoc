import { ENDPOINTS } from "../api/endpoints";
import { getJson } from "./httpClient";

export function getSession() {
  return getJson(ENDPOINTS.authSession);
}
