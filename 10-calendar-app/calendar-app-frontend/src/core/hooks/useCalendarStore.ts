import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Events, onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const handleSetActiveEvent = (activeEvent: Events) => {
    dispatch(onSetActiveEvent(activeEvent));
  }

  const startSavingEvent = async (event: Events) => {
    if (event._id) {
      dispatch(onUpdateEvent({...event}));
    } else {
      dispatch(onAddNewEvent({...event, _id: new Date().getTime().toString()}));
    }
  }

  const startDeleteEvent = async () => {
    dispatch(onDeleteEvent());
  }

  const { events, activeEvent } = useSelector((state: RootState) => state.calendar);
  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    handleSetActiveEvent,
    startSavingEvent,
    startDeleteEvent,
  };
}