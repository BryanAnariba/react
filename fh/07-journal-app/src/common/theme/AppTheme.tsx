import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { purpleTheme } from "./purple";

interface AppThemeProps {
  children: JSX.Element;
}

export const AppTheme = ({ children }: AppThemeProps): JSX.Element => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
