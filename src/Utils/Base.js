export function nthIndexOf(list, ele, from, nth) {
  if (nth === 0) list.indexOf(ele, from);
  else return nthIndexOf(list, ele, list.indexOf(ele, from) + 1, nth - 1);
}

export function clean_answer(answer) {
  answer = answer
    .replace(/ *\([^)]*\) */g, "")
    .replace(/[.,\/?#!$%\^&\*;:{}=\_`~()]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/-/g, " ");
  answer = answer.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  return answer.trim().toLowerCase();
}
export function semi_clean_answer(answer) {
  answer = answer
    .replace(/ *\([^)]*\) */g, "")
    .replace(/[.,\/?#!$%\^&\*;:{}=\_`~()]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/-/g, " ");
  //   answer = answer.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  return answer.trim().toLowerCase();
}
export function semi_semi_clean_answer(answer) {
  answer = answer
    .replace(/ *\([^)]*\) */g, "")
    .replace(/[.\/?#!$%\^&\*;:{}=\_`~()]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/-/g, " ");
  //   answer = answer.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  return answer.trim().toLowerCase();
}

export function check_match(right_answer, input_answer) {
  return clean_answer(input_answer) === clean_answer(right_answer);
}
