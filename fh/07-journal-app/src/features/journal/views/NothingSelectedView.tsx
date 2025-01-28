import { StarOutline } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

export const NothingSelectedView = (): JSX.Element => {
  return (
    <Grid
      container
      spacing={0}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ minHeight: "88vh", backgroundColor: "primary.main", borderRadius: 5 }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{fontSize: 100, color: 'white'}} />
      </Grid>
      <Grid item xs={12}>
        <Typography color="white" variant="h5">Select or create note</Typography>
      </Grid>
    </Grid>
  );
};
