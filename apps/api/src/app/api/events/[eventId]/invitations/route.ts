import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@event-platform/db/client";
import { requireAuth } from "@/lib/middleware/auth";
import { requireRole } from "@/lib/middleware/role";
import { normalizePhone } from "@/lib/phone";
import { generateInviteCode, generateQrToken } from "@/lib/token";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const user = requireAuth(req);
    requireRole(user, ["ADMIN", "ORGANIZER"]);

    const { eventId } = await params;

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    if (
      user.role !== "ADMIN" &&
      event.organizerId !== user.userId
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const invitations = await prisma.invitation.findMany({
      where: { eventId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        guestName: true,
        guestPhone: true,
        inviteCode: true,
        ticketType: true,
        price: true,
        maxEntries: true,
        entriesUsed: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(invitations);
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const user = requireAuth(req);
    requireRole(user, ["ADMIN", "ORGANIZER"]);

    const { eventId } = await params;

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    if (
      user.role !== "ADMIN" &&
      event.organizerId !== user.userId
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      guestName,
      guestPhone,
      ticketType = "REGULAR",
      price = 0,
      maxEntries = 1,
    } = body;

    if (!guestPhone) {
      return NextResponse.json(
        { error: "Guest phone is required" },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhone(guestPhone);

    const inviteCode = generateInviteCode(
      event.title.substring(0, 4).toUpperCase()
    );

    const qrToken = generateQrToken();

    const invitation = await prisma.invitation.create({
      data: {
        eventId: event.id,
        guestName,
        guestPhone: normalizedPhone,
        ticketType,
        price,
        maxEntries,
        inviteCode,
        qrToken,
      },
    });

    return NextResponse.json(
      {
        id: invitation.id,
        inviteCode: invitation.inviteCode,
        qrToken: invitation.qrToken,
        status: invitation.status,
      },
      { status: 201 }
    );
  } catch (err: any) {
    if (err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
