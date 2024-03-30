import { Iticket, UTicket } from "@/model/ticket/ticket";

export async function getHello() {
    try {
        const response = await fetch("http://localhost:3000/api/ticket");
        const data = await response.json();
        return data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Return null in case of an error
    }
}

export async function getTicket() {
    try {
        const response = await fetch("http://localhost:3000/api/ticket");
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        return data; // Return the fetched data
    } catch (error: any) {
        console.error("Error fetching data:", error.message);
        return null; // Return null in case of an error
    }
}

export async function getTicketById(id: number) {
    try {
        const response = await fetch(`http://localhost:3000/api/ticket/${id}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}

export async function createTicket(ticketData : Iticket) {
    try {
        const response = await fetch("http://localhost:3000/api/ticket", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketData)
        });
        const data = await response.json();
        return data; // Return the response data
    } catch (error) {
        console.error("Error creating ticket:", error);
        return null; // Return null in case of an error
    }
}

export async function updateTicket(ticketData : UTicket) {
    try {
        const response = await fetch("http://localhost:3000/api/ticket", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketData)
        });
        const data = await response.json();
        return data; // Return the response data
    } catch (error) {
        console.error("Error creating ticket:", error);
        return null; // Return null in case of an error
    }
}
