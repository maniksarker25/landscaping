import { NextResponse } from "next/server";
import { contactPayloadSchema } from "@/lib/validations";

export async function handleContactCreate(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON payload format.",
        },
        { status: 400 }
      );
    }

    const parseResult = contactPayloadSchema.safeParse(body);

    if (!parseResult.success) {
      const formattedErrors = parseResult.error.flatten();
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please check your submission fields.",
          issues: formattedErrors.fieldErrors,
        },
        { status: 400 }
      );
    }

    const payload = parseResult.data;

    const record = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      interestedService: payload.interestedService,
      message: payload.message,
      createdAt: new Date().toISOString(),
    };

    console.log("Contact submission received:", record);

    return NextResponse.json(
      {
        success: true,
        message: "Contact inquiry created successfully.",
        data: record,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Unhandled error processing contact submission:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
