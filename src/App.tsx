import { useEffect, useState } from "react";
import "./App.css";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import { AppBar, Typography, Stack, IconButton, Box } from "@mui/material";
import { Edit as EditIcon, Home as HomeIcon } from "@mui/icons-material";

function App() {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setEditMode(document.location.pathname === "/edit");
  }, [document.location.pathname]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    document.location.pathname = editMode ? "/" : "/edit";
  };

  return (
    <>
      <AppBar>
        <Stack
          direction="row"
          sx={{
            padding: "1rem",
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