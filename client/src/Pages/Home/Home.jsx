import styles from './Home.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllBreeds } from '../../Redux/Actions'


import NavBar from '../../Components/NavBar/NavBar.jsx'
import SearchBar from '../../Components/SearchBar/SearchBar.jsx'
import Card from '../../Components/DogCard/DogCard.jsx'


export default function Home (){
    let breeds = useSelector(state => state.filteredBreeds)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllBreeds())
    }, [dispatch])
    return (
    <div>
        <NavBar />
        <SearchBar />
        <div className={styles.cards}>
                {breeds.map( e => (
                    <Card 
                        key= {e.id}
                        id= {e.id}
                        image= {e.image}
                        name= {e.name}
                        weight= {e.weight}
                        temperament= {e.temperament}
                />) )}
        </div>

    </div>
    )
}