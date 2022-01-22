import "./App.css";
import Word from "./Word";
import { TextField, Button, InputLabel, Select, MenuItem } from "@mui/material";
import { useCallback, useRef, useState } from "react";
interface wordProps {
  word: string;
  definition: string;
  pos: string;
}
export default function App() {
  const wordInput = useRef<HTMLInputElement>();
  const [wordElements, setWordElements] = useState([
    <Word word="hello" pos="noun" definition="testing" />,
  ]);
  const getWordData = useCallback(async () => {
    const word = wordInput.current!.value;
    console.log(word, "wordfrominput");
    const response = await fetch(`/${word}`);
    console.log(response, "response");
    if (!response.ok) {
      return console.log("response not ok");
    }
    const wordDataArray = await response.json();
    const wordJsxArray = [];
    for (const word of wordDataArray) {
      wordJsxArray.push(
        <Word
          word={word.word}
          pos={word.pos}
          definition={word.definitions.join("")}
        />
      );
    }
    setWordElements(wordJsxArray);
  }, []);
  return (
    <div>
      <h1>Web Dictionary</h1>
      <TextField
        label="Search any word"
        color="warning"
        inputRef={wordInput}
        focused
      />
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="warning"
        onClick={() => {
          getWordData();
        }}
      >
        Search
      </Button>
      {wordElements}
    </div>
  );
}
