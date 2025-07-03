import { Box } from "@mui/material";
import Form from "../form/Form";
import Sidebar from "../sidebar/Sidebar";
import SearchBar from "../searchbar/SearchBar";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex", fontFamily: "Mona Sans, sans-serif" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          px: { xs: 2, md: 4 },
          py: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Box sx={{ width: "100%", display:'flex', justifyContent:'center' }}>
          <SearchBar placeholder="Search Employee Form Sections..." />
        </Box>

        <Form />
      </Box>
    </Box>
  )
}
