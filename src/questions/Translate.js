import { useState } from "react";
import { updateSong, getTranslation, createSets } from "./ProcessSong";
import seedrandom from "seedrandom";
import Tooltip from "@mui/material/Tooltip";
import yaml from "js-yaml";
import MainTabs from "../Utils/MainTabs";

import Ciicker, { SONG_SPLIT, NAME_SONG_SPLIT } from "./Clicker";
import TextView from "../text_view/TextView";

let to_copy = "";
let data_obj = { words: {}, songs: {} };
export default function Translate(props) {
  const [sets, setSets] = useState("");
  const [words, setWords] = useState({});
  const [songs, setSongs] = useState({});
  const [song_name, setSongName] = useState("");

  const [org_text, setOrgText] = useState("");
  const [extra_songs_raw, setExtraSongsRaw] = useState("");
  const [show_save, setShowSave] = useState(true);
  const [show_reorg, setShowReorg] = useState(false);

  const handleMessageChange = (event) => {
    setOrgText(event.target.value);
    to_copy = updateSong(event.target.value);
  };
  const handleTranslation = (event) => {
    let trans = getTranslation(to_copy, event.target.value);
    setSets(createSets(to_copy, trans));
    data_obj["words"] = Object.assign({}, trans, data_obj["words"]);
    setWords(Object.assign({}, trans, data_obj["words"]));
  };

  const handleSongChosen = (key) => {
    let temp_sets = createSets(
      data_obj["songs"][key]["proccessed_song"],
      data_obj["words"]
    );
    setSets(temp_sets);
    setOrgText(data_obj["songs"][key]["full_song"]);
    setShowSave(false);
  };
  const handleRandomWords = (seed) => {
    // const keysWithDesiredValues = Object.keys(levels).filter(
    //   (key) => levels[key] === 0 || levels[key] === 1 || levels[key] === 2
    // );
    const filteredKeys = Object.keys(words).filter(
      (key) =>
        key.indexOf(" ") === -1 &&
        (words[key].level === 0 || words[key].level === 1)
    );

    const rng = seedrandom(seed); // Create a new seeded random generator

    for (let i = filteredKeys.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [filteredKeys[i], filteredKeys[j]] = [filteredKeys[j], filteredKeys[i]];
    }

    const random50Keys = filteredKeys.slice(0, 50);
    let new_sets = [];
    for (let k in random50Keys) {
      new_sets.push(
        random50Keys[k] + ";" + words[random50Keys[k]]["translation"]
      );
    }
    setSets(new_sets);
    setShowSave(false);
    setShowReorg(true);
  };
  const handleReorganize = () => {
    let new_sets = sets.slice(0);
    for (let i = sets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [new_sets[i], new_sets[j]] = [new_sets[j], new_sets[i]]; // swap
    }
    setSets(new_sets);
    console.log(sets);
  };
  function downloadYamlFile() {
    if (song_name !== "") {
      data_obj["songs"][song_name] = {
        full_song: org_text,
        proccessed_song: to_copy,
      };
    }
    data_obj["words"] = words;
    let exportName = "test";
    const dataStr =
      "data:text/yaml;charset=utf-8," + encodeURIComponent(yaml.dump(data_obj));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".yaml");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  function handleLevel(word, level_change) {
    let new_level = data_obj["words"][word].level + level_change;
    if (new_level >= 0 && new_level <= 6)
      data_obj["words"][word].level = new_level;
  }
  function uploadYamlFile(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        try {
          data_obj = yaml.load(evt.target.result);
          setSongs(data_obj["songs"]);
          setWords(data_obj["words"]);
        } catch (error) {
          console.error("Error parsing YAML", error);
        }
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="translate">
      <h1></h1>
      {Object.keys(data_obj["songs"]).length === 0 ? (
        <Tooltip title="Upload" TransitionProps={{ timeout: 600 }}>
          <label className="button-pretty-1">
            Upload File
            <input
              type="file"
              style={{ display: "none" }}
              onChange={uploadYamlFile}
            />
          </label>
        </Tooltip>
      ) : (
        <div></div>
      )}

      {sets.length > 0 ? (
        <div>
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
          <button className="button-pretty-1" onClick={downloadYamlFile}>
            Download txt
            <img
              className="random-logo"
              src={require("../download.png")}
              alt="randomLogo"
            ></img>
          </button>
          <MainTabs
            terms={sets}
            text={org_text}
            // levels={levels}
            words={words}
            extra_songs={extra_songs_raw}
            show_save={show_save}
            show_reorg={show_reorg}
            handle_reorg={handleReorganize}
            handleLevel={handleLevel}
            in_line_delimeter={";"}
          />
        </div>
      ) : (
        <div>
          Instuructions:
          <br />
          Put the song lyrics you wish to learn in the top box
          <br />
          Press 'copy' and paste the text (that's copied to the clipboard) in
          google translate
          <br />
          Take the output and put it in the bottom box
        </div>
      )}
      <h1></h1>
      {Object.keys(songs).length === 0 ? (
        <div></div>
      ) : (
        <div id="songs-names-container">
          <div className="random-button">
            <div
              className="random-button-data button-pretty-1"
              key={"random"}
              onClick={() => handleRandomWords(Math.random())}
            >
              Random Words
              <img
                className="random-logo"
                src={require("../shuffle.png")}
                alt="randomLogo"
              ></img>
            </div>
          </div>
          {Object.keys([1, 2, 3, 4]).map((key, val) => (
            <div className="random-button">
              <div
                className="random-button-data button-pretty-1"
                key={"random " + key}
                onClick={() =>
                  handleRandomWords(
                    new Date().toString().split(" ").slice(0, 4).toString() +
                      key
                  )
                }
              >
                {"daily " + (val + 1)}
              </div>
            </div>
          ))}
        </div>
      )}
      <div id="songs-names-container">
        {Object.keys(songs)
          .reverse()
          .map((key) => (
            <div
              className="button-pretty-1"
              key={key}
              onClick={() => handleSongChosen(key)}
            >
              {key}
            </div>
          ))}
      </div>
      <textarea rows="20" cols="120" onChange={handleMessageChange}></textarea>
      <h1></h1>
      <div className="button-tooltip-cont">
        <button
          className="button-pretty-1"
          title="Copy"
          onClick={() => {
            navigator.clipboard.writeText(to_copy.join(".\n"));
          }}
        >
          Copy
          <img
            className="random-logo"
            src={require("../duplicate.png")}
            alt="copy"
          ></img>
        </button>
        <div className="button-tooltip-text">Copy</div>
      </div>
      <h1></h1>
      <textarea
        rows="20"
        cols="120"
        onChange={(event) => {
          handleTranslation(event);
        }}
      ></textarea>
    </div>
  );
}
