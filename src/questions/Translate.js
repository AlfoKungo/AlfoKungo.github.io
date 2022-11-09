// import {song, tsong} from "../Variable"
import {useState} from 'react'
import * as Base from '../Utils/Base'
import Ciicker from './Clicker'

let song = "";
let tsong = "";
let words = "";
let lines = "";
// let set = [];
let setSets_;

const handleMessageChange = event => {
    // 👇️ update textarea value
    // setMessage(event.target.value);
    // console.log(event.target.value);
    song = event.target.value;
    updateSong();
  };
const handleTranslation = (event, words) => {
    // 👇️ update textarea value
    // setMessage(event.target.value);
    // console.log(event.target.value);
    tsong = event.target.value;
    updateTranslation(words);
  };

function updateSong(){
    let pre_lines = song.split("\n");
    lines = [];
    for (let i = 0 ; i < pre_lines.length ; i++){
        // console.log(Base.semi_clean_answer(pre_lines[i]).length);
        if (Base.semi_semi_clean_answer(pre_lines[i]).length > 1)
            lines.push(Base.semi_semi_clean_answer(pre_lines[i]));}
    lines = Array.from(new Set(lines));

    song = song.replace(/(?:\r\n|\r|\n)/g, " ");
    let pre_words = song.split(" ");
    words = [];
    for (let i = 0 ; i < pre_words.length ; i++){
        if (pre_words[i].length > 0)
            words.push(Base.semi_clean_answer(pre_words[i]));}
    words = Array.from(new Set(words));

    words = words.concat(lines);

    console.log(lines);
}

function updateTranslation(words)
{
    console.log(words);
    let twords=tsong.split(".");
    console.log(twords);

    let set = [];


    for (let i = 0 ; i <twords.length -1 ; i++)
        set.push(words[i] + ";" +twords[i]);
    setSets_(set);
    // console.log(set);
}

export default function Translate(props) {

    // const [words, setWords] = useState(""); 
    const [sets, setSets] = useState(""); 

    // setWords_ = setWords;
    setSets_ = setSets;

    
    // set = set.sort(() => {return Math.random() -0.5;});
    return (
          <div className='translate'>
            <h1></h1>
            { sets.length > 0 ? (
            <Ciicker terms={sets} in_line_delimeter={';'}/>
            ) :
            (
                <div>Instuructions:<br/>Put the song lyrics you wish to learn in the top box<br/>Press 'copy' and paste the text (that's copied to the clipboard) in google translate<br/>Take the output and put it in the bottom box</div>
                )
            }
            <h1></h1>
             <textarea rows="20" cols="120"
             onChange={handleMessageChange}
             ></textarea>
             <h1></h1>
             <button onClick={() => {navigator.clipboard.writeText(words.join(".\n"))}}>Copy</button>
             <h1></h1>
             <textarea rows="20" cols="120"
             onChange={(event) => {handleTranslation(event, words)}}
             ></textarea>
             {/* {words} */}
             
            </div>       
      )
}

