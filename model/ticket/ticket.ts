export interface Iticket {
    title : string,
    description : string,
    contact : string,
    status : string,
}
export interface Ticket {
    id: number
    title : string,
    description : string,
    contact : string,
    Create_Timestamp : string,
    update_Timestamp : string | null | undefined,
    status : string,
}

export interface UTicket {
    id: number
    title : string,
    description : string,
    contact : string,
    update_Timestamp : string,
    status : string,
}