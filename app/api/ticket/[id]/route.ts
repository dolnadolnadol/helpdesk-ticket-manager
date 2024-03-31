import executeQuery from "@/lib/db";
import { Ticket } from "@/model/ticket/ticket";
import dotenv from 'dotenv';
dotenv.config();

function authenticateRequest(request: Request) {
    const apiKey = request.headers.get("api-key");
    if (!apiKey || apiKey !== process.env.API_KEY) {
        throw new Response("Unauthorize", { status: 401 });
    }
}

export async function GET(request: Request) {
    try {
        authenticateRequest(request);
        const url = new URL(request.url);
        const pathname = url.pathname;
        const ticketId = pathname.split('/').pop();
        if (ticketId) {
            const result = await executeQuery({
                query: 'SELECT * FROM ticket WHERE id = ? LIMIT 1',
                values: [ticketId]
            });
            // console.log(result);
            const typedResult = result as Ticket[];
            
            if (typedResult.length === 0) {
                return new Response(JSON.stringify({ error: "Ticket not found" }), { status: 404 });
            }

            return new Response(JSON.stringify(typedResult[0]), {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } else {
            return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
        }

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}