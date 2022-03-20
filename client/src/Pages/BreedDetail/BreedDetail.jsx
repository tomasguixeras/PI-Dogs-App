import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'




export default function BreedDetail (){
    const [breed, setBreed ] = useState()
    let { id } = useParams()
    
    useEffect(() => {
        axios.get(`http://localhost:3001/api/dogs/${id}`)
        .then((dog) => {
            setBreed(dog.data)
            console.log(dog)
        })
    }, [id])
    return (
    <div>
        {
            breed ?
            <div>
                <h2>{breed.name}</h2>
                <img src={breed.image} alt='Dog'/>
                <h4>{`Weight: ${breed.weight}Kg`}</h4>
                <div>
                {
                    breed.temperament && breed.temperament.map((temp, idx) => {
                        return <div key={idx}>{temp}</div>
                    })
                }
                </div>
            </div> : 
            <h3>Loading...</h3>
        }
    </div>
    )
}