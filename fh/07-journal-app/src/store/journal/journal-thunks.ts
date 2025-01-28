import { Dispatch } from "@reduxjs/toolkit"
import { RootState } from '../store';
import { addNewEmptyNote, deleteNoteById, isCreatingNewNote, Note, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updatedNote } from "./journal-slices";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../common";
import { fileUpload, loadNotes } from "../../features/journal";

export const startNewNote = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    // console.log('start new note!', getState().auth);
    dispatch(isCreatingNewNote());
    const note: Note = {
      title: 'test 3',
      body: 'test 3',
      date: new Date().getTime(),
      imageUrl: []
    }
    const newDoc = doc(collection(firebaseDB, `${getState().auth.uid}/journal/notes`));
    await setDoc(newDoc, note);
    //console.log({newDoc, result})
    note.id = newDoc.id;
    dispatch(addNewEmptyNote(note));
    dispatch(setActiveNote(note));
  }
}

export const startLoadNotesFromFirestore = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    if (!getState().auth.uid) throw new Error('UID user not found!');
    const notes = await loadNotes(getState().auth.uid);
    dispatch(setNotes(notes));
  }
}

export const startUpdateNote = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;
    const noteToUpdate = { ...activeNote }
    delete noteToUpdate.id;
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
    await setDoc(docRef, noteToUpdate, { merge: true });
    dispatch(updatedNote(activeNote));
  }
}

export const startUploadFiles = (files: FileList) => {
  return async (dispatch: Dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(photosUrls));

  }
}

export const startDeleteNote = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { uid } = getState().auth;
    const { activeNote: note } = getState().journal;
    console.log({
      uid,
      note,
    });
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);
    dispatch(deleteNoteById(note));
  }
}