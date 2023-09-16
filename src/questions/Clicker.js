import { useState } from "react";
import ClickerButton from "./ClickerButton";
import Slider from "@mui/material/Slider";

export const SONG_SPLIT = "-".repeat(5);
export const NAME_SONG_SPLIT = ":".repeat(5);

export default function Clicker(props) {
  const [slider, setSlider] = useState([0, 2]);
  console.log(props.terms);
  const LIMIT = 5;
  // const extra_songs = props.extra_songs ? props.extra_songs : "";
  let p_levels = new Array(props.terms.length).fill(0);

  props.terms.map((value, index) => {
    let key = value.split(";\n")[0].split(";")[0].replace("\n", "");
    if (key in props.levels) p_levels[index] = props.levels[key];
  });
  console.log("pp", p_levels);

  const [terms, setTerms] = useState(props.terms);
  const [levels, setLevels] = useState(p_levels);
  if (JSON.stringify(levels) != JSON.stringify(p_levels)) setLevels(p_levels);
  if (JSON.stringify(terms) != JSON.stringify(props.terms))
    setTerms(props.terms);

  let cards = [];
  for (let i = 0; i < props.terms.length; i++) {
    cards.push(props.terms[i]);
  }
  const [l_index, setLIndex] = useState(0);
  const show_reorg = props.show_reorg;
  const handle_reorg = props.handle_reorg;

  const increaseLevel = (index) => {
    if (levels[index] < LIMIT) {
      const newLevels = [...levels];
      newLevels[index] += 1;
      setLevels(newLevels);
      props.levels[terms[index].split(";")[0].trim()] = newLevels[index];
      props.handleLevel(terms[index].split(";")[0], 1);
    } else {
      deleteItem(index);
    }
  };

  const deleteItem = (index) => {
    const newLevels = levels.filter((_, i) => i !== index);
    setLevels(newLevels);
    const newTerms = terms.filter((_, i) => i !== index);
    setTerms(newTerms);
  };
  const reduceLevel = (index) => {
    const newLevels = [...levels];
    newLevels[index] -= 1;
    setLevels(newLevels);
    props.levels[terms[index].split(";")[0].trim()] = newLevels[index];
    props.handleLevel(terms[index].split(";")[0], -1);
  };
  const onKeyPress = (e) => {
    if ((e.key === "=" || e.key === ".") && levels[l_index] < LIMIT)
      increaseLevel(l_index);
    if ((e.key === "-" || e.key === ",") && levels[l_index] > 0)
      reduceLevel(l_index);
  };

  let reorganizeTerms = () => {
    const combined = [];
    for (const key in terms) {
      combined.push([terms[key], levels[key]]);
    }

    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]]; // swap
    }

    // 3. Extract dictionaries
    const shuffledTerms = [];
    const shuffledLevels = [];

    for (const [term, level] of combined) {
      shuffledTerms.push(term);
      shuffledLevels.push(level);
    }
    setTerms(shuffledTerms);
    setLevels(shuffledLevels);
  };

  return (
    <div>
      <div className="tooltip-container">
        <button className="question-mark-button">?</button>
        <div className="tooltip-content">
          After pressing on a box, you can press <b>+</b> or <b>-</b> to
          increase or reduce the level of knowledge of a word
        </div>
      </div>
      <div></div>
      {show_reorg ? (
        <button className="button-pretty-1" onClick={handle_reorg}>
          Reorganize
          <img
            className="random-logo"
            src={require("../backlog.png")}
            alt="randomLogo"
          ></img>
        </button>
      ) : (
        <div></div>
      )}

      <div className="click-card" onKeyDown={onKeyPress} tabIndex="0">
        <ul>
          {cards.map((card, index) => {
            return (
              <ClickerButton
                card={card}
                index={index}
                in_line_delimeter=";"
                key={card}
                level={levels[index]}
                onClick={(e) => {
                  e.preventDefault();
                  setLIndex(index);
                  if (e.metaKey) increaseLevel(index);
                  if (e.altKey && levels[index] > 0) reduceLevel(l_index);
                }}
              />
            );
          })}
        </ul>
      </div>
      <Slider
        getAriaLabel={() => "Levels range"}
        value={slider}
        onChange={(event, newValue) => {
          setSlider(newValue);
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
