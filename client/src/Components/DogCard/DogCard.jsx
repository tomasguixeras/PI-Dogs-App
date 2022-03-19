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
            <h4>{`Weight: ${props.weight}Kg`}</h4>
            <div className={styles.temperaments}>
            {
                props.temperament ? props.temperament.map(temp => {
                    
                        return <div className={styles.temp}>{temp}</div>
                }) : ''
            }
            </div>
        </div>
    </div>
    )
}