import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  drawerWidth: number;
}

export const Sidebar = ({ drawerWidth }: SidebarProps): JSX.Element => {

  const { displayName } = useSelector((state: RootState) => state.auth);
  const { notes } = useSelector((state: RootState) => state.journal);

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
            Welcome {displayName}!
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {
            notes.map(note => (
              <SidebarItem note={note} key={note.id} />
            ))
          }
        </List>
      </Drawer>
    </Box>
  );
};
