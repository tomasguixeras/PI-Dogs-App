import FilterTemp from './FilterTemp'
import FilterOrigin from './FilterOrigin'
import { useDispatch } from 'react-redux'
import { sortAlpha, sortWeight } from '../../Redux/Actions'

import styles from './SearchBar.module.css'

export default function SearchBar({setCurrentPage, setselectReload, selectReload}){
    const dispatch = useDispatch()
    function onChange(e){
        let sort = e.target.value
        if(sort==="A-Z" || sort==="Z-A") dispatch(sortAlpha(sort))
        if(sort==="ascendent" || sort==="descendent") dispatch(sortWeight(sort))
        setselectReload(sort)
    }
        
    return (
        <div className={styles.subNav}>
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