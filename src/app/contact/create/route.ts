import { handleContactCreate } from "@/lib/api/contact-handler";

export async function POST(request: Request) {
  return handleContactCreate(request);
}
