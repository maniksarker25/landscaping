import { baseUrl } from "@/lib/helper";
import { termsOfServiceHtml } from "@/data/legal-policies";

export interface TermsConditionsData {
  _id?: string;
  title?: string;
  content?: string;
  description?: string;
  details?: string;
  html?: string;
  termsConditions?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface TermsConditionsApiResponse {
  success: boolean;
  message?: string;
  data?: TermsConditionsData | TermsConditionsData[] | string;
}

/**
 * Extract HTML content string from API response payload.
 */
function extractHtmlContent(
  data: TermsConditionsData | TermsConditionsData[] | string | undefined | null,
  fallback: string
): string {
  if (!data) return fallback;
  if (typeof data === "string") return data || fallback;

  if (Array.isArray(data)) {
    const item = data[0];
    if (!item) return fallback;
    return (
      item.content ||
      item.description ||
      item.details ||
      item.html ||
      item.termsConditions ||
      fallback
    );
  }

  return (
    data.content ||
    data.description ||
    data.details ||
    data.html ||
    data.termsConditions ||
    fallback
  );
}

/**
 * Fetch terms & conditions HTML content from backend API (/manage/get-terms-conditions).
 */
export async function fetchTermsConditionsData(): Promise<string> {
  try {
    const url = `${baseUrl}/manage/get-terms-conditions`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch terms conditions: ${res.status} ${res.statusText}`
      );
    }

    const result: TermsConditionsApiResponse = await res.json();
    return extractHtmlContent(result?.data, termsOfServiceHtml);
  } catch (error) {
    console.warn(
      "Could not fetch terms conditions from backend, using fallback data:",
      error
    );
    return termsOfServiceHtml;
  }
}
