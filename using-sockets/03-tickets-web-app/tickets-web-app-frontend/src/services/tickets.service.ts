import axios from "axios";
import type { Ticket } from "../types/ticket.types";

export async function getAssignedTickets() {
  try {
    const { data } = await axios.get<Ticket[]>("http://localhost:3500/tickets");
    console.log(data)
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching tickets:", error.message);
      throw error; // Propaga el error para que el caller lo maneje
    }
    throw new Error("Unknown error occurred while fetching tickets.");
  }
}
