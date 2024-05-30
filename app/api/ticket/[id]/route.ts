import { UTicket } from "@/model/ticket/ticket";
import axios from "axios";
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
      const result = await axios.put(
        "http://localhost:5000/api/ticket/" + params.id,
        {
          title: context.title,
          description: context.description,
          contact: context.contact,
          status: context.status,
          update_Timestamp: context.update_Timestamp,
        }
      );
      // const result = await executeQuery({
      //   query:
      //     "UPDATE ticket SET title = ?, description = ?, contact = ?, status = ?, Update_Timestamp = ? WHERE id = ?",
      //   values: [
      //     context.title,
      //     context.description,
      //     context.contact,
      //     context.status,
      //     context.update_Timestamp,
      //     String(params.id),
      //   ],
      // });
      return NextResponse.json(result.data);
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
