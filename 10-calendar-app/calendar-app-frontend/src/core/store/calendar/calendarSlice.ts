import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

export interface CalendarSlice {
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

const initialState: CalendarSlice = {
  events: [
    {
      _id: new Date().getTime().toString(),
      title: 'Birthday',
      notes: 'Buy a cake ON 24 December',
      start: new Date(),
      end: addHours(new Date(), 2),
      user: {
        _id: 'adsdadas',
        name: 'Maria'
      },
      bgColor: '#fafafa',
    }
  ],
  activeEvent: null,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
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
    }
  },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;