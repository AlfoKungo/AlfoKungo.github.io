import { useState } from "react";
import ClickerButton from "./ClickerButton";

export const FILE_SPLIT = "=".repeat(10);
export const SONG_SPLIT = "-".repeat(5);
export const NAME_SONG_SPLIT = ":".repeat(5);
export const TERMS_SPLIT = ":::";

export default function Clicker(props) {
  console.log(props.terms);
  const LIMIT = 5;
  const extra_songs = props.extra_songs ? props.extra_songs : "";
  let p_levels = new Array(props.terms.length).fill(0);

  props.terms.map((value, index) => {
    let key = value.split(";\n")[0].split(";")[0].replace("\n", "");
    if (key in props.levels) p_levels[index] = props.levels[key];
  });
  console.log("pp", p_levels);

  const [terms, setTerms] = useState(props.terms);
  const [levels, setLevels] = useState(p_levels);
  if (JSON.stringify(levels) != JSON.stringify(p_levels)) setLevels(p_levels);
  let cards = [];
  for (let i = 0; i < props.terms.length; i++) {
    cards.push(props.terms[i]);
  }
  const [l_index, setLIndex] = useState(0);
  const [song_name, setSongName] = useState("");
  const show_save = props.show_save;
  const show_reorg = props.show_reorg;
  const handle_reorg = props.handle_reorg;

  const increaseLevel = (index) => {
    if (levels[index] < LIMIT) {
      const newLevels = [...levels];
      newLevels[index] += 1;
      setLevels(newLevels);
      props.levels[terms[index].split(";")[0].trim()] = newLevels[index];
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
  };
  const onKeyPress = (e) => {
    if (e.key === "=" && levels[l_index] < LIMIT) increaseLevel(l_index);
    if (e.key === "-" && levels[l_index] > 0) reduceLevel(l_index);
  };

  let downloadTxtFile = () => {
    const element = document.createElement("a");
    let ss = terms.slice().reduce((obj, key, index) => {
      let k = key.split(";\n")[0].split(";")[0];
      if (!k.includes(" ")) obj[k] = levels[index];
      return obj;
    }, {});
    console.log("sss:", ss);
    let text = Object.entries({ ...props.levels, ...ss })
      .map(([key, value]) => `${key}:${value}`)
      .join("\n");
    text += "\n" + FILE_SPLIT;
    if (song_name !== "") {
      console.log("inside", terms);
      text += "\n" + "Name: " + song_name;
      text += "\n" + NAME_SONG_SPLIT + "\n";
      text += terms.join(TERMS_SPLIT);
      text += "\n" + SONG_SPLIT;
    }
    text += extra_songs;
    console.log(extra_songs);
    const file = new Blob([text], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "save.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
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
      {show_save ? (
        <div className="input-container">
          <input
            type="text"
            className="input-box"
            value={song_name}
            onChange={(event) => {
              setSongName(event.target.value);
            }}
          ></input>
          <div className="tooltip-text">
            Add a <b>name</b> to save the current text in the save file
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <button className="button-pretty-1" onClick={downloadTxtFile}>
        Download txt
      </button>
      <div></div>
      {show_reorg ? (
        <button className="button-pretty-1" onClick={handle_reorg}>
          Reorganize
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
    </div>
  );
}
