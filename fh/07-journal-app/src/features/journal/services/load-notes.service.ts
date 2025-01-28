import { collection, getDocs } from "firebase/firestore/lite"
import { firebaseDB } from "../../../common";
import { Note } from "../../../store/journal";

export const loadNotes = async (id: string) => {
  const collectionRef = collection(firebaseDB, `${id}/journal/notes`);
  const docs = await getDocs(collectionRef);
  const notes: Note[] = [];
  docs.forEach(doc => {
    // console.log(doc.id, doc.data())
    notes.push({id: doc.id, ...doc.data() as Note})
  });
  return notes;
}