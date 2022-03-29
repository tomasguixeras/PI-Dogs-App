import styles from'./Loading.module.css'
import image from './dog2.gif'

export default function Loading (){
    return (
    <div className={styles.mainDiv} >
        <div className={styles.secondaryDiv}>
            <img src={image} alt='Dog'/>
            <h2>Loading...</h2>
        </div>
    </div>
    )
}
