import './DogCard.css'

export default function DogCard (props){
    return (
    <div className="mainDiv">
        <div className="secondDiv">
            <h2>{props.name}</h2>
            <img src={props.image} alt='Dog'/>
            <h4>{props.weight}</h4>
        </div>
    </div>
    )
}