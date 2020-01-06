import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

export async function getAuthors() {
  try {
    const result = await fetch(baseUrl);

    return handleResponse(result);
  } catch (e) {
    throw handleError(e);
  }
}
