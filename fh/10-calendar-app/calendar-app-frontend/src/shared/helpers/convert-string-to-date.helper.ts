import { parseISO } from "date-fns";
import { Events } from "../../core/store/calendar/calendarSlice";

export const convertStringToDateEvent = (events: Events[]) => {
  return events.map((event) => {
    event.start = parseISO(event.start.toString());
    event.end = parseISO(event.end.toString());
    return event;
  });
};
