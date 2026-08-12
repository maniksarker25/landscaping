import type { NextApiRequest, NextApiResponse } from "next";
import { fetchTestimonialsData } from "@/lib/api/testimonials";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  try {
    const data = await fetchTestimonialsData();
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=30",
    );
    return res.status(200).json(data);
  } catch (error) {
    console.error("API proxy error /api/testimonial/get-all:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials from backend API",
      data: [],
    });
  }
}
