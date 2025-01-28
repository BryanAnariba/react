import { Box, Toolbar } from "@mui/material";
import { Navbar, Sidebar } from "../../../common/components";

interface JournalLayoutProps {
  children: JSX.Element;
}

const drawerWith: number = 300;

const JournalLayout = ({ children }: JournalLayoutProps): JSX.Element => {
  return (
    <Box sx={{ display: "flex" }} className="animate__animated animate__fadeIn">
      <Navbar drawerWidth={drawerWith} />
      <Sidebar drawerWidth={drawerWith} />
      <Box component={"main"} sx={{ flexGrow: 1, p: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default JournalLayout;
