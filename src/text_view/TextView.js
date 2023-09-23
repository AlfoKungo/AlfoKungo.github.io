import { useState, Fragment } from "react";
import Switch from "@mui/material/Switch";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { clean_word } from "../Utils/Base";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import FormControlLabel from "@mui/material/FormControlLabel";

export default function TextView(props) {
  const [checked, setChecked] = useState(true);
  const [dynamicColor, setDynamicColor] = useState(false);
  const [curWord, setCurWord] = useState("");
  const trans_dict = props.terms.reduce((acc, item) => {
    const [key, value] = item.split(";");
    acc[key] = value.trim();
    return acc;
  }, {});

  let lines = props.text.split("\n");

  let words = [];
  for (let l in lines) {
    words.push(lines[l]);
    words = words.concat(lines[l].split(" "));
    words.push("\n");
  }
  const [open_list, setOpenList] = useState(generateOpenList(words));
  if (words.length != open_list.length) {
    setOpenList([...generateOpenList(words)]);
  }

  function generateOpenList(words) {
    return Array.from({ length: words.length }, (_, i) => ({
      is_open: false,
      content: trans_dict[words[i].toLowerCase().replace(/^[,]+|[,]+$/g, "")],
      classes: {},
    }));
  }
  const style = { fontSize: "24px", lineHeight: "1.75" };
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.5rem",
          },
        },
      },
    },
  });
  const color_dict = [
    "#000000", // Black
    "#616161", // Dark grey
    "#757575", // Grey
    "#909090", // Light grey
    "#D3D3D3", // Lighter grey
    "#EEEEEE", // Lightest grey
  ];
  function handleMouseEnter(index, event, word) {
    if (!checked) handleWordClick(true, index, event, word);
  }
  function getColor(word) {
    if (!dynamicColor || word.indexOf(" ") != -1) return "black";
    let word_obj = props.words[word.toLowerCase()];
    if (word_obj == undefined) {
      return "black";
    }
    return color_dict[word_obj.level];
  }
  async function getWordMean(word) {
    return await axios
      .get(
        "https://en.wiktionary.org/w/api.php?action=parse&format=json&prop=text|displaytitle&page=tomo"
      )
      // .get("http://localhost:8080?message=" + word.toLowerCase());

      .then((response) => {
        // setData(response.data);
        // let copy_list = open_list;

        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
      });
  }
  async function handleWordClick(is_left_click, index, event, word) {
    let copy_list = open_list;
    if (is_left_click) {
      if (copy_list[index].is_open != event) {
        copy_list[index].is_open = event;
        let ff = clean_word(word);
        copy_list[index].content = trans_dict[clean_word(word)];
        setOpenList([...copy_list]);
      }
    } else {
      let word_trans = await getWordMean(word);
      copy_list[index].is_open = event;
      // copy_list[index].classes = { tooltip: "noPaddingTooltip" };
      copy_list[index].content = word_trans;
      setOpenList([...copy_list]);
    }
  }

  const onKeyPress = (e) => {
    if (dynamicColor) {
      if (e.key === "=" || e.key === ".") updateWordLevel(curWord, 1);
      if (e.key === "-" || e.key === ",") updateWordLevel(curWord, -1);
    }
  };
  function updateWordLevel(word, increment) {
    if (word.indexOf(" ") == -1 && word.indexOf("\n") == -1)
      props.handleLevel(word.toLowerCase(), increment);
    setOpenList([...open_list]);
  }
  return (
    <div tabIndex="0" onKeyDown={onKeyPress} style={{ outline: "none" }}>
      <FormControlLabel
        control={
          <Switch
            defaultChecked
            onChange={(event) => setChecked(event.target.checked)}
          />
        }
        label="Show Meaning Only on Click"
      />
      <FormControlLabel
        control={
          <Switch onChange={(event) => setDynamicColor(event.target.checked)} />
        }
        label="Show Levels"
      />

      <ThemeProvider theme={theme}>
        <div style={style}>
          {words.map((word, index) => (
            <span>
              <Tooltip
                key={"html_tool_" + index}
                open={
                  index < open_list.length
                    ? open_list[index].is_open
                    : false ?? ""
                }
                onClick={(event) => {
                  handleWordClick(true, index, true, word);
                  setCurWord(word);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleWordClick(false, index, true, word);
                }}
                onMouseEnter={() => handleMouseEnter(index, true, word)}
                onMouseLeave={() => {
                  handleWordClick(true, index, false, word);
                }}
                title={index < open_list.length ? open_list[index].content : ""}
                enterDelay={100}
                leaveDelay={0}
                style={{ padding: 0, color: getColor(word) }}
                classes={
                  index < open_list.length ? open_list[index].classes : {}
                }
              >
                <a>
                  {word.indexOf(" ") !== -1 ? (
                    <img
                      className="lines-logo"
                      src={require("../lines.png")}
                    ></img>
                  ) : (
                    <div style={{ display: "inline", position: "relative" }}>
                      {dynamicColor ? (
                        <div className="textview-level">
                          {props.words[clean_word(word)]
                            ? props.words[clean_word(word)].level.toString()
                            : ""}
                        </div>
                      ) : (
                        ""
                      )}

                      {word}
                    </div>
                  )}
                </a>{" "}
              </Tooltip>
            </span>
          ))}
        </div>
      </ThemeProvider>
    </div>
  );
}
