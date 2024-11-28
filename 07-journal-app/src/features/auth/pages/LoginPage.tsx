import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layouts";

export const LoginPage = (): JSX.Element => {
  return (
    <AuthLayout title="LOGIN">
      <form>
        <Grid container>
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
            <Grid item xs={12} sm={6} md={6}>
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Button variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>google</Typography>
              </Button>
            </Grid>
            <Grid container direction={"row"} justifyContent={"end"} mt={1}>
              <Link color="inherit" to="/auth/register" component={RouterLink}>
                Create an account!
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
