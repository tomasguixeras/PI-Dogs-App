import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './SearchBar.module.css'
import { getBreedByName } from '../../Redux/Actions'



export default function SearchBar ({setCurrentPage, setselectReload, selectReload}){
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()

    function onSubmit(e){
        e.preventDefault()
        dispatch(getBreedByName(search))
    }

    function onImputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
    }
    useEffect(() => {
        dispatch(getBreedByName(search))
        setCurrentPage(1)
    }, [dispatch, search, setCurrentPage])

    
    return (
    <div>
        <form onSubmit={onSubmit} className={styles.searchBar}>
            <input type='text' onChange={ onImputChange } value={search}  className={styles.inputText} placeholder="Search by breeds name..." />
            <input type='submit' value="Search" className={styles.submit} />
        </form>
    </div>
    )
}

