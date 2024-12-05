import { ImageList, ImageListItem } from "@mui/material";
import { Note } from "../../../store/journal";

interface ImageGalleryProps {
  note: Note;
}

export const ImageGallery = ({note}: ImageGalleryProps): JSX.Element => {
  return (
    <ImageList sx={{ width: "100%", height: 450 }} cols={4} rowHeight={200} className="animate__animated animate__fadeIn">
      {note.imageUrl.map((item) => (
        <ImageListItem key={item}>
          <img 
          src={item}
          alt={note.title + ' Image'}
          loading="lazy"  />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
