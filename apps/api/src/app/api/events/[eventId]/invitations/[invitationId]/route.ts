import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@event-platform/db/client";
import { requireAuth } from "@/lib/middleware/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ invitationId: string }> }
) {
  try {
    const user = requireAuth(req);
    const { invitationId } = await params;

    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            organizerId: true,
          },
        },
      },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 }
      );
    }

    if (
      user.role !== "ADMIN" &&
      invitation.event.organizerId !== user.userId
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      id: invitation.id,
      guestName: invitation.guestName,
      guestPhone: invitation.guestPhone,
      inviteCode: invitation.inviteCode,
      qrToken: invitation.qrToken,
      ticketType: invitation.ticketType,
      price: invitation.price,
      maxEntries: invitation.maxEntries,
      entriesUsed: invitation.entriesUsed,
      status: invitation.status,
      event: invitation.event,
      createdAt: invitation.createdAt,
    });
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
