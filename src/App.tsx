import { useEffect, useState } from "react";
import "./App.css";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import { AppBar, Typography, Stack, IconButton, Box } from "@mui/material";
import { Edit as EditIcon, Home as HomeIcon } from "@mui/icons-material";

function App() {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setEditMode(window.location.pathname === "edit");
  }, [window.location]);

  const toggleEditMode = () => {
    // Add/remove #edit from the URL
    setEditMode(!editMode);
    window.location.hash = editMode ? "" : "edit";
  };

  return (
    <>
      <AppBar sx={{ bgcolor: "#2875ce" }}>
        <Stack
          direction="row"
          sx={{
            py: "1rem",
            px: "10rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Name Randomizer</Typography>
          <IconButton onClick={toggleEditMode}>
            {editMode ? (
              <HomeIcon fontSize="large" />
            ) : (
              <EditIcon fontSize="large" />
            )}
          </IconButton>
        </Stack>
      </AppBar>
      <Box>{editMode ? <Edit /> : <Home />}</Box>
    </>
  );
}

export default App;
