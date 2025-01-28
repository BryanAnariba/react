import { IconButton } from "@mui/material";
import JournalLayout from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { startNewNote } from "../../../store/journal";

export const JournalPage = (): JSX.Element => {
  
  const dispatch = useDispatch<AppDispatch>();
  const { isSaving, activeNote } = useSelector((state: RootState) => state.journal);

  const onNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      <>
        {
          activeNote.id 
          ?
            <NoteView />
          :
            <NothingSelectedView />
        }
        
        <IconButton
          disabled={isSaving}
          onClick={onNewNote}
          size="large"
          sx={{
            color: "white",
            backgroundColor: "error.main",
            ":hover": { backgroundColor: "error.main", opacity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 50
          }}
        >
          <AddOutlined sx={{fontSize: 30}} />
        </IconButton>
      </>
    </JournalLayout>
  );
};
