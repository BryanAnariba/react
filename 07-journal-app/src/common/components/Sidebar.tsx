import { TurnedInNot } from "@mui/icons-material";
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";

interface SidebarProps {
  drawerWidth: number;
}

export const Sidebar = ({ drawerWidth }: SidebarProps): JSX.Element => {
  return (
    <Box
      component={"nav"}
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: `${drawerWidth}px`,
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component={"div"}>
            Welcome Gohan!
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {
            ['January', 'February', 'March', 'April', 'June', 'July'].map(month => (
              <ListItem key={month}>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container alignItems={'center'}>
                    <ListItemText primary={month}></ListItemText>
                    <ListItemText secondary={'View data here!!!.'}></ListItemText>
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </Box>
  );
};
