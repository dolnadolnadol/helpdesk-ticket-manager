import executeQuery from "@/lib/db";
import { Ticket } from "@/model/ticket/ticket";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const pathname = url.pathname;
        const ticketId = pathname.split('/').pop();
        if (ticketId) {
            const result = await executeQuery({
                query: 'SELECT * FROM ticket WHERE id = ? Limit 1',
                values: [ticketId]
            });
            console.log(result);
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