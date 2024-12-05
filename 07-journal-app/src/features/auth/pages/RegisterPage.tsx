import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField } from "@mui/material";
import { AuthLayout } from "../layouts";
import { useForm } from "../../../common";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthStatus, startCreatingUserWithEmailPassword } from "../../../store/auth";
import { AppDispatch, RootState } from "../../../store";

interface RegisterUserInitialState {
  displayName: string;
  email: string;
  password: string;
}

export interface RegisterUserValidations {
  displayName: [(value: string) => boolean, string];
  email: [(value: string) => boolean, string];
  password: [(value: string) => boolean, string];
}

const initialState: RegisterUserInitialState = {
  displayName: '',
  email: '',
  password: ''
};

const formValidations: RegisterUserValidations = {
  email: [(value: string) => value.includes('@'), 'Email not valid'],
  password: [(value: string) => value.length >= 6, 'Weak password'],
  displayName: [(value: string) => value.length >= 1, 'Name is required'],
};

export const RegisterPage = (): JSX.Element => {

  const dispatch = useDispatch<AppDispatch>();
  const { status, errorMessage } = useSelector((state: RootState) => state.auth);
  
  const [formSubmited, setFormSubmited] = useState<boolean>(false);
  const isCheckingAuthentication = useMemo(() => status === AuthStatus.CHECKING, [status]);

  const { formState, onInputChange, formValidation, isFormValid } = useForm<RegisterUserInitialState, RegisterUserValidations>(initialState, formValidations);

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setFormSubmited(true);
    if (isFormValid) {
      // console.log(formState);
      dispatch(startCreatingUserWithEmailPassword(formState.email, formState.password, formState.displayName));
    }
  }

  return (
    <AuthLayout title="Register">
      <>
        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
          <Grid container>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                label="Complete Name"
                type="text"
                placeholder="Write your complete name"
                name="displayName"
                fullWidth
                value={formState.displayName}
                onChange={onInputChange}
                error={!!formValidation.displayNameValid && formSubmited}
                helperText={formValidation.displayNameValid}
                
              ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                label="Email"
                type="email"
                name="email"
                placeholder="youremail@gmail.com"
                fullWidth
                value={formState.email}
                onChange={onInputChange}
                error={!!formValidation.emailValid && formSubmited}
                helperText={formValidation.emailValid}
              ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                label="Password"
                type="password"
                name="password"
                placeholder="********"
                fullWidth
                value={formState.password}
                onChange={onInputChange}
                error={!!formValidation.passwordValid && formSubmited}
                helperText={formValidation.passwordValid}
              ></TextField>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={12} md={12} display={errorMessage.trim().length === 0 ? 'none' : ''}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Button variant="contained" fullWidth type="submit" disabled={isCheckingAuthentication}>
                  Create Account
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
      </>
    </AuthLayout>
  );
};
