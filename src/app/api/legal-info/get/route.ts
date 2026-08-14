import { NextResponse } from "next/server";
import { fetchLegalInfo } from "@/lib/api/legal-info";

export async function GET() {
  const response = await fetchLegalInfo();
  return NextResponse.json(response);
}
