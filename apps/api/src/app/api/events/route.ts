import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@event-platform/db/client";
import { requireAuth } from "@/lib/middleware/auth";
import { requireRole } from "@/lib/middleware/role";

export async function GET(req: Request) {
  try {
    const user = requireAuth(req as NextRequest);

    const events = await prisma.event.findMany({
      where:
        user.role === "ADMIN"
          ? {}
          : { organizerId: user.userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(events);
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = requireAuth(req as NextRequest);
    requireRole(user, ["ORGANIZER", "ADMIN"]);

    const body = await req.json();
    const {
      title,
      venue,
      eventDate,
      allowReentry = false,
      entryCutoffTime,
    } = body;

    if (!title || !venue || !eventDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        venue,
        eventDate: new Date(eventDate),
        allowReentry,
        entryCutoffTime: entryCutoffTime
          ? new Date(entryCutoffTime)
          : null,
        organizerId: user.userId,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (err instanceof Error && err.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
