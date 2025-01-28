import { Calendar, View } from 'react-big-calendar';
import { localizer, Navbar } from "../../../shared";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, FabAddNew, FabDelete } from '../components';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useAuthStore, useCalendarStore, useUiStore } from '../../../core';
import { Events } from '../../../core/store/calendar/calendarSlice';

export const CalendarPage = (): JSX.Element => {

  const {user} = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, handleSetActiveEvent, startLoadingEvents } = useCalendarStore();
  const [ lastView, setLastView ] = useState<View>(localStorage.getItem('lastView') ? localStorage.getItem('lastView') as View : "week")

  const eventStyleGetter = (event: Events, start: Date, end: Date, isSelected: boolean) => {
    // console.log({event, start, end, isSelected});

    const isMyEvent = user!._id === event.user._id;

    const style = {
      backgroundColor: isMyEvent ? '#347cf7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style,
    }
  }

  const onDoubleClick = (events: Events) => {
    // console.log('Opening Modal...');
    handleSetActiveEvent(events);
    openDateModal();
  }

  const onSelect = (events: Events) => {
    // console.log({click: event});
    handleSetActiveEvent(events);
  }

  const onViewChange = (view: View) => {
    localStorage.setItem('lastView', view);
    console.log({lastView: view})
  }

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        culture='en-US'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: '90vh' }}
        views={["month", "week", "day", "agenda"]}
        // defaultView={"day"}
        defaultView={lastView}
        // messages={getESMessages}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <FabAddNew />
      <FabDelete />
      <CalendarModal />
    </>
  )
}
