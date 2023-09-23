import { useState } from "react";

const switch_sides = false;

export default function ClickerButton(props) {
  const [que, ans] = [props.que, props.ans];
  let index = props.index;
  let id = "que" + index;
  let level = props.level;
  let onClick = props.onClick;

  const [flip, setFlip] = useState(false);

  function flip_back(id) {
    setFlip(false);
    let d = document.querySelector("#" + id);
    if (d != null) d.classList.remove("clicker");
  }
  if (switch_sides) [que, ans] = [ans, que];
  const shadesOfGrey = [
    "#000000",
    "#616161",
    "#757575",
    "#909090",
    "#D3D3D3",
    "#EEEEEE",
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
        {flip ? ans : que}
      </li>
    </div>
  );
}
