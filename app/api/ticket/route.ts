import { NextResponse } from "next/server";
import executeQuery from "@/lib/db";
import { Iticket, Ticket, UTicket } from "@/model/ticket/ticket";

export async function GET(request: Request) {
    try {
        const result = await executeQuery({
            query: 'SELECT * FROM ticket',
        });
        // console.log(result);
        
        return new Response(JSON.stringify(result), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
 
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const context: Iticket = body;
        if (!context.title || !context.description || !context.contact || !context.status) {
            return new Response("Missing required fields", { status: 400 });
        }else{
            const result = await executeQuery({
                query: 'INSERT INTO ticket (title, description, contact, status) VALUES (?, ?, ?, ?)',
                values: [context.title, context.description, context.contact, context.status],
            });
            console.log(result);
            return new Response(JSON.stringify({ message: "Ticket created successfully" }), { status: 201 });
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500});
    }
}
 
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const context: UTicket = body;
        if (!context.id) {
            return new Response("Missing required fields", { status: 400 });
        }else{
            const result = await executeQuery({
                query: 'UPDATE ticket SET title = ?, description = ?, contact = ?, status = ?, Update_Timestamp = ? WHERE id = ?',
                values: [context.title, context.description, context.contact, context.status, context.update_Timestamp, String(context.id)],
            });
            console.log(result);
            return new Response(JSON.stringify({ message: "Ticket updates successfully" }), { status: 201 });
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500});
    }
}
 
export async function DELETE(request: Request) {
    return new Response("DELETE method not implemented", { status: 501 });
}
