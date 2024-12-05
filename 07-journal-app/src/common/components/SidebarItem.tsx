import { TurnedInNot } from "@mui/icons-material"
import { ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material';
import { Note, setActiveNote } from "../../store/journal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

interface Props {
  note: Note;
}

export const SidebarItem = ({note}: Props): JSX.Element => {

  const distpatch = useDispatch<AppDispatch>();

  const onActiveNote = (note: Note): void => {
    distpatch(setActiveNote(note));
  }

  return (
    <ListItem>
      <ListItemButton onClick={() => onActiveNote(note)}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container alignItems={'center'}>
          <ListItemText primary={note.title}></ListItemText>
          <ListItemText secondary={'View data here!!!.'}></ListItemText>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
