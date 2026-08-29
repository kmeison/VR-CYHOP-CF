import { prisma } from "@/server/db";

const DEFAULT_ORG_NAME = "CYHOP / Virtue Reality";

export async function getOrCreateDefaultOrganizationId() {
  const existing = await prisma.organization.findFirst({
    where: { name: DEFAULT_ORG_NAME },
    select: { id: true },
  });

  if (existing) {
    return existing.id;
  }

  const created = await prisma.organization.create({
    data: { name: DEFAULT_ORG_NAME },
    select: { id: true },
  });

  return created.id;
}
