import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

import { AuthLayout } from "../layouts";
import { useForm } from "../../../common";
import { AppDispatch, RootState } from "../../../store";
import { AuthStatus, startGoogleSignIn, startLoggingWithEmailPassword } from "../../../store/auth";

const formInitialState = { email: '', password: '' };

export const LoginPage = (): JSX.Element => {

  const dispatch = useDispatch<AppDispatch>();
  const { status, errorMessage } = useSelector((state: RootState) => state.auth);
  const { formState, onInputChange } = useForm<{ email: string, password: string }, {}>(formInitialState, {});

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // console.log(formState);
    dispatch(startLoggingWithEmailPassword(formState.email, formState.password));
  }

  const onGoogleSignIn = (): void => {
    dispatch(startGoogleSignIn());
  }

  const isAuthenticating = useMemo(() => status === AuthStatus.CHECKING, [status]);

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="youremail@gmail.com"
              fullWidth
              name="email"
              value={formState.email}
              onChange={onInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="********"
              name="password"
              value={formState.password}
              onChange={onInputChange}
              fullWidth
            ></TextField>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={12} display={errorMessage.trim().length === 0 ? 'none' : ''}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Button variant="contained" fullWidth type="submit" disabled={isAuthenticating}>
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Button variant="contained" fullWidth onClick={onGoogleSignIn} disabled={isAuthenticating}>
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
