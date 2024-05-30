import executeQuery from "@/lib/db";
import { UTicket } from "@/model/ticket/ticket";
import dotenv from "dotenv";
import { NextRequest, NextResponse } from "next/server";
dotenv.config();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const body = await request.json();
    const context: UTicket = body;
    if (!params.id) {
      return new Response("Missing required fields", { status: 400 });
    } else {
      const result = await executeQuery({
        query:
          "UPDATE ticket SET title = ?, description = ?, contact = ?, status = ?, Update_Timestamp = ? WHERE id = ?",
        values: [
          context.title,
          context.description,
          context.contact,
          context.status,
          context.update_Timestamp,
          String(params.id),
        ],
      });
      console.log(result);
      return NextResponse.json({ message: "Ticket Update Successful" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server Error" },
      {
        status: 500,
      }
    );
  }
}
