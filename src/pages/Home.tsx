import { Button, Input, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const [names, setNames] = useState<string[]>([]);
  const [nameHistory, setNameHistory] = useState<string[]>([]);
  const [storedNames] = useLocalStorage<string[]>("names", []);
  const [currentName, setCurrentName] = useState("");
  const [recentLimit, setRecentLimit] = useState(0);

  useEffect(() => {
    setNames(storedNames);
  }, [storedNames]);

  const getRandomIndex = () => Math.floor(Math.random() * names.length);

  const handleRandomizeName = () => {
    let isValid = false;
    let randomIndex: number;
    let historyIndex = -1;

    while (!isValid) {
      randomIndex = getRandomIndex();
      historyIndex = nameHistory.indexOf(names[randomIndex]);

      if (historyIndex === -1 || historyIndex > recentLimit - 1) {
        isValid = true;
      }
    }

    setNameHistory((prev) => {
      setCurrentName(names[randomIndex]);
      if (historyIndex !== -1) prev.splice(historyIndex, 1);
      return [names[randomIndex], ...prev];
    });
  };

  return (
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <Typography variant="h1">{currentName || "None Selected..."}</Typography>
      <Button onClick={handleRandomizeName} sx={{ maxWidth: "150px" }}>
        Select A Name
      </Button>
      {/* Options */}
      <Typography>
        Don't pick names within the recent most
        <Input
          type="number"
          value={recentLimit}
          inputProps={{ min: 0, max: names.length }}
          onChange={(e) => {
            setRecentLimit(parseInt(e.target.value));
          }}
          sx={{ width: "4ch", ml: "1ch" }}
        />
      </Typography>
      {/* Name lists */}
      <Stack
        direction="row"
        sx={{ justifyContent: "space-evenly", width: "100%", pt: "3rem" }}
      >
        {/* All Names */}
        <Stack spacing={0.7} sx={{ maxWidth: "30ch", textAlign: "left" }}>
          <Typography variant="h5" sx={{ textDecoration: "underline" }}>
            {`All Names (${names.length})`}
          </Typography>
          {names.map((name, i) => (
            <Typography key={i} sx={{ textAlign: "left" }}>
              {name}
            </Typography>
          ))}
        </Stack>
        {/* History */}
        <Stack spacing={0.7} sx={{ maxWidth: "30ch", textAlign: "left" }}>
          <Typography variant="h5" sx={{ textDecoration: "underline" }}>
            {`Recent Names (${nameHistory.length})`}
          </Typography>
          {nameHistory.map((name, i) => (
            <Typography key={i} sx={{ textAlign: "left" }}>
              {name}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
