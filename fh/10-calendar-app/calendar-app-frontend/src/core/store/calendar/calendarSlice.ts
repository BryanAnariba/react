import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CalendarSlice {
  isLoadingEvents: boolean;
  events: Events[];
  activeEvent: Events | null;
}

export interface Events {
  _id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: LoggedUser;
  bgColor: string;
}

export interface LoggedUser {
  _id: string;
  name: string;
}

const calendarInitialState: CalendarSlice = {
  isLoadingEvents: false,
  events: [],
  activeEvent: null,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: calendarInitialState,
  reducers: {
    onSetActiveEvent: (state, action: PayloadAction<Events>) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, action: PayloadAction<Events>) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, action: PayloadAction<Events>) => {
      state.events = state.events.map(event => {
        if (event._id === action.payload._id) {
          return action.payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event._id !== state.activeEvent?._id);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, action: PayloadAction<Events[]>) => {
      state.isLoadingEvents = false;
      // console.log('onLoadEvents: ', action.payload)
      action.payload.forEach(dbEvent => {
        // console.log('onLoadEvents', dbEvent)
        const existEvent = state.events.some(event => event._id === dbEvent._id);
        if (!existEvent) {
          state.events.push(dbEvent);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.activeEvent = calendarInitialState.activeEvent;
      state.events = calendarInitialState.events;
      state.isLoadingEvents = calendarInitialState.isLoadingEvents
    },
  },
});

export const { 
  onSetActiveEvent, 
  onAddNewEvent, 
  onUpdateEvent, 
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;