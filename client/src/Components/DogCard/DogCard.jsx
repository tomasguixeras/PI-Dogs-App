import styles from'./DogCard.module.css'
import { useNavigate } from 'react-router-dom'

export default function DogCard (props){
    const navigate = useNavigate()
    const searchDetail = (id) => {
        navigate(`/BreedDetail/${id}`)
    }

    return (
    <div className={styles.mainDiv} onClick={() => searchDetail()}>
        <div className={styles.secondDiv}>
            <h2>{props.name}</h2>
            <img src={props.image} alt='Dog'/>
            <div className={styles.weight}>
                <h4>Weight: </h4>
                <h4>{props.weight}</h4>
                <h4>Kg</h4>
            </div>
        </div>
    </div>
    )
}