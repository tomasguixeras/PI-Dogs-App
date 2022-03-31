import FilterTemp from './FilterTemp'
import FilterOrigin from './FilterOrigin'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getBreedByName, sortAlpha, sortWeight } from '../../Redux/Actions'

import styles from './SearchBar.module.css'

export default function SearchBar({setCurrentPage, setselectReload, selectReload}){
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
        
    function onChange(e){
        let sort = e.target.value
        if(sort==="A-Z" || sort==="Z-A") dispatch(sortAlpha(sort))
        if(sort==="ascendent" || sort==="descendent") dispatch(sortWeight(sort))
        setselectReload(sort)
    }
        
    return (
        <div className={styles.subNav}>
            <div>
                <form onSubmit={onSubmit} className={styles.searchBar}>
                    <input type='text' onChange={ onImputChange } value={search}  className={styles.inputText} placeholder="Search by breeds name..." />
                    <input type='submit' value="Search" className={styles.submit} />
                </form>
            </div>
            <div className={styles.filters} >
            <div className={styles.sort}>
                <label htmlFor="filter" className={styles.labelSort} >Sort by:</label>
                <select name="filter" onChange={onChange} className={styles.selectSort} value={selectReload.sort} >
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
                <FilterOrigin setCurrentPage={setCurrentPage} setselectReload={setselectReload} selectReload={selectReload}/>
                <FilterTemp setCurrentPage={setCurrentPage} setselectReload={setselectReload} selectReload={selectReload}/>
            </div>
        </div>

    )
}