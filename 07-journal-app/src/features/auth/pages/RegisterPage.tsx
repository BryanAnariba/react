import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField } from "@mui/material";
import { AuthLayout } from "../layouts";

export const RegisterPage = (): JSX.Element => {
  return (
    <AuthLayout title="REGISTER">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              label="Complete Name"
              type="text"
              placeholder="Write your complete name"
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="youremail@gmail.com"
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="********"
              fullWidth
            ></TextField>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={12}>
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid container direction={"row"} justifyContent={"end"} mt={1}>
              <Link color="inherit" to="/auth/login" component={RouterLink}>
                You have an account, log in here!
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
