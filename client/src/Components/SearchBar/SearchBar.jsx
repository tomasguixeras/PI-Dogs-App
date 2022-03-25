import FilterTemp from './FilterTemp'
import FilterOrigin from './FilterOrigin'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getBreedByName, sortAlpha, sortWeight } from '../../Redux/Actions'

import styles from './SearchBar.module.css'

export default function SearchBar(){
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()

    function onSubmit(e){
        e.preventDefault()
        dispatch(getBreedByName(search))
    }

    function onImputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
        dispatch(getBreedByName(search))
    }
    
    function onChange(e){
        let sort = e.target.value
        if(sort==="A-Z" || sort==="Z-A") dispatch(sortAlpha(sort))
        if(sort==="ascendent" || sort==="descendent") dispatch(sortWeight(sort))
    }
        
    return (
        <div className={styles.subNav}>
            <div>
                <form onSubmit={onSubmit} className={styles.searchBar}>
                    <input type='text' onChange={onImputChange} value={search}  className={styles.inputText} />
                    <input type='submit' value="Search" className={styles.submit} />
                </form>
            </div>
            <div className={styles.filters} >
            <div className={styles.sort}>
                <label htmlFor="filter" className={styles.labelSort} >Sort by:</label>
                <select name="filter" onChange={onChange} className={styles.selectSort} >
                    <optgroup label="By name:">
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                </optgroup>
                <optgroup label="By Weight">
                        <option value="ascendent">Ascendent</option>
                        <option value="descendent">Descendent</option>
                </optgroup>
                </select>
            </div>
                <FilterOrigin />
                <FilterTemp />
            </div>
        </div>

    )
}