import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // In production this would forward to a CRM, email provider, or database.
  // Wiring is intentionally left as a placeholder for the deployment target.
  console.log("New contact submission:", parsed.data);

  return NextResponse.json({ success: true });
}
