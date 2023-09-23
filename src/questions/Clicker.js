import { useState } from "react";
import ClickerButton from "./ClickerButton";
import Slider from "@mui/material/Slider";
import { clean_word } from "../Utils/Base";

export default function Clicker(props) {
  const [slider, setSlider] = useState([0, 2]);
  const [updater, setUpdater] = useState({});

  const [terms, setTerms] = useState(props.terms);
  if (JSON.stringify(terms) != JSON.stringify(props.terms))
    setTerms(props.terms);

  const [l_index, setLIndex] = useState(0);
  const show_reorg = props.show_reorg;
  const handle_reorg = props.handle_reorg;

  const increaseLevel = (index) => {
    setUpdater({});
    props.handleLevel(terms[index], 1);
  };

  const reduceLevel = (index) => {
    setUpdater({});
    props.handleLevel(terms[index].split(";")[0], -1);
  };
  const onKeyPress = (e) => {
    if (e.key === "=" || e.key === ".") increaseLevel(l_index);
    if (e.key === "-" || e.key === ",") reduceLevel(l_index);
  };

  // let reorganizeTerms = () => {
  //   const combined = [];
  //   for (const key in terms) {
  //     combined.push([terms[key], levels[key]]);
  //   }

  //   for (let i = combined.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [combined[i], combined[j]] = [combined[j], combined[i]]; // swap
  //   }
  //   const shuffledTerms = [];
  //   const shuffledLevels = [];

  //   for (const [term, level] of combined) {
  //     shuffledTerms.push(term);
  //     shuffledLevels.push(level);
  //   }
  //   setTerms(shuffledTerms);
  //   setLevels(shuffledLevels);
  // };

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
          {terms.map((card, index) => {
            return (
              <ClickerButton
                que={card}
                ans={props.words[clean_word(card)].translation}
                index={index}
                key={card}
                level={props.words[clean_word(card)].level}
                onClick={(e) => {
                  // e.preventDefault();
                  setLIndex(index);
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
