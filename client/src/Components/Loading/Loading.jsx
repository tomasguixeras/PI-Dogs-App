import styles from'./Loading.module.css'
import image from './dog2.gif'

export default function Error (){
    return (
    <div className={styles.mainDiv} >
        <div className={styles.secondaryDiv}>
            <img src={image} alt='Dog'/>
            <h2>Loading...</h2>
            {/* <h2>Breed Not Found</h2> */}
        </div>
    </div>
    )
}
