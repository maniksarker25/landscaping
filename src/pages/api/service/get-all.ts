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
    const url = `${baseUrl}/service/get-all`;

    console.log("Fetching services from:", url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();

    // Set cache headers for performance
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=30");

    return res.status(200).json(data);
  } catch (error) {
    console.error("Services API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch services data",
    });
  }
}
