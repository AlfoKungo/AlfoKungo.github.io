import {useState} from 'react'
// import
let in_line_delimeter;
const switch_sides = true;

function flip_back(setFlip, id)
{
    setFlip(false);
    document.querySelector("#" + id).classList.remove('clicker');


}

function know_it(id)
{
    document.getElementById(id).style.backgroundColor="green";
}

export default function ClickerButton(props) {
    let card = props.card;
    let index = props.index;
    let id = "que" + index;
    in_line_delimeter = props.in_line_delimeter;

    const [flip, setFlip] = useState(false);

    let [que, ans] = card.split(in_line_delimeter);
    if (switch_sides)
        [que, ans] = [ans, que]

    // document.getElementById(que).addEventListener("contextmenu", e => e.preventDefault());
    return (
          <div className='click-button' id={id}
        //   onContextMenu={(e)=> e.preventDefault()}
          >
            <li onClick={(e) =>{ 
                 console.log(index);

                let ele = document.getElementById(id);
                setFlip(true);
                document.querySelector("#" + id).classList.add('clicker');
                setTimeout(() => { 
                    flip_back(setFlip, id);
                    }, 2500);
                } }
                id={id + "li"}
                onContextMenu={(e) => {
                    know_it(id);
                     e.preventDefault();
                    }}
                className=""
                >
                {flip ? que : ans}
                </li>
            </div>       
      )
}

