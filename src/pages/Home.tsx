import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const [names, setNames] = useState<string[]>([]);
  const [nameHistory, setNameHistory] = useState<string[]>([]);
  const [storedNames] = useLocalStorage<string[]>("names", []);
  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
    setNames(storedNames);
  }, [storedNames]);

  const getRandomIndex = () => Math.floor(Math.random() * names.length);

  const handleRandomizeName = () => {
    let isValid = false;
    let randomIndex: number;

    while (!isValid) {
      randomIndex = getRandomIndex();
      isValid = true;
      setCurrentName(names[randomIndex]);
    }

    setNameHistory((prev) => {
      const i = prev.indexOf(names[randomIndex]);
      if (i !== -1) prev.splice(i, 1);
      return [names[randomIndex], ...prev];
    });
  };

  return (
    <Stack sx={{ alignItems: "center" }}>
      <Typography variant="h1">{currentName || "None Selected..."}</Typography>
      <Button onClick={handleRandomizeName} sx={{ maxWidth: "150px" }}>
        Select A Name
      </Button>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-evenly", width: "100%" }}
      >
        {/* All Names */}
        <Stack spacing={0.7} sx={{ maxWidth: "30ch", textAlign: "left" }}>
          <Typography variant="h5" sx={{ textDecoration: "underline" }}>
            All Names
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
            Recently Called
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
