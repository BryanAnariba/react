import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Grid, Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { startLogOut } from "../../store/auth";
import { AppDispatch } from "../../store";
import { logoutFirebase } from "../firebase";
import { clearNotesLogout } from "../../store/journal";

interface NabvarProps {
  drawerWidth: number;
}

export const Navbar = ({ drawerWidth }: NabvarProps): JSX.Element => {

  const dispatch = useDispatch<AppDispatch>();

  const onLogout = async (): Promise<void> => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(startLogOut());
  }

  return (
    <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: `${drawerWidth}px`}}>
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{mr: 2, display: { sm: 'none' }}}>
            <MenuOutlined />
        </IconButton>
        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h6" noWrap component={'div'}>Journal App</Typography>

          <IconButton color="error" onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
