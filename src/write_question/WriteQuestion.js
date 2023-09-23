import { TextField, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { clean_word } from "../Utils/Base";

export default function WriteQuestion(props) {
  const inputRef = useRef();
  const [text, setText] = useState("");

  const [keysWithoutSpace, setKeysWithoutSpace] = useState(
    Object.keys(props.words)
      .filter((key) => !key.includes(" "))
      .sort(() => Math.random() - 0.5)
  );
  const [wordInd, setWordInd] = useState(0);
  let word = keysWithoutSpace[wordInd];
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  function rightAnswer() {
    setIsCorrect(true);
    props.handleLevel(clean_word(word), 1);
  }
  function wrongAnswer() {
    setIsError(true);
    props.handleLevel(clean_word(word), -1);
  }
  function onKeyPress(event) {
    if (event.code == "Enter") {
      if (isCorrect || isError) {
        if (isError && event.shiftKey) {
          setIsError(false);
          rightAnswer();
        } else {
          setWordInd((wordInd + 1) % keysWithoutSpace.length);
          setIsError(false);
          setIsCorrect(false);
          setText("");
        }
      } else {
        if (
          inputRef.current.value == clean_word(props.words[word].translation)
        ) {
          rightAnswer();
        } else {
          wrongAnswer();
        }
      }
    }
  }
  return (
    <div
      tabIndex="0"
      style={{ outline: "none", display: "inline", position: "relative" }}
    >
      <Typography variant="h4" gutterBottom>
        <div className="write-level">
          {props.words[clean_word(word)]
            ? props.words[clean_word(word)].level.toString()
            : ""}
        </div>
        {word}
      </Typography>
      {isError ? (
        <Typography variant="h5" gutterBottom>
          correct answer is:{" "}
          <h3 style={{ display: "inline" }}>
            <b>
              <i>{props.words[word].translation}</i>
            </b>
          </h3>
        </Typography>
      ) : (
        <div></div>
      )}
      <div> </div>
      <div> </div>
      <TextField
        value={text}
        error={isError}
        onKeyDown={onKeyPress}
        autoComplete="off"
        onChange={(e) => setText(e.target.value)}
        // disabled={isError || isCorrect}
        color={isCorrect ? "success" : false}
        focused={true}
        id="outlined-basic"
        inputRef={inputRef}
        label=""
        variant="outlined"
        style={{ fontSize: 50 }}
        sx={{
          "&.correct": {
            ".Mui-disabled": {
              color: `${green[500]} !important`,
              "& fieldset": {
                borderColor: `${green[500]} !important`,
              },
            },
          },
        }}
        InputProps={{
          style: { fontSize: "26px" },
          readOnly: isCorrect || isError ? true : false,
        }}
        helperText={isError ? "Incorrect" : false}
        className={isCorrect ? "correct" : ""}
      />
    </div>
  );
}
