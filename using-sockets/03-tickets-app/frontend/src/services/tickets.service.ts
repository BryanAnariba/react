import type { Ticket } from "../types/ticket.types";

export async function getTickets(): Promise<Ticket[]> {
  try {
    const data = await fetch(`http://localhost:3500/api/tickets`, {
      method: "GET",
    });
    const jsonResponse = await data.json() as Ticket[];
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
