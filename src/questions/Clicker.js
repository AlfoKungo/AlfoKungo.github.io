import ClickerButton from "./ClickerButton"

export default function Clicker(props) {
    let terms = props.terms;
    
    let cards = [];
    // for (let i = 0; i < 50 ; i++)
    for (let i = 0; i < terms.length ; i++)
    {
        cards.push(terms[i]);
    }

    return (
          <div className='click-card'>
            <ul>
            {cards.map((card, index) => {
                return <ClickerButton card={card} index={index}in_line_delimeter=";" key={card} />
                })}
            </ul>
            </div>       
      )
}

