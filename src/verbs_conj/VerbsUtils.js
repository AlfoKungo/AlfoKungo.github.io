import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useRef, useEffect } from "react";

import axios from "axios";
import { load } from "cheerio";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#fafbfc", // Given color
      light: "#6faee6", // Lighter shade
      dark: "#307ac8", // Darker shade
      contrastText: "#064199", // Assuming a white color would provide a good contrast
    },
    secondary: {
      main: "#2082e6", // Given color
      light: "#6faee6", // Lighter shade
      dark: "#307ac8", // Darker shade
      contrastText: "#fff", // Assuming a white color would provide a good contrast
    },
  },
});
function flattenObj(obj, remove_keys, pre_key = "", arr = []) {
  for (const key in obj) {
    if (!remove_keys.includes(key)) {
      if (typeof obj[key] === "object") {
        flattenObj(obj[key], [], pre_key + " " + key, arr); // Recur for nested objects
      } else {
        arr.push([obj[key], (pre_key + " " + key).trim()]); // Add the edge value to array
      }
    }
  }
  return arr;
}
export function pickRandomKey(obj, amount_limit) {
  let flat = flattenObj(obj, []);
  flat = flat.slice(amount_limit[0], amount_limit[1]);
  return flat[Math.floor(Math.random() * flat.length)];
}
export function getVerbsAmount(obj) {
  return flattenObj(obj, []).length;
}
export function getSpecByInd(obj, ind) {
  return flattenObj(obj, [])[ind];
}

async function getWordMean(word) {
  return await axios
    .get(
      "https://en.wiktionary.org/w/api.php?action=parse&format=json&prop=text|displaytitle&origin=*&page=" +
        word.toLowerCase()
    )
    .then((response) => {
      return response.data.parse.text["*"];
    })
    .catch((error) => {
      console.error("Error fetching the data", error);
    });
}

function HebrewTableParser(htmlString) {
  if (htmlString == undefined) return undefined;
  const $ = load(htmlString);

  let data = {
    nonFiniteForms: {},
    finiteForms: {},
  };

  // Extracting Non-Finite Forms
  const nonFiniteForms = $("table").first().find("tr").slice(1); // Skipping the header row

  nonFiniteForms.each((_, el) => {
    const cells = $(el).find("td");
    const type = cells.eq(0).text().trim();
    const form = cells.eq(1).text().trim();
    data.nonFiniteForms[type] = form || null;
  });

  // Extracting Finite Forms
  const finiteFormsTables = $("table").slice(1); // Skipping the first table

  finiteFormsTables.each((_, table) => {
    const rows = $(table).find("tr").slice(2); // Skipping the header rows
    const tense = $(table)
      .find("tr")
      .first()
      .find("th")
      .text()
      .trim()
      .toLowerCase();

    rows.each((_, row) => {
      const cells = $(row).find("td");
      const person = cells.eq(0).text().trim().toLowerCase();

      if (!data.finiteForms[tense]) {
        data.finiteForms[tense] = {};
      }

      data.finiteForms[tense][person] = {
        singular: cells.eq(1).text().trim() || null,
        plural: cells.eq(2).text().trim() || null,
      };
    });
  });

  return data;
}

function parseHtml(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  let spanElements = Array.from(
    doc.querySelectorAll("td")
    // doc.querySelectorAll(".Latn:not(.mention)")
  ).map((el) => {
    return el.innerText.trim();
    // return el.parentElement.innerText.trim();
  });
  spanElements = spanElements.filter((val) => val != "");
  spanElements = spanElements.map((val) => val.split("1")[0]);
  return spanElements;
}

function fillEmptyStrings(obj, values) {
  let index = 0; // to keep track of the list index

  function recursiveFill(obj) {
    if (index >= values.length) return; // stop if all values are used
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        recursiveFill(obj[key]); // recursively fill for nested objects
      }
      //  if (obj[key] === "")
      else {
        obj[key] = values[index]; // replace empty string with value from list
        index++; // move to the next value in the list
        if (index >= values.length) return; // stop if all values are used
      }
    }
  }

  recursiveFill(obj); // initiate the recursive fill
}
export async function get_table(verb, language) {
  let htmlString = await getWordMean(verb);
  let ind_pt = htmlString.indexOf(`id="${language}"`);
  let ind_table_start = htmlString.slice(ind_pt).indexOf("<table") + ind_pt;
  let ind_table_end =
    htmlString.slice(ind_table_start).indexOf("</table") + ind_table_start;
  let table = htmlString.slice(ind_table_start, ind_table_end);
  let verbs = parseHtml(table);
  fillEmptyStrings(MOODS, verbs);
  let moods = { ...MOODS };
  // fillEmptyStrings(moods, verbs);
  return moods;
}

export async function create_verb_dict() {}

export const MOODS = {
  infinitive: {
    impersonal: "",
    personal: {
      singular: { "first-person": "", "second-person": "", "third-person": "" },
      plural: { "first-person": "", "second-person": "", "third-person": "" },
    },
  },
  gerud: "",
  "past-particle": {
    masculine: { singular: "", plural: "" },
    feminine: { singular: "", plural: "" },
  },
  indicative: {
    present: {
      singular: { "first-person": "", "second-person": "", "third-person": "" },
      plural: { "first-person": "", "second-person": "", "third-person": "" },
    },
    imperfect: {
      singular: { "first-person": "", "second-person": "", "third-person": "" },
      plural: { "first-person": "", "second-person": "", "third-person": "" },
    },
    preterite: {
      singular: { "first-person": "", "second-person": "", "third-person": "" },
      plural: { "first-person": "", "second-person": "", "third-person": "" },
    },
    pluperfect: {
      singular: { "first-person": "", "second-person": "", "third-person": "" },
      plural: { "first-person": "", "second-person": "", "third-person": "" },
    },
    future: {
      singular: { "first-person": "", "second-person": "", "third-person": "" },
      plural: { "first-person": "", "second-person": "", "third-person": "" },
    },
  },
  conditional: {
    singular: { "first-person": "", "second-person": "", "third-person": "" },
    plural: { "first-person": "", "second-person": "", "third-person": "" },
  },
  subjunctive: {
    present: {
      singular: { "first-person": "", "second-person": "", "third-person": "" },
      plural: { "first-person": "", "second-person": "", "third-person": "" },
    },
    imperfect: {
      singular: { "first-person": "", "second-person": "", "third-person": "" },
      plural: { "first-person": "", "second-person": "", "third-person": "" },
    },
    future: {
      singular: { "first-person": "", "second-person": "", "third-person": "" },
      plural: { "first-person": "", "second-person": "", "third-person": "" },
    },
  },
  imperative: {
    affirmative: {
      singular: { "second-person": "", "third-person": "" },
      plural: { "first-person": "", "second-person": "", "third-person": "" },
    },
    negative: {
      singular: { "second-person": "", "third-person": "" },
      plural: { "first-person": "", "second-person": "", "third-person": "" },
    },
  },
};
