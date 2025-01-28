import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface JournalSliceInitialState {
  isSaving: boolean;
  messageSave: string;
  notes: Note[];
  activeNote: Note;
}

export interface Note {
  id?: string;
  title: string;
  body: string;
  date: number;
  imageUrl: string[];
};

const initialState: JournalSliceInitialState = {
  isSaving: false,
  messageSave: '',
  notes: [],
  activeNote: {
    body: '',
    date: 0,
    imageUrl: [],
    title: ''
  },
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState: initialState,
  reducers: {
    isCreatingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<Note>) => {
      state.activeNote = action.payload;
      state.messageSave = '';
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSave = '';
    },
    updatedNote: (state, action: PayloadAction<Note>) => {
      state.isSaving = false;
      state.notes = state.notes.map(note => {
        if (note.id === action.payload.id) {
          return {
            id: action.payload.id,
            body: action.payload.body,
            date: action.payload.date,
            imageUrl: action.payload.imageUrl,
            title: action.payload.title,
          };
        }
        return note;
      }); 
      state.messageSave = `${action.payload.title} updated successfully!`
    },
    setPhotosToActiveNote: (state, action: PayloadAction<string[]>) => {
      state.activeNote.imageUrl = [...state.activeNote.imageUrl, ...action.payload];
      state.isSaving = false;
    },
    deleteNoteById: (state, action: PayloadAction<Note>) => {
      state.activeNote = initialState.activeNote;
      state.notes = state.notes.filter(note => note.id !== action.payload.id);
    },
    clearNotesLogout: (state) => {
      state.activeNote = initialState.activeNote;
      state.isSaving = false;
      state.messageSave = '';
      state.notes = [];
    }
  },
});

export const { isCreatingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updatedNote, deleteNoteById, setPhotosToActiveNote, clearNotesLogout } = journalSlice.actions;