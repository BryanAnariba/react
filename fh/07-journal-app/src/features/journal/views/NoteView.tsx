import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Typography, TextField, IconButton } from '@mui/material';
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";

import { ImageGallery } from "../components";
import { AppDispatch, RootState } from "../../../store";
import { useForm } from "../../../common";
import { Note, setActiveNote, startDeleteNote, startUpdateNote, startUploadFiles } from "../../../store/journal";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = (): JSX.Element => {

  const dispatch = useDispatch<AppDispatch>();
  const {activeNote, messageSave, isSaving} = useSelector((state: RootState) => state.journal);
  const {formState, onInputChange} = useForm<Note, {}>(activeNote, {});

  const fileMultipleInputRef = useRef<HTMLInputElement | null>(null);

  const onSaveNote = (): void => {
    dispatch(startUpdateNote());
  }

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length == 0) return;
    // console.log(e.target.files)
    const files: FileList = e.target.files!;
    dispatch(startUploadFiles(files));
  }

  const dateToString = useMemo(() => {
    const newDate = new Date(formState.date);
    return newDate.toUTCString();
  }, [formState.date]);

  const onDeleteNote = () => {
    dispatch(startDeleteNote());
  }

  useEffect(() => {
    dispatch(setActiveNote(formState));

  }, [formState]);

  useEffect(() => {
    if (messageSave.trim().length > 0) {
      Swal.fire('Note saved', messageSave, 'success');
    }
  }, [messageSave]);

  return (
    <Grid
      container
      direction={"row"}
      justifyContent={"space-between"}
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight={"light"}>
          {dateToString}
        </Typography>
      </Grid>

      <input type="file" multiple style={{display: 'none'}} ref={fileMultipleInputRef} onChange={onFileInputChange} />
      
      <IconButton disabled={isSaving} onClick={() => fileMultipleInputRef.current?.click()}>
        <UploadOutlined color="primary" />
      </IconButton>

      <Grid item>
        <Button color="primary" sx={{ padding: 2 }} onClick={onSaveNote} disabled={isSaving}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          name="title"
          fullWidth
          placeholder="Write a title"
          label="title"
          value={formState.title}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          name="body"
          value={formState.body}
          onChange={onInputChange}
          fullWidth
          multiline
          placeholder="Write a title"
          label="What happened today?"
          sx={{ border: "none", mb: 1 }}
          minRows={5}
        />
      </Grid>

      <Grid container justifyContent={'end'}>
          <Button onClick={onDeleteNote} sx={{mt: 2}} color="error">
            <DeleteOutline />
            Delete
          </Button>
      </Grid>
      {/* Gallery */}
      <ImageGallery note={activeNote} />
    </Grid>
  );
};
