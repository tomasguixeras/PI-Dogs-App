import styles from'./DogCard.module.css'
import { useNavigate } from 'react-router-dom'

export default function DogCard (props){
    const id = props.id
    const navigate = useNavigate()
    const searchDetail = (id) => {
        navigate(`/BreedDetail/${id}`)
    }

    return (
    <div className={styles.mainDiv} onClick={() => searchDetail()}>
        <div className={styles.secondDiv}>
            <h2>{props.name}</h2>
            <img src={props.image} alt='Dog'/>
            <h4>{props.weight}</h4>
        </div>
    </div>
    )
}