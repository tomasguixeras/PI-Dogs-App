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
    console.log(breeds)
    return <div>
        <NavBar />
        <div>
            <div>
                <input type='text' />
                <button type='submit'>Search</button>
            </div>
            <select />
        </div>
        {breeds.map( e => (
            <Card 
                key= {e.id}
                image= {e.image}
                name= {e.name}
                weight= {e.weight}
            />) )}

    </div>
}