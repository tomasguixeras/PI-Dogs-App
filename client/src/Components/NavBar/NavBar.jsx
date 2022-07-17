import styles from './NavBar.module.css'
import Logo from './HenryDog.png'
import SearchBar from '../SearchBar/SearchBar.jsx'

import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getAllBreeds } from '../../Redux/Actions'

export default function NavBar ({setselectReload, setCurrentPage, selectReload, home}){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function onPawClick(e){
        e.preventDefault()
        navigate('/home');
        dispatch(getAllBreeds())
        setselectReload && setselectReload({
            filterTemp: 'allTemperaments',
            filterOrigin: 'all',
            sort: 'A-Z'
        })
    }
    return (
    <div className={styles.mainDiv}>
        <img src={Logo} alt='HenryDog logo' className={styles.logo} onClick={onPawClick} />
        {home && <SearchBar setCurrentPage={setCurrentPage} setselectReload={setselectReload} selectReload={selectReload}/>}
        <Link to='/AddBreed' className={styles.addBreed} >Add a Breed</Link>
    </div>
    )
}