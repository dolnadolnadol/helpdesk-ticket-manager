"use server";
import { Iticket } from "@/model/ticket/ticket";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const result = await axios.get(`http://localhost:5000/api/ticket`);
    return NextResponse.json(result.data);
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
      const body = {
        title: context.title,
        description: context.description,
        contact: context.contact,
        status: context.status,
      };
      console.log(body);
      const result = await axios.post("http://localhost:5000/api/ticket", body);
      // const result = await executeQuery({
      //   query:
      //     "INSERT INTO ticket (title, description, contact, status) VALUES (?, ?, ?, ?)",
      //   values: [
      //     context.title,
      //     context.description,
      //     context.contact,
      //     context.status,
      //   ],
      // });
      // console.log(result);
      return NextResponse.json(result.data);
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
