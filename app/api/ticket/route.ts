import executeQuery from "@/lib/db";
import { Iticket } from "@/model/ticket/ticket";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const result = await executeQuery({
      query:
        "SELECT * FROM ticket ORDER BY status, Update_Timestamp DESC, Create_Timestamp desc",
    });
    console.log("result", result);
    return NextResponse.json({ result: result });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const context: Iticket = body;
    console.log(context);
    if (
      !context.title ||
      !context.description ||
      !context.contact ||
      !context.status
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    } else {
      const result = await executeQuery({
        query:
          "INSERT INTO ticket (title, description, contact, status) VALUES (?, ?, ?, ?)",
        values: [
          context.title,
          context.description,
          context.contact,
          context.status,
        ],
      });
      console.log(result);
      return NextResponse.json({ result: result });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  return new Response("DELETE method not implemented", { status: 501 });
}
