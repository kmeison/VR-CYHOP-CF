import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/server/db";
import { getOrCreateDefaultOrganizationId } from "@/server/organization";

const LeadInput = z.object({
  fullName: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().min(7).optional(),
  source: z.string().optional(),
});

export async function GET() {
  try {
    const organizationId = await getOrCreateDefaultOrganizationId();
    const leads = await prisma.lead.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        source: true,
        stage: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ data: leads });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to load leads.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = LeadInput.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const organizationId = await getOrCreateDefaultOrganizationId();
    const created = await prisma.lead.create({
      data: {
        organizationId,
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        source: parsed.data.source,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        source: true,
        stage: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        data: created,
        message: "Lead created.",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create lead.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
