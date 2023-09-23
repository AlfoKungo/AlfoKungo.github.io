import { useState } from "react";
import { grey } from "@mui/material/colors";

let in_line_delimeter;
const switch_sides = true;

export default function ClickerButton(props) {
  // let [card, setCard] = useState(props.card);
  let card = props.card;
  let [que, ans] = card.split(";");
  let index = props.index;
  let id = "que" + index;
  let level = props.level;
  let onClick = props.onClick;
  // let level = 0;

  const [flip, setFlip] = useState(false);
  // const [level, setLevel] = useState(_level);
  function flip_back(id) {
    setFlip(false);
    let d = document.querySelector("#" + id);
    if (d != null) d.classList.remove("clicker");
  }
  if (switch_sides) [que, ans] = [ans, que];
  const shadesOfGrey = [
    "#000000", // Black
    "#616161", // Dark grey
    "#757575", // Grey
    "#909090", // Light grey
    "#D3D3D3", // Lighter grey
    "#EEEEEE", // Lightest grey
  ];

  return (
    <div
      className="click-button"
      id={id}
      onClick={onClick}
      style={{ color: shadesOfGrey[level] }}

      //   onContextMenu={(e)=> e.preventDefault()}
    >
      <li
        onClick={(e) => {
          let ele = document.getElementById(id);
          setFlip(true);
          document.querySelector("#" + id).classList.add("clicker");
          setTimeout(() => {
            flip_back(id);
          }, 2500);
        }}
        id={id + "li"}
        onContextMenu={(e) => {
          // know_it(id);
          e.preventDefault();
        }}
        className=""
      >
        <div className="clicker-level">{level}</div>
        {flip ? que : ans}
      </li>
    </div>
  );
}
