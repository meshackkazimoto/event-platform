import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@event-platform/db/client";
import { requireAuth } from "@/lib/middleware/auth";
import { requireRole } from "@/lib/middleware/role";

export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);
    requireRole(user, ["SCANNER"]);

    const { qrToken } = await req.json();

    if (!qrToken) {
      return NextResponse.json({
        result: "INVALID",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const invitation = await tx.invitation.findUnique({
        where: { qrToken },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              status: true,
            },
          },
        },
      });

      if (!invitation) {
        return { result: "INVALID" as const };
      }

      if (invitation.event.status !== "LIVE") {
        return { result: "INVALID" as const };
      }

      if (invitation.status === "CANCELLED") {
        return { result: "INVALID" as const };
      }

      if (invitation.status === "EXPIRED") {
        return { result: "EXPIRED" as const };
      }

      if (invitation.status === "CHECKED_IN") {
        return { result: "DUPLICATE" as const };
      }

      await tx.invitationScan.create({
        data: {
          invitationId: invitation.id,
          eventId: invitation.event.id,
          scannerId: user.userId,
          scanResult: "SUCCESS",
          scannerIp: req.headers.get("x-forwarded-for") ?? undefined,
        },
      });

      await tx.invitation.update({
        where: { id: invitation.id },
        data: {
          status: "CHECKED_IN",
        },
      });

      return {
        result: "SUCCESS" as const,
        guestName: invitation.guestName,
        ticketType: invitation.ticketType,
        eventTitle: invitation.event.title,
      };
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ result: "INVALID" });
  }
}
