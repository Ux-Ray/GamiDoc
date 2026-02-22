import { ENDPOINTS } from "../api/endpoints";
import { getJson } from "./httpClient";

export function getChoosePathContent() {
  return getJson(ENDPOINTS.choosePathPage);
}
