import styles from './NavBar.module.css'
import { Link } from 'react-router-dom'

export default function NavBar (){
    return (
    <div className={styles.mainDiv}>
        <Link to="/home">Henry Dog</Link>
        <Link to='/AddBreed'>Agrega una raza</Link>
    </div>
    )
}