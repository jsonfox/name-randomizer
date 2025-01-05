import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Edit() {
  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [clearInputOnAdd, setClearInputOnAdd] = useState(true);
  const [storedNames, setStoredNames] = useLocalStorage<string[]>("names", []);

  useEffect(() => {
    setNames(storedNames);
  }, []);

  const handleClearInput = () => {
    setInput("");
  };

  const handleAddInput = () => {
    if (!input) return;
    setNames([input, ...names]);
    if (clearInputOnAdd) handleClearInput();
  };

  const handleSave = () => {
    setStoredNames(names);
    window.alert("Names have been saved!");
  };

  const handleRemoveName = (index: number) => {
    setNames(names.filter((_, i) => i !== index));
  };

  return (
    <Stack spacing={4} sx={{ alignItems: "center" }}>
      {/* Controls */}
      <Stack direction="row" spacing={5} sx={{ alignItems: "center" }}>
        <FormControl>
          <Button
            variant="contained"
            onClick={() => setNames([])}
            disabled={names.length === 0}
          >
            Clear All
          </Button>
        </FormControl>
        <FormControl>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Cancel Changes
          </Button>
        </FormControl>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={(e) => {
                  setClearInputOnAdd(e.target.checked);
                }}
              />
            }
            label="Clear input on add"
          />
        </FormControl>
        <FormControl>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </FormControl>
      </Stack>
      {/* Input */}
      <FormControl variant="standard" sx={{ width: "35ch" }}>
        <InputLabel htmlFor="name-input">Name Input</InputLabel>
        <Input
          id="name-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <CloseIcon
                onClick={handleClearInput}
                sx={{ cursor: "pointer" }}
              />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <AddIcon
                onClick={handleAddInput}
                fontSize="large"
                sx={{ cursor: "pointer", color: "lightgreen" }}
              />
            </InputAdornment>
          }
        />
      </FormControl>
      {/* List */}
      <Stack spacing={1.5} sx={{ width: "35ch" }}>
        {names.map((name, index) => (
          <Stack key={index} direction="row" spacing={1}>
            <DeleteIcon
              onClick={() => handleRemoveName(index)}
              sx={{ color: "#eb7c7c", cursor: "pointer" }}
            />
            <Typography>{name}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
