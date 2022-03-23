import styles from './Home.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
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

    const items_per_page = 9
    const [ items, setItems ] = useState([...breeds].splice(0, items_per_page))
    const [ currentPage, setCurrentPage ] = useState(0);
    console.log(breeds)
    
    function onPreviousPage(e){
        const prevPage = currentPage - 1
        if(prevPage < 0) return
        const firstIndex = prevPage * items_per_page

        setItems([...breeds].splice(firstIndex, items_per_page))
        setCurrentPage(prevPage)
    }
    function onNextPage(e){
        const totalElements = breeds.length
        const nextPage = currentPage + 1
        const firstIndex = nextPage * items_per_page

        if( firstIndex === totalElements ) return

        setItems([...breeds].splice(firstIndex, items_per_page))
        setCurrentPage(nextPage)

    }
    return (
    <div>
        <NavBar />
        <SearchBar />
        <div className={styles.cards}>
                {items ? items.map( e => (
                    <Card 
                        key= {e.id}
                        id= {e.id}
                        image= {e.image}
                        name= {e.name}
                        weight= {e.weight}
                        temperament= {e.temperament}
                />) ) : ''}
        </div>
        <div>
            <button onClick={onPreviousPage}>Previous</button>
            <button onClick={onNextPage}>Next</button>
        </div>

    </div>
    )
}