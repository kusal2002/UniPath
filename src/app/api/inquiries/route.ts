import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const inquiries = await prisma.inquiry.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const inquiry = await prisma.inquiry.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        nationality: body.nationality,
        educationLevel: body.educationLevel,
        gpa: body.gpa ? parseFloat(body.gpa) : null,
        preferredCountries: body.preferredCountries || [],
        preferredMajor: body.preferredMajor,
        intakeYear: parseInt(body.intakeYear),
        intakeSeason: body.intakeSeason,
        budgetRange: body.budgetRange,
        message: body.message,
      }
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 });
  }
}
