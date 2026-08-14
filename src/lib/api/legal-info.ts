import { baseUrl } from "@/lib/helper";

export interface LegalInfoData {
  _id?: string;
  businessType?: string;
  companyName?: string;
  contactEmail?: string;
  contactPhone?: string;
  facebookLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
  jurisdiction?: string;
  officialWebsite?: string;
  registeredAddress?: string;
  siteName?: string;
  tagline?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LegalInfoApiResponse {
  success: boolean;
  message: string;
  data: LegalInfoData;
}

export const fallbackLegalInfo: LegalInfoData = {
  _id: "6a7f544ff0ffb1f4e7441b42",
  businessType: "Et totam commodi in",
  companyName: "Cooper and Valentine Traders",
  contactEmail: "rifavyfo@mailinator.com",
  contactPhone: "+1 (242) 692-4517",
  createdAt: "2026-08-14T17:45:50.844Z",
  facebookLink: "",
  instagramLink: "",
  jurisdiction: "Provident fugiat ex",
  linkedinLink: "",
  officialWebsite: "https://www.rugyki.ca",
  registeredAddress: "Itaque enim pariatur",
  siteName: "Quentin Flynn",
  tagline: "Sit dolore consequat",
  updatedAt: "2026-08-14T17:45:50.844Z",
};

/**
 * Fetch legal info from backend API with fallback.
 */
export async function fetchLegalInfo(): Promise<LegalInfoApiResponse> {
  try {
    const url = `${baseUrl}/legal-info/get`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch legal info: ${res.status} ${res.statusText}`);
    }

    const data: LegalInfoApiResponse = await res.json();
    return data;
  } catch (error) {
    console.warn("Could not fetch legal info from backend, using fallback data:", error);
    return {
      success: true,
      message: "Legal info retrieved successfully",
      data: fallbackLegalInfo,
    };
  }
}
