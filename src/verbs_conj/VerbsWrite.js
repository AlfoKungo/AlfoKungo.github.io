import { useState, useRef, useEffect } from "react";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper, TextField, Typography } from "@mui/material";
import { theme, pickRandomKey, get_table } from "./VerbsUtils.js";
import { green } from "@mui/material/colors";
import { all } from "axios";

let remove_keys = ["indicative", "conditional", "subjunctive", "imperative"];
export default function VerbsVerbs(props) {
  const [text, setText] = useState("");

  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [moods, setMoods] = useState({});
  const inputRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      let _moods = await get_table("andar", "Portuguese");
      if (Object.keys(_moods).length > 0) {
        setMainVal(pickRandomKey(_moods, remove_keys));
      }
      setMoods(await get_table("andar", "Portuguese"));
    };
    fetchData();
  }, []);

  const [mainVal, setMainVal] = useState(["", ""]);
  let [word, keys] = mainVal;
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
        setMainVal(pickRandomKey(moods, remove_keys));
      } else {
        if (inputRef.current.value == word) {
          rightAnswer();
        } else {
          wrongAnswer();
        }
      }
    }
  }
  function recursiveButtons(dict, keys) {
    if (keys === "" || Object.keys(dict) == 0 || dict == undefined)
      return <div></div>;
    let all_keys = keys.split(" ");
    let key = all_keys[0];
    let rest_keys = all_keys.slice(1).join(" ");
    return (
      <div>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          {Object.entries(dict).map(([k, value]) => {
            return (
              <Button
                disabled={remove_keys.includes(k)}
                sx={{
                  "&&.MuiButton-root": {
                    "&:hover": {
                      background: "none",
                    },
                  },
                }}
                color={key == k ? "secondary" : "primary"}
              >
                {k}
              </Button>
            );
          })}
        </ButtonGroup>
        <div> </div>
        {typeof dict[key] !== "string" ? (
          recursiveButtons(dict[key], rest_keys)
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  return (
    <div tabIndex="0" onKeyDown={onKeyPress} style={{ outline: "none" }}>
      <ThemeProvider theme={theme}>
        <div></div>
        <Paper
          style={{
            width: "20%",
            paddingTop: 20,
            paddingBottom: 15,
            paddingRight: 15,
            paddingLeft: 15,
            margin: "auto",
          }}
          elevation={10}
        >
          <Typography variant="h4" gutterBottom>
            {keys}
          </Typography>
        </Paper>
        <div> </div>
        {recursiveButtons(moods, keys)}
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
      </ThemeProvider>

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
    </div>
  );
}
