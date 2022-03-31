import styles from'./NotFound.module.css'
import image from './NotFoundDog.png'

export default function NotFound({message}) {
    return (
    <div className={styles.mainDiv} >
        <div className={styles.secondaryDiv}>
            <img src={image} alt='Dog'/>
            <h2>{`${message} Not Found...`}</h2>
        </div>
    </div>
    )
}