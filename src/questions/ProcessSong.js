// let song = "";
// let tsong = "";
// let words = "";
// let lines = "";

import * as Base from "../Utils/Base";
// let setSets_;

// const handleMessageChange = (event) => {
//   song = event.target.value;
//   updateSong();
// };
// const handleTranslation = (event, words) => {
//   tsong = event.target.value;
//   updateTranslation(words);
// };

export function updateSong(song) {
  let words = "";
  let pre_lines = song.split("\n");
  let lines = [];
  for (let i = 0; i < pre_lines.length; i++) {
    if (Base.semi_semi_clean_answer(pre_lines[i]).length > 1)
      lines.push(Base.semi_semi_clean_answer(pre_lines[i]));
  }
  lines = Array.from(new Set(lines));

  song = song.replace(/(?:\r\n|\r|\n)/g, " ");
  let pre_words = song.split(" ");
  words = [];
  for (let i = 0; i < pre_words.length; i++) {
    if (pre_words[i].length > 0)
      words.push(Base.semi_clean_answer(pre_words[i]));
  }
  words = Array.from(new Set(words));
  console.log(lines);

  return words.concat(lines);
}

export function updateTranslation(words, tsong) {
  console.log(words);
  let twords = tsong.split(".");
  console.log(twords);

  let set = [];

  for (let i = 0; i < twords.length - 1; i++)
    set.push(words[i] + ";" + twords[i]);
  return set;
}
