import { NextRequest, NextResponse } from "next/server";

export interface EnrollmentPayload {
  athleteName: string;
  parentName?: string;
  phone: string;
  email?: string;
  age: string | number;
  preferredBatch: string;
  primarySkill?: string;
  experience?: string;
  notes?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: EnrollmentPayload = await req.json();

    const { athleteName, phone, age, preferredBatch } = body;

    // Validation
    if (!athleteName || !athleteName.trim()) {
      return NextResponse.json(
        { error: "Athlete name is required" },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { error: "Contact phone number is required" },
        { status: 400 }
      );
    }

    if (!preferredBatch) {
      return NextResponse.json(
        { error: "Please select a preferred training batch" },
        { status: 400 }
      );
    }

    const leadId = `CCA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();

    // Log the lead data for the demo / ad campaign attribution
    console.log("=================================================");
    console.log("🏏 [CCA NEW ADMISSION LEAD RECEIVED]");
    console.log(`Lead ID:        ${leadId}`);
    console.log(`Timestamp:      ${timestamp}`);
    console.log(`Athlete:        ${athleteName} (Age: ${age || "N/A"})`);
    console.log(`Parent/Contact: ${body.parentName || "N/A"} | ${phone} | ${body.email || "N/A"}`);
    console.log(`Batch Choice:   ${preferredBatch}`);
    console.log(`Specialization: ${body.primarySkill || "All-Rounder"}`);
    console.log(`Prior Exp:      ${body.experience || "Beginner"}`);
    if (body.notes) console.log(`Notes:          ${body.notes}`);
    console.log("=================================================");

    return NextResponse.json(
      {
        success: true,
        leadId,
        message: `Trial session request received for ${athleteName}! Our Head Coach will contact you at ${phone} within 2 hours.`,
        data: {
          leadId,
          athleteName,
          preferredBatch,
          trialDate: "Upcoming Saturday / Sunday (06:30 AM or 04:30 PM)",
          venue: "Sector 16 Cricket Stadium & South Turf Nets, Chandigarh"
        }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing admission lead:", error);
    return NextResponse.json(
      { error: "Failed to process trial booking request. Please try again or call our desk." },
      { status: 500 }
    );
  }
}
