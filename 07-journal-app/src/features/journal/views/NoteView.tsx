import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, Typography, TextField } from "@mui/material";
import { ImageGallery } from "../components";
export const NoteView = (): JSX.Element => {
  return (
    <Grid
      container
      direction={"row"}
      justifyContent={"space-between"}
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight={"light"}>
          August 28, 2024
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Write a title"
          label="title"
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Write a title"
          label="What happened today?"
          sx={{ border: "none", mb: 1 }}
          minRows={5}
        />
      </Grid>

      {/* Gallery */}
      <ImageGallery />
    </Grid>
  );
};
