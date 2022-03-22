import styles from './AddBreed.module.css'
import NavBar from '../../Components/NavBar/NavBar.jsx'
import { getTemperaments } from "../../Redux/Actions"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'

export default function AddBreed (){
    
    let temperaments = useSelector(state => state.temperaments)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTemperaments())
    }, [dispatch])
    
    
    const [ newBreed, setNewBreed ] = useState({})
    
    function onSelect(e){
        // let id_temperament = []
        // let value_temperament = []
        const temperament = e.target.value
        //let id = e.target.selectedIndex+1;
        // id_temperament.push(id)
        // value_temperament.push(temperament)
        setNewBreed({
            ...newBreed,
            //id_temperament : [...newBreed.id_temperament, id],
            value_temperament : [temperament]
        })
    }

    function onImputChange(e){
        e.preventDefault()
        setNewBreed({
            ...newBreed,
            [e.target.name] : e.target.value
        })
    }

    function onSubmit(e){
        e.preventDefault()
        axios.post('http://localhost:3001/api/dog', newBreed)
    }
    return (
    <div>
        <NavBar />
        <div className={styles.form}>
            <h3>Add a Breed:</h3>
            <form className={styles.form} onSubmit={onSubmit}>
                <input type="text" name='name' placeholder='Name' onChange={onImputChange} />
                <input type="text" name='imageUrl' placeholder='Image Url' onChange={onImputChange} />
                <input type="text" name='minHeight' placeholder='Minimum Height' onChange={onImputChange} />
                <input type="text" name='maxHeight' placeholder='Maximum Height' onChange={onImputChange} />
                <input type="text" name='minWeight' placeholder='Minimum Weight' onChange={onImputChange} />
                <input type="text" name='maxWeight' placeholder='Maximun Weight' onChange={onImputChange} />
                <input type="text" name='lifeSpan' placeholder='Life span' onChange={onImputChange} />
    
                <div>
                    <label htmlFor="filter">Filter by:</label>
                    <select name="filter" onChange={onSelect} >
                        {
                            temperaments.data ?
                            temperaments.data.map((resp, idx)=>{
                                //return console.log(resp.id)
                                return <option id={resp.id} value={resp.name} key={resp.id} >{resp.name}</option>
                            }) : ''
                        }
                    </select>
                </div>
                {newBreed.value_temperament && newBreed.value_temperament.map( (el, idx) => <span key={idx}>{el}</span>)}
                <button type='submit'>Add Breed</button>
            </form>
        </div>
    </div>
    )
}