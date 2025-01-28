import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  Events,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";
import calendarApp from "../api/calendar-app.api";
import { convertStringToDateEvent } from "../../shared/helpers/convert-string-to-date.helper";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { events, activeEvent } = useSelector((state: RootState) => state.calendar);

  const handleSetActiveEvent = (activeEvent: Events) => {
    dispatch(onSetActiveEvent(activeEvent));
  };

  const startSavingEvent = async (event: Events) => {
    try {
      if (event._id) {
        await calendarApp.patch(`/events/${event._id}`, event);
        dispatch(onUpdateEvent({ ...event, user: user! }));
      } else {
        const { data } = await calendarApp.post("/events", event);
        dispatch(onAddNewEvent({ ...event, _id: data._id, user: user! }));
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire('Error saving event', error.response.data.message, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApp.get("/events");
      const events = convertStringToDateEvent(data);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.error(`Sometime went wrong: ${error}`);
    }
  }

  const startDeleteEvent = async () => {
    await calendarApp.delete("/events/" + activeEvent?._id);
    dispatch(onDeleteEvent());
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    handleSetActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents,
  };
};
