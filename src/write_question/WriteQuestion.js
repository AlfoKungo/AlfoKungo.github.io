import { Paper, TextField, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { clean_word } from "../Utils/Base";
import Slider from "@mui/material/Slider";

export default function WriteQuestion(props) {
  const inputRef = useRef();
  const [slider, setSlider] = useState(props.levelsRange);
  const [text, setText] = useState("");
  const [terms, setTerms] = useState(props.terms);
  const [keys, setKeys] = useState(
    terms.filter((key) => !key.includes(" ")).sort(() => Math.random() - 0.5)
  );
  if (JSON.stringify(terms) != JSON.stringify(props.terms)) {
    setTerms(props.terms);
    setKeys(
      props.terms
        .filter((key) => !key.includes(" "))
        .sort(() => Math.random() - 0.5)
    );
  }
  const [wordInd, setWordInd] = useState(0);
  let word = keys[wordInd];
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  function rightAnswer() {
    setIsCorrect(true);
    props.handleLevel(clean_word(word), 1);
  }
  function wrongAnswer() {
    setIsError(true);
    // props.handleLevel(clean_word(word), -1);
  }
  function nextWord() {
    let next_word = (wordInd + 1) % keys.length;
    while (true) {
      if (props.words[keys[next_word]] === undefined) {
        console.log("gal");
      }

      if (props.words[keys[next_word]].level < slider[1]) {
        setWordInd(next_word);
        return;
      }
      next_word = (next_word + 1) % keys.length;
    }
  }
  function onKeyPress(event) {
    if (event.code == "Enter") {
      if (isCorrect || isError) {
        if (isError && event.shiftKey) {
          setIsError(false);
          rightAnswer();
        } else {
          nextWord();
          if (isError) props.handleLevel(clean_word(word), -1);
          setIsError(false);
          setIsCorrect(false);
          setText("");
        }
      } else {
        if (
          clean_word(inputRef.current.value) ==
          clean_word(props.words[word].translation)
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
      style={{
        outline: "none",
        display: "inline",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {" "}
      <Paper
        style={{
          width: 300,
          paddingTop: 20,
          paddingBottom: 15,
          margin: "auto",
        }}
        elevation={10}
      >
        <Typography variant="h4" gutterBottom>
          <div className="write-level">
            {props.words[clean_word(word)]
              ? Math.max(
                  props.words[clean_word(word)].level + (isError ? -1 : 0),
                  0
                ).toString()
              : ""}
          </div>
          {word}
        </Typography>
      </Paper>
      {isError ? (
        <Typography variant="h5" gutterBottom>
          <div> </div>
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
        color={isCorrect ? "success" : false}
        focused
        id="outlined-basic"
        inputRef={inputRef}
        label=""
        // variant="outlined"
        style={{ fontSize: 50 }}
        sx={{
          "&.Mui-focused": {
            backgroundColor: "white",
          },
          "& .MuiInputBase-input": {
            backgroundColor: "white",
          },
          "&.correct": {
            ".Mui-disabled": {
              color: `${green[500]} !important`,
              "& fieldset": {
                borderColor: `${green[500]} !important`,
              },
            },
            "&.Mui-focused": {
              backgroundColor: `${green[50]} !important`,
            },
            "& .MuiInputBase-input": {
              backgroundColor: `${green[50]} !important`,
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
      <div> </div>
      <div> </div>
      <div> </div>
      <Slider
        getAriaLabel={() => "Levels range"}
        value={slider}
        onChange={(event, newValue) => {
          setSlider(newValue);
          props.handleLevelsRange(newValue[0], newValue[1]);
        }}
        step={1}
        style={{
          color: "#5fdeab", // Main color
        }}
        thumbColor="inherit"
        valueLabelDisplay="auto"
        min={0}
        max={6}
        marks
        sx={{ marginLeft: 5, marginTop: 5, width: "30%" }}
      />
    </div>
  );
}
