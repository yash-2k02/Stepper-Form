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
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <SearchBar placeholder="Search Employee Form Sections..." />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <Form />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
