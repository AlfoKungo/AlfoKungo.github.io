import { useState } from "react";
import ClickerButton from "./ClickerButton";

export default function Clicker(props) {
  const LIMIT = 5;
  let p_levels = new Array(props.terms.length).fill(0);
  props.terms.map((value, index) => {
    let key = value.split(";\n")[0].split(";")[0];
    if (key in props.levels) p_levels[index] = props.levels[key];
  });
  console.log("pp", p_levels);
  const [terms, setTerms] = useState(props.terms);
  const [levels, setLevels] = useState(p_levels);
  const [l_index, setLIndex] = useState(0);

  let cards = [];
  for (let i = 0; i < terms.length; i++) {
    cards.push(terms[i]);
  }
  const increaseLevel = (index) => {
    if (levels[index] < LIMIT) {
      const newLevels = [...levels];
      newLevels[index] += 1;
      setLevels(newLevels);
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
    const text = Object.entries({ ...props.levels, ...ss })
      .map(([key, value]) => `${key}:${value}`)
      .join("\n");
    const file = new Blob([text], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "save.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div>
      <button onClick={downloadTxtFile}>Download txt</button>

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
