import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
  Button,
} from "@mui/material";
import {
  Dashboard,
  AccessTime,
  Description,
  AccountBalance,
  Settings,
  Menu,
} from "@mui/icons-material";
import Person2Icon from "@mui/icons-material/Person2";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const drawerWidth = 280;

export default function Sidebar() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Profile");

  const navigate = useNavigate()

  const handleLogout = ()=> navigate("/")

  const drawerContent = (
    <Box sx={{ p: 2, mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Avatar sx={{ bgcolor: "#6c63ff", width: 56, height: 56 }}>YP</Avatar>
        <Typography variant="subtitle1">Yash Pardeshi</Typography>
        <Typography variant="caption">Associate Software Engineer</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "78vh",
        }}
      >
        <Box>
          <SidebarItem
            icon={<Dashboard />}
            label="Dashboard"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <SidebarItem
            icon={<Person2Icon />}
            label="Profile"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <SidebarItem
            icon={<AccessTime />}
            label="Attendance"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <SidebarItem
            icon={<Description />}
            label="Payslips"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <SidebarItem
            icon={<AccountBalance />}
            label="Salary Info"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <SidebarItem
            icon={<Settings />}
            label="Settings"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            sx={{
              textTransform: "none",
              borderRadius: "50px",
              px: 3,
              fontWeight: 500,
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 10,
            color: "#6c63ff",
          }}
        >
          <Menu />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)"
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

function SidebarItem({ icon, label, selectedItem, setSelectedItem }) {
  const isSelected = selectedItem === label;

  return (
    <ListItem
      button
      onClick={() => setSelectedItem(label)}
      sx={{
        px: 3,
        py: 1.5,
        borderRadius: 1,
        backgroundColor: isSelected ? "#e0e7ff" : "transparent",
        color: isSelected ? "#1e40af" : "#333",
        fontWeight: isSelected ? 600 : 400,
        "&:hover": {
          backgroundColor: "#e0e7ff",
        },
      }}
    >
      <ListItemIcon sx={{ color: isSelected ? "#1e40af" : "#333" }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
}
