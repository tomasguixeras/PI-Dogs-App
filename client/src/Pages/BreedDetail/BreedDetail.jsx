import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './BreedDetail.module.css'

import NavBar from '../../Components/NavBar/NavBar.jsx'
import Loading from '../../Components/Loading/Loading.jsx'

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
        <div className={styles.container}>
        {
            breed ?
            <div className={styles.mainDiv}>
                <div className={styles.leftDiv}>
                    <h2 className={styles.name} >{breed.name}</h2>
                    <img src={breed.image} alt='Dog' className={styles.image} />
                </div>
                <div className={styles.rightDiv}>
                    <div className={styles.rightTopDiv}>
                        <div className={styles.weight}>
                            <h4>Weight:</h4>
                            <span>{`${breed.weight} Kg`}</span>
                        </div>
                        <div className={styles.height} >
                            <h4>Height:</h4>
                            <span>{`${breed.height} Cm`}</span>
                        </div>
                    </div>
                    <div className={styles.lifeSpan1}>
                        <div className={styles.lifeSpan2}>
                            <h4>Life Span:</h4>
                            <span>{`${breed.lifeSpan}`}</span>
                        </div>
                    </div>
                    <div className={styles.fullTemp} >
                    <h4>Temperaments:</h4>
                    <div className={styles.temperaments} >
                    {console.log(breed)}
                    {
                        breed.temperaments && breed.temperaments.map((temp, idx) => {
                            return <div key={idx} className={styles.temp} >{temp}</div>
                        })
                    }
                    </div>
                    </div>
                </div>
            </div> : 
            <Loading />
        }
        </div>
    </div>
    )
}