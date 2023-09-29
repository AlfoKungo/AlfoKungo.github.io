import { useState, useEffect } from "react";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Paper, Typography, Slider } from "@mui/material";
import {
  theme,
  pickRandomKey,
  get_table,
  getSpecByInd,
  getVerbsAmount,
} from "./VerbsUtils.js";

export default function VerbsConj(props) {
  function onKeyPress() {}
  const [sel, setSel] = useState({ 1: null });
  const [moods, setMoods] = useState({});
  const [word, setWord] = useState("");
  const [slider, setSlider] = useState([0, 22]);

  let verb = "falar";
  let verbs_amount = getVerbsAmount(moods);
  useEffect(() => {
    const fetchData = async () => {
      let _moods = await get_table(verb, "Portuguese");
      if (Object.keys(_moods).length > 0) {
        setWord(pickRandomKey(_moods, slider)[0]);
      }
      setMoods(await get_table(verb, "Portuguese"));
    };
    fetchData();
  }, [verb]);
  function submitRange(event, input_word) {
    if (input_word == word) {
      setWord(pickRandomKey(moods, slider)[0]);
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
                  let dd = Object.keys(sel).reduce((acc, k) => {
                    if (parseInt(k) <= ind) {
                      acc[k] = sel[k];
                    }
                    return acc;
                  }, {});
                  dd[ind] = key;
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
              color="secondary"
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
    </div>
  );
}
