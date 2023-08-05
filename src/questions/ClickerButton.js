import { useState } from "react";
// import
let in_line_delimeter;
const switch_sides = true;

function flip_back(setFlip, id) {
  setFlip(false);
  document.querySelector("#" + id).classList.remove("clicker");
}

// function know_it(id) {
//   document.getElementById(id).style.backgroundColor = "green";
// }

export default function ClickerButton(props) {
  let card = props.card;
  let index = props.index;
  let id = "que" + index;
  let level = props.level;
  let onClick = props.onClick;
  // let level = 0;
  in_line_delimeter = props.in_line_delimeter;

  const [flip, setFlip] = useState(false);
  // const [level, setLevel] = useState(_level);

  let [que, ans] = card.split(in_line_delimeter);
  if (switch_sides) [que, ans] = [ans, que];
  const shadesOfGrey = [
    "#000000", // Black
    "#606060", // Dark grey
    "#808080", // Grey
    "#B0B0B0", // Light grey
    "#D3D3D3", // Lighter grey
    "#EEEEEE", // Lightest grey
  ];
  // document.getElementById(que).addEventListener("contextmenu", e => e.preventDefault());
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
            flip_back(setFlip, id);
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
