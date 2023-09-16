import * as Base from "../Utils/Base";

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

export function getTranslation(words, tsong) {
  const twords = tsong.split(".");
  let trans = {};

  for (let i = 0; i < twords.length; i++) {
    trans[words[i]] = { translation: twords[i].replace("\n", ""), level: 0 };
  }
  return trans;
}

export function createSets(words, translations) {
  let set = [];
  for (let i = 0; i < words.length; i++) {
    set.push(words[i] + ";" + translations[words[i]]["translation"]);
  }
  return set;
}
