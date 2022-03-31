import styles from './NavBar.module.css'

import { useNavigate, Link } from 'react-router-dom'

import Logo from './HenryDog.png'

export default function NavBar (){
    const navigate = useNavigate()
    
    return (
    <div className={styles.mainDiv}>
        <img src={Logo} alt='HenryDog logo' className={styles.logo} onClick={() => navigate('/home')}/>
        <Link to='/AddBreed' className={styles.addBreed} >Add a Breed</Link>
    </div>
    )
}