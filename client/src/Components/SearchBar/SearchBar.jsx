import styles from './SearchBar.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getBreedByName } from '../../Redux/Actions'

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
    }

    return (
        <div className={styles.subNav}>
            <div>
                <form onSubmit={onSubmit}>
                    <input type='text' onChange={onImputChange} value={search} />
                    <input type='submit' value="Search" />
                </form>
            </div>
            <div>
                <label for="filter">Filtrar:</label>
                <select name="filter">
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
        </div>

    )
}