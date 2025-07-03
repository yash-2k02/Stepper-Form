import { InputBase, Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ placeholder = "Search..." }) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 8px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 400,
        // mb: 3,
        borderRadius: "12px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ "aria-label": placeholder }}
      />
      <IconButton type="submit" sx={{ p: "6px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
