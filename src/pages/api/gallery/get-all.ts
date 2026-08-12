import { baseUrl } from "@/lib/helper";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { page, limit, sortBy, sortOrder, searchTerm, category } = req.query;

    // Build query parameters
    const params = new URLSearchParams();
    if (page) params.append("page", page as string);
    if (limit) params.append("limit", limit as string);
    if (sortBy) params.append("sortBy", sortBy as string);
    if (sortOrder) params.append("sortOrder", sortOrder as string);
    if (searchTerm) params.append("searchTerm", searchTerm as string);
    if (category) params.append("category", category as string);

    const queryString = params.toString();
    const url = `${baseUrl}/gallery/get-all${queryString ? `?${queryString}` : ""}`;

    console.log("Fetching from:", url); // Server-side log

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();

    // Set cache headers for better performance
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=30");

    return res.status(200).json(data);
  } catch (error) {
    console.error("Gallery API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery data",
    });
  }
}
