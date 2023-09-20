import { useState, Fragment } from "react";
import Switch from "@mui/material/Switch";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import scrapeHtmlWeb from "../Utils/scrape-html-web";
import DictionaryCard from "./DictionaryCard";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

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
  const style = { fontSize: "24px" };
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.5rem", // Adjust this value as needed
          },
        },
      },
    },
  });
  const color_dict = [
    "#000000", // Black
    "#404040", // Dark grey
    "#606060", // Grey
    "#909090", // Light grey
    "#D3D3D3", // Lighter grey
    "#EEEEEE", // Lightest grey
  ];
  function handleMouseEnter(index, event, word) {
    if (!checked) handleWordClick(true, index, event, word);
  }
  function getColor(word) {
    if (!dynamicColor || word.indexOf(" ") != -1) return "black";
    console.log(words + ":" + props.words[word.toLowerCase()]);
    let word_obj = props.words[word.toLowerCase()];
    if (word_obj == undefined) {
      return "black";
    }
    return color_dict[word_obj.level];
  }
  async function handleWordClick(is_left_click, index, event, word) {
    let copy_list = open_list;
    if (copy_list[index].is_open != event) {
      copy_list[index].is_open = event;
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
      <Switch
        onChange={(event) => setChecked(event.target.checked)}
        defaultChecked
      />
      <Switch onChange={(event) => setDynamicColor(event.target.checked)} />
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
                // onContextMenu={(e) => {
                //   e.preventDefault();
                //   handleWordClick(false, index, true, word);
                // }}
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
                    word
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
