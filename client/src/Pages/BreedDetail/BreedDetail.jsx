import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import styles from './BreedDetail.module.css'
import defaultImage from './defaultImage.png'
import { getBreedDetail } from '../../Redux/Actions'

import NavBar from '../../Components/NavBar/NavBar.jsx'
import Loading from '../../Components/Loading/Loading.jsx'
import NotFound from '../../Components/NotFound/NotFound.jsx'

export default function BreedDetail (){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let { id } = useParams()

    let loading = useSelector(state => state.loading)
    let breed = useSelector(state => state.breedDetail.data)
    
    useEffect(()=>{
        dispatch(getBreedDetail(id))
    }, [dispatch, id] )

    let idExists;
    if(breed) breed.name ? idExists = true : idExists = false
    return (
    <div className={styles.mainContainer}>
        <NavBar />
        <div className={styles.container}>
        {
            loading ? <Loading /> :(
                idExists ? 
            <div className={styles.mainDiv}>
                <div className={styles.leftDiv}>
                    <h2 className={styles.name} >{breed.name}</h2>
                    <img src={breed.image} alt='Dog' className={styles.image} onError={(e)=>{
                                                                    e.target.onerror = null
                                                                    e.target.src = defaultImage}} />
                </div>
                <div className={styles.rightDiv}>
                    <div className={styles.rightTopDiv}>
                        <div className={styles.weight}>
                            <h4>Weight:</h4>
                            <span>{`${breed.weight} Kg.`}</span>
                        </div>
                        <div className={styles.height} >
                            <h4>Height:</h4>
                            <span>{`${breed.height} Cm.`}</span>
                        </div>                    
                        <div className={styles.lifeSpan2}>
                            <h4>Life Span:</h4>
                            <span>{`${breed.lifeSpan} years.`}</span>
                        </div>
                    </div>
                    <div className={styles.fullTemp} >
                    <h4>Temperaments:</h4>
                    <div className={styles.temperaments} >
                    {
                        breed.temperaments && breed.temperaments.map((temp, idx) => {
                            return <div key={idx} className={styles.temp} >{temp}</div>
                        })
                    }
                    </div>
                    </div>
                    <div className={styles.backButtonDiv}>
                        <button type='button' onClick={() => navigate('/home')} className={styles.backHome} >Back</button>
                    </div>
                </div>
            </div> : <NotFound message="Breed"/> )
            
        }
        </div>
    </div>
    )
}