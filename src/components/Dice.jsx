import './styles/Dice.css'

function Dice(props){
    return(
        <div 
        className={`dice ${props.isClicked ? "lock" : ""}`}
        onClick={() => props.lock(props.id)}
        >
            {props.number}
        </div>
    )
}

export default Dice