import styles from './AddBreed.module.css'
import NavBar from '../../Components/NavBar/NavBar.jsx'

export default function AddBreed (){
    return (
    <div>
        <NavBar />
        <div className={styles.form}>
            <h3>Add a Breed:</h3>
            <form className={styles.form} onSubmit={e=>e.preventDefault()}>
                <input type="text" name='name' placeholder='Name'/>
                <input type="text" name='imageUrl' placeholder='Image Url'/>
                <input type="text" name='minHeight' placeholder='Minimum Height'/>
                <input type="text" name='maxHeight' placeholder='Maximum Height'/>
                <input type="text" name='mivWeight' placeholder='Minimum Weight'/>
                <input type="text" name='maxWeight' placeholder='Maximun Weight'/>
                <input type="text" name='lifeSpan' placeholder='Life span'/>
                <button type='submit'>Add Breed</button>
            </form>
        </div>
    </div>)
}