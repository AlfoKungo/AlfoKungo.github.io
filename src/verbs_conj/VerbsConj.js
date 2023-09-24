import { useState } from "react";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper, TextField, Typography } from "@mui/material";
import { theme, andar_elem, MOODS, pickRandomKey } from "./VerbsUtils.js";

let moods = { ...MOODS };
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
export default function VerbsConj(props) {
  function onKeyPress() {}
  const [sel, setSel] = useState({ 1: null });
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
  const [word, setWord] = useState(pickRandomKey(moods)[0]);
  function submitRange(event, input_word) {
    if (input_word == word) {
      setWord(pickRandomKey(moods)[0]);
    }
    console.log(input_word == word);
  }
  function recursiveButtons(dict, ind) {
    return (
      <div>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          {Object.entries(dict).map(([key, value]) => {
            return (
              <Button
                color={sel[ind] == key ? "secondary" : "primary"}
                onClick={() => {
                  let dd = sel;
                  dd[ind] = key;
                  dd = Object.keys(dd).reduce((acc, key) => {
                    if (parseInt(key) <= ind) {
                      acc[key] = dd[key];
                    }
                    return acc;
                  }, {});
                  setSel({ ...dd });
                }}
              >
                {key}
              </Button>
            );
          })}
        </ButtonGroup>
        <div> </div>
        {sel[ind] != null && typeof dict[sel[ind]] !== "string" ? (
          recursiveButtons(dict[sel[ind]], ind + 1)
        ) : typeof dict[sel[ind]] === "string" ? (
          <div>
            <Button
              variant="outlined"
              size="large"
              onClick={(event) => submitRange(event, dict[sel[ind]])}
            >
              submit answer
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
  return (
    <div tabIndex="0" onKeyDown={onKeyPress} style={{ outline: "none" }}>
      <div></div>
      <Paper
        style={{ width: "20%", padding: 20, margin: "auto" }}
        elevation={10}
      >
        <Typography variant="h4" gutterBottom>
          {word}
        </Typography>
      </Paper>
      <div> </div>
      <div> </div>
      <ThemeProvider theme={theme}>
        {recursiveButtons(moods, 1)}
        <div></div>
        <div> </div>
      </ThemeProvider>
    </div>
  );
}
