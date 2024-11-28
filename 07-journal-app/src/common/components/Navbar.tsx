import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Grid, Typography } from '@mui/material';

interface NabvarProps {
  drawerWidth: number;
}

export const Navbar = ({ drawerWidth }: NabvarProps): JSX.Element => {
  return (
    <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: `${drawerWidth}px`}}>
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{mr: 2, display: { sm: 'none' }}}>
            <MenuOutlined />
        </IconButton>
        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h6" noWrap component={'div'}>Journal App</Typography>

          <IconButton color="error">
            <LogoutOutlined />
        </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
