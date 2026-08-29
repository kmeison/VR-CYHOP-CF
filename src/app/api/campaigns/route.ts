import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/server/db";
import { getOrCreateDefaultOrganizationId } from "@/server/organization";

const CampaignInput = z.object({
  name: z.string().min(3),
  channel: z.enum(["meta", "google", "email", "sms", "organic"]),
  status: z.enum(["draft", "active", "paused"]).default("draft"),
  budget: z.number().positive().optional(),
});

export async function GET() {
  try {
    const organizationId = await getOrCreateDefaultOrganizationId();
    const campaigns = await prisma.campaign.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        channel: true,
        status: true,
        budget: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ data: campaigns });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to load campaigns.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = CampaignInput.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const organizationId = await getOrCreateDefaultOrganizationId();
    const created = await prisma.campaign.create({
      data: {
        organizationId,
        name: parsed.data.name,
        channel: parsed.data.channel,
        status: parsed.data.status,
        budget: parsed.data.budget,
      },
      select: {
        id: true,
        name: true,
        channel: true,
        status: true,
        budget: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        data: created,
        message: "Campaign created.",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create campaign.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
