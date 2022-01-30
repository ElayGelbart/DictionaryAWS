import "./App.css";
import Word from "./Word";
import { TextField, Button, MenuItem } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import logo from "../assets/dictionary-logo.png";
const partOfSpeechArr = [
  { value: "", label: "Without" },
  { value: "v.", label: "Verb" },
  { value: "n.", label: "Noun" },
  { value: "adv.", label: "Adverb" },
  { value: "pron.", label: "Pronoun" },
  { value: "prep.", label: "Preposition" },
  { value: "a.", label: "Adjective" },
  { value: "interj.", label: "Interjection" },
  { value: "conj.", label: "Conjunction" },
];
const defaultWord = (
  <Word
    word="Dictionary"
    pos="n."
    definition="A book containing the words of a language, arranged alphabetically, with explanations of their meanings"
  />
);

export default function App() {
  const [partOf, setPartOf] = useState("");
  const wordInput = useRef<HTMLInputElement>();
  const posInput = useRef<HTMLInputElement>();
  const [wordElements, setWordElements] = useState([defaultWord]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartOf(event.target.value as string);
  };

  const getWordData = useCallback(async (word, pos = "") => {
    console.log(word, pos, "wordFromInput");
    const response = await fetch(
      `https://api.dictionary.elaygelbart.com/${word}/${pos}`
    );
    if (!response.ok) {
      return setWordElements([
        <Word
          word="NOT"
          pos="FOUND"
          definition="Try Something Else"
          searchWordFn={getWordData}
        />,
      ]);
    }
    const wordDataArray = await response.json();
    const wordJsxArray = [];
    for (const word of wordDataArray) {
      wordJsxArray.push(
        <Word
          word={word.word}
          pos={word.pos}
          definition={word.definitions.join(" ")}
          searchWordFn={getWordData}
        />
      );
    }
    setWordElements(wordJsxArray);
  }, []);

  return (
    <div>
      <img id="logo" src={logo} alt="logo" />
      <div id="searchDiv">
        <TextField
          id="searchWordInput"
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
          id="selectPosInput"
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
            getWordData(wordInput.current!.value, posInput.current!.value);
          }}
        >
          Search
        </Button>
      </div>
      <div id="wordDefinitions">{wordElements}</div>
    </div>
  );
}
