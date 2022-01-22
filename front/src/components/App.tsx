import "./App.css";
import Word from "./Word";
import { TextField, Button, MenuItem } from "@mui/material";
import { useCallback, useRef, useState } from "react";
const partOfSpeechArr = [
  { value: "", label: "Without" },
  { value: "v.", label: "Verb" },
  { value: "n.", label: "Noun" },
  { value: "adv.", label: "Adverb" },
  { value: "pron.", label: "Pronoun" },
  { value: "prep.", label: "Preposition" },
  { value: "a.", label: "Adjective" },
  { value: "interj.", label: "Interjection" },
];
export default function App() {
  const [partOf, setPartOf] = useState("");

  const wordInput = useRef<HTMLInputElement>();
  const posInput = useRef<HTMLInputElement>();
  const [wordElements, setWordElements] = useState([
    <Word word="hello" pos="noun" definition="testing" />,
  ]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartOf(event.target.value as string);
  };
  const getWordData = useCallback(async () => {
    const word = wordInput.current!.value;
    const pos = posInput.current!.value;
    console.log(word, pos, "wordfrominput");
    const response = await fetch(`/${word}/${pos}`);
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
      <TextField
        select
        inputRef={posInput}
        label="Select"
        value={partOf}
        color="warning"
        helperText="Please select part of speech"
        onChange={handleChange}
      >
        {partOfSpeechArr.map((option: { value: string; label: string }) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
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
