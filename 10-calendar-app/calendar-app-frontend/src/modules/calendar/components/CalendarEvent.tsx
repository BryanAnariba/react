import { Events } from "../../../core/store/calendar/calendarSlice";

interface CalendarEventProps {
  event: Events;
}

export const CalendarEvent = ({ event }: CalendarEventProps) => {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.user && <small> - {event.user.name}</small>}
    </span>
  );
};