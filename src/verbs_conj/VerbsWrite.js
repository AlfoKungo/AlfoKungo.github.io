import { useState, useRef } from "react";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper, TextField, Typography } from "@mui/material";
import { theme, andar_elem, MOODS, pickRandomKey } from "./VerbsUtils.js";
import { green } from "@mui/material/colors";

// let moods = { ...MOODS };
let moods = MOODS;
function fillEmptyStrings(obj, values) {
  let index = 0; // to keep track of the list index

  function recursiveFill(obj) {
    if (index >= values.length) return; // stop if all values are used
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        recursiveFill(obj[key]); // recursively fill for nested objects
      } else if (obj[key] === "") {
        obj[key] = values[index]; // replace empty string with value from list
        index++; // move to the next value in the list
        if (index >= values.length) return; // stop if all values are used
      }
    }
  }

  recursiveFill(obj); // initiate the recursive fill
}
export default function VerbsVerbs(props) {
  const [text, setText] = useState("");
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef();

  function parseHtml(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const spanElements = Array.from(
      doc.querySelectorAll(".Latn:not(.mention)")
    ).map((el) => {
      return el.parentNode.innerText.trim();
    });
    return spanElements;
  }

  let ss = parseHtml(andar_elem);
  fillEmptyStrings(moods, ss);
  const [mainVal, setMainVal] = useState(pickRandomKey(moods));
  let [word, keys] = mainVal;
  //   const [word, setWord] = useState(pickRandomKey(moods)[0]);
  function rightAnswer() {
    setIsCorrect(true);
  }
  function wrongAnswer() {
    setIsError(true);
  }
  function onKeyPress(event) {
    if (event.code == "Enter") {
      if (isCorrect || isError) {
        setIsError(false);
        setIsCorrect(false);
        setText("");
        setMainVal(pickRandomKey(moods));
      } else {
        if (inputRef.current.value == word) {
          rightAnswer();
        } else {
          wrongAnswer();
        }
      }
    }
  }
  return (
    <div tabIndex="0" onKeyDown={onKeyPress} style={{ outline: "none" }}>
      <ThemeProvider theme={theme}>
        <div></div>
        <Paper
          style={{ width: "20%", padding: 20, margin: "auto" }}
          elevation={10}
        >
          <Typography variant="h4" gutterBottom>
            {keys.join(" ")}
          </Typography>
        </Paper>
        <div> </div>
        {isError ? (
          <Typography variant="h5" gutterBottom>
            <div> </div>
            correct answer is:{" "}
            <h3 style={{ display: "inline" }}>
              <b>
                <i>{word}</i>
              </b>
            </h3>
          </Typography>
        ) : (
          <div></div>
        )}
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
        <div></div>
        <div> </div>
      </ThemeProvider>
    </div>
  );
}
