import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './BreedDetail.module.css'

import NavBar from '../../Components/NavBar/NavBar.jsx'


export default function BreedDetail (){
    const [breed, setBreed ] = useState()
    let { id } = useParams()
    
    useEffect(() => {
        axios.get(`http://localhost:3001/api/dogs/${id}`)
        .then((dog) => {
            setBreed(dog.data)
        })
    }, [id])
    return (
    <div>
        <NavBar />
        {
            breed ?
            <div className={styles.mainDiv}>
                <div className={styles.leftDiv}>
                    <h2>{breed.name}</h2>
                    <img src={breed.image} alt='Dog'/>
                </div>
                <div className={styles.rightDiv}>
                    <h4>{`Weight: ${breed.weight} Kg`}</h4>
                    <h4>{`Height: ${breed.height} Cm`}</h4>
                    <h4>{`Life Span: ${breed.lifeSpan}`}</h4>
                    <div>
                    <h4>Temperaments:</h4>
                    {console.log(breed)}
                    {
                        breed.temperaments && breed.temperaments.map((temp, idx) => {
                            return <div key={idx}>{temp}</div>
                        })
                    }
                    </div>
                </div>
            </div> : 
            <h3>Loading...</h3>
        }
    </div>
    )
}