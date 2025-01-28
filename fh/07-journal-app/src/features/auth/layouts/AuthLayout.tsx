import { Grid, Typography } from "@mui/material";

interface AuthLayoutProps {
  children: JSX.Element;
  title: string;
}

export const AuthLayout = ({
  children,
  title,
}: AuthLayoutProps): JSX.Element => {
  return (
    <Grid
      container
      spacing={0}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{ width: {sm: 450}, backgroundColor: "white", padding: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};
