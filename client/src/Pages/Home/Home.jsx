import styles from './Home.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllBreeds } from '../../Redux/Actions'


import NavBar from '../../Components/NavBar/NavBar.jsx'
import Card from '../../Components/DogCard/DogCard.jsx'


export default function Home (){
    let breeds = useSelector(state => state.breeds)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllBreeds())
    }, [])
    return (
    <div>
        <NavBar />
        <div className={styles.subNav}>
            <div>
                <input type='text' />
                <button type='submit'>Search</button>
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
        <div className={styles.cards}>
            {breeds.map( e => (
                <Card 
                    key= {e.id}
                    image= {e.image}
                    name= {e.name}
                    weight= {e.weight}
             />) )}
        </div>

    </div>
    )
}