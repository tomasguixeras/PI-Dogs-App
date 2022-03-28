import styles from'./NotFound.module.css'
import image from './NotFoundDog.png'

export default function NotFound(){
    return (
    <div className={styles.mainDiv} >
        <div className={styles.secondaryDiv}>
            <img src={image} alt='Dog'/>
            <h2>Breed Not Found...</h2>
        </div>
    </div>
    )
}