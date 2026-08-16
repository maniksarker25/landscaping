import { baseUrl } from "@/lib/helper";
import { privacyPolicyHtml } from "@/data/legal-policies";

export interface PrivacyPolicyData {
  _id?: string;
  title?: string;
  content?: string;
  description?: string;
  details?: string;
  html?: string;
  privacyPolicy?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface PrivacyPolicyApiResponse {
  success: boolean;
  message?: string;
  data?: PrivacyPolicyData | PrivacyPolicyData[] | string;
}

/**
 * Extract HTML content string from API response payload.
 */
function extractHtmlContent(
  data: PrivacyPolicyData | PrivacyPolicyData[] | string | undefined | null,
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
      item.privacyPolicy ||
      fallback
    );
  }

  return (
    data.content ||
    data.description ||
    data.details ||
    data.html ||
    data.privacyPolicy ||
    fallback
  );
}

/**
 * Fetch privacy policy HTML content from backend API (/manage/get-privacy-policy).
 */
export async function fetchPrivacyPolicyData(): Promise<string> {
  try {
    const url = `${baseUrl}/manage/get-privacy-policy`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch privacy policy: ${res.status} ${res.statusText}`
      );
    }

    const result: PrivacyPolicyApiResponse = await res.json();
    return extractHtmlContent(result?.data, privacyPolicyHtml);
  } catch (error) {
    console.warn(
      "Could not fetch privacy policy from backend, using fallback data:",
      error
    );
    return privacyPolicyHtml;
  }
}
