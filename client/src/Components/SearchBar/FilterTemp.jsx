import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterByTemperament, getTemperaments } from "../../Redux/Actions/index.js"

import styles from './SearchBar.module.css'

export default function FilterByTemperament({setCurrentPage, setselectReload, selectReload}){
    let dispatch = useDispatch()
    
    let temperaments = useSelector(state => state.temperaments)
    useEffect(()=>{
        dispatch(getTemperaments())
    }, [dispatch])

    function onChange(e){
        let filter = e.target.value
        dispatch(filterByTemperament(filter))
        setCurrentPage(1)
        setselectReload(filter)
    }

    return (
        <div className={styles.filterT}>
            <label htmlFor="filter" className={styles.labelFilter} >Filter by Temperament:</label>
                <select name="filter" onChange={onChange} className={styles.selectFilter} value={selectReload}  >
                <option value="allTemperaments" >All Temperaments</option>
                    {
                        temperaments.data ?
                        temperaments.data.map((resp, idx)=>{
                            return <option value={resp.name}key={idx} >{resp.name}</option>
                        }) : ''
                    }
                </select>
        </div>
    )
}