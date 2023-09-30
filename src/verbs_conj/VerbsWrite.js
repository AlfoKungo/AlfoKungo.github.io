import { useState, useRef, useEffect } from "react";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Slider from "@mui/material/Slider";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  theme,
  pickRandomKey,
  get_table,
  getVerbsAmount,
  getSpecByInd,
  r_verbs_list,
  ir_verbs_list,
} from "./VerbsUtils.js";
import { green } from "@mui/material/colors";
import { all } from "axios";
import { clean_answer } from "../Utils/Base.js";
const useStyles = makeStyles({
  menuItem: {
    border: "2px solid transparent", // Transparent border in normal state
    "&:hover": {
      border: "2px solid transparent", // Transparent border in normal state

      borderColor: "black", // Visible border in hover state
    },
  },
});

export default function VerbsVerbs(props) {
  const classes = useStyles();

  const [slider, setSlider] = useState([0, 22]);

  const [text, setText] = useState("");

  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [moods, setMoods] = useState({});
  const [verb, setVerb] = useState(r_verbs_list[0]);
  const inputRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      // if (Object.keys(moods).length == 0) {
      let _moods = await get_table(verb, "Portuguese");
      if (Object.keys(_moods).length > 0) {
        setMainVal(pickRandomKey(_moods, slider));
      }
      setMoods(await get_table(verb, "Portuguese"));
      // } else setMainVal(pickRandomKey(moods, slider, remove_keys));
    };
    fetchData();
  }, [verb]);

  let verbs_amount = getVerbsAmount(moods);
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
        console.log(verb);
        setIsCorrect(false);
        setText("");
        setMainVal(pickRandomKey(moods, slider));
      } else {
        if (clean_answer(inputRef.current.value) == clean_answer(word)) {
          rightAnswer();
        } else {
          wrongAnswer();
        }
      }
    }
  }
  function recursiveButtons(dict, keys) {
    if (keys === "" || Object.keys(dict) == 0) return <div></div>;
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
                // disabled={remove_keys.includes(k)}
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
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <div> </div>
          <div> </div>
          <FormControl sx={{ minWidth: 150, m: 1, border: 0 }}>
            <InputLabel id="demo-simple-select-standard-label">Verb</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={verb}
              label="Verb"
              onChange={(event) => {
                setVerb(event.target.value);
              }}
            >
              <MenuItem value={"all"} className={classes.menuItem}>
                <b>All</b>
              </MenuItem>
              <InputLabel htmlFor="grouped-select" sx={{ marginLeft: 1 }}>
                {" "}
                Regular
              </InputLabel>
              {r_verbs_list.map((val, ind) => (
                <MenuItem value={val} className={classes.menuItem}>
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </MenuItem>
              ))}
              <InputLabel htmlFor="grouped-select" sx={{ marginLeft: 1 }}>
                {" "}
                Irregular
              </InputLabel>
              {ir_verbs_list.map((val, ind) => (
                <MenuItem value={val} className={classes.menuItem}>
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <ThemeProvider theme={theme}>
            <div></div>
            <Paper
              style={{
                width: "30%",
                minWidth: 300,
                paddingTop: 20,
                paddingBottom: 15,
                paddingRight: 15,
                paddingLeft: 15,
                margin: "auto",
              }}
              elevation={10}
            >
              <Typography variant="h4" gutterBottom>
                {verb == "all" ? (
                  <div>
                    <i>
                      <b>{verb}</b>
                    </i>
                    <div></div>
                  </div>
                ) : (
                  <div></div>
                )}

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
          <div> </div>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={2.5}>
              <Typography variant="h5">
                {Object.keys(moods).length > 0
                  ? getSpecByInd(moods, slider[0])[1]
                  : ""}
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Slider
                getAriaLabel={() => "Levels range"}
                value={slider}
                onChange={(event, newValue) => {
                  setSlider(newValue);
                }}
                step={1}
                style={{
                  color: "#4dc3ff", // Main color
                }}
                valueLabelDisplay="on"
                min={0}
                max={verbs_amount}
                sx={{
                  top: -20,
                  marginLeft: 5,
                  marginTop: 5,
                  width: "70%",
                  minWidth: 300,
                }}
              />
            </Grid>
            <Grid item xs={2.5}>
              <Typography variant="h5">
                {Object.keys(moods).length > 0
                  ? getSpecByInd(moods, slider[1] - 1)[1]
                  : ""}
              </Typography>
            </Grid>
          </Grid>
          <div> </div>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}
