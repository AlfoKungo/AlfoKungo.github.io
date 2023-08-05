import { useState } from "react";
import ClickerButton from "./ClickerButton";

export default function Clicker(props) {
  const LIMIT = 5;
  const [terms, setTerms] = useState(props.terms);
  const [levels, setLevels] = useState(new Array(terms.length).fill(0));
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
  return (
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
  );
}
