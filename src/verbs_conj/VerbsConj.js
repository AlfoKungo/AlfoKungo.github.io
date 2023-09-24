import { useState, useEffect } from "react";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper, TextField, Typography } from "@mui/material";
import { theme, get_table, pickRandomKey } from "./VerbsUtils.js";

export default function VerbsConj(props) {
  function onKeyPress() {}
  const [sel, setSel] = useState({ 1: null });
  const [moods, setMoods] = useState({});
  const [word, setWord] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setMoods(await get_table("andar", "Portuguese"));
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (Object.keys(moods).length > 0) {
      setWord(pickRandomKey(moods)[0]);
    }
  }, [moods]);
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
                  let dd = Object.keys(sel).reduce((acc, key) => {
                    if (parseInt(key) <= ind) {
                      acc[key] = sel[key];
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
