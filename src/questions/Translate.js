// import {song, tsong} from "../Variable"
import { useState } from "react";
import { updateSong, updateTranslation } from "./ProcessSong";
import Ciicker, {
  FILE_SPLIT,
  SONG_SPLIT,
  NAME_SONG_SPLIT,
  TERMS_SPLIT,
} from "./Clicker";

let to_copy = "";
let setSets_;

const handleMessageChange = (event) => {
  to_copy = updateSong(event.target.value);
};
const handleTranslation = (event) => {
  setSets_(updateTranslation(to_copy, event.target.value));
};

export default function Translate(props) {
  const [sets, setSets] = useState("");
  const [levels, setLevels] = useState({});
  const [extra_songs, setExtraSongs] = useState("");
  const [extra_songs_raw, setExtraSongsRaw] = useState("");
  const [show_save, setShowSave] = useState(true);
  setSets_ = setSets;
  const handleSongChosen = (key) => {
    setSets(extra_songs[key].split(TERMS_SPLIT));
    console.log("ss: ", extra_songs[key].split(TERMS_SPLIT));
    setShowSave(false);
  };
  const handleRandomWords = () => {
    const keysWithDesiredValues = Object.keys(levels).filter(
      (key) => levels[key] === 0 || levels[key] === 1 || levels[key] === 2
    );
    for (let i = keysWithDesiredValues.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [keysWithDesiredValues[i], keysWithDesiredValues[j]] = [
        keysWithDesiredValues[j],
        keysWithDesiredValues[i],
      ];
    }

    // Take the first 50 keys
    const random50Keys = keysWithDesiredValues.slice(0, 50);
    const keyValueList = random50Keys.map((key) => `${key};\n${levels[key]}`);

    // setSets(extra_songs[key].split(TERMS_SPLIT));
    // setShowSave(false);
    console.log("keys: ", keyValueList);
  };
  const handleExtraSongs = (extra) => {
    setExtraSongsRaw(extra);

    if (extra && extra.includes(SONG_SPLIT)) {
      let pairs = extra.split(SONG_SPLIT);
      const songs = {};
      pairs.forEach((pair) => {
        const [key, value] = pair.split(NAME_SONG_SPLIT);
        if (key !== "\n") songs[key.replace("Name: ", "")] = value;
      });
      console.log(songs);
      setExtraSongs(songs);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const reader = new FileReader();
    reader.onload = function (e) {
      var content = reader.result;
      handleExtraSongs(content.split(FILE_SPLIT, 2)[1]);
      content = content.split(FILE_SPLIT, 2)[0];
      const dic = content
        .trim()
        .split("\n")
        .reduce((obj, line) => {
          const [key, value] = line.split(":");
          obj[key.replace("\n", "")] = parseInt(value, 10); // Convert the value to an integer
          return obj;
        }, {});
      setLevels(dic);
      console.log("File uploaded successfully:", dic);
    };
    reader.readAsText(file);
  };
  return (
    <div className="translate">
      <h1></h1>
      {Object.keys(levels).length === 0 ? (
        <label className="button-pretty-1">
          Upload File
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <div>Save is loaded</div>
      )}

      {sets.length > 0 ? (
        <Ciicker
          terms={sets}
          levels={levels}
          extra_songs={extra_songs_raw}
          show_save={show_save}
          in_line_delimeter={";"}
        />
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
      <div id="songs-names-container">
        {Object.keys(extra_songs).map((key) => (
          <div
            className="button-pretty-1"
            key={key}
            onClick={() => handleSongChosen(key)}
          >
            {key}
          </div>
        ))}
        {Object.keys(extra_songs).length === 0 ? (
          <div></div>
        ) : (
          <div className="random-button">
            <div
              className="button-pretty-1"
              key={"random"}
              onClick={() => handleRandomWords()}
            >
              Random Words
              <img
                className="random-logo"
                src={require("../shuffle.png")}
                alt="randomLogo"
              ></img>
            </div>
          </div>
        )}
      </div>
      <textarea rows="20" cols="120" onChange={handleMessageChange}></textarea>
      <h1></h1>

      <button
        className="button-pretty-1"
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
