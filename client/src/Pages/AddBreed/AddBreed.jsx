import styles from './AddBreed.module.css'
import NavBar from '../../Components/NavBar/NavBar.jsx'
import { getTemperaments } from "../../Redux/Actions"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'

export default function AddBreed (props){
    
    let temperaments = useSelector(state => state.temperaments)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTemperaments())
    }, [dispatch])
    
    const [ disabled, setDisabled ] = useState( true )
    const [ newBreed, setNewBreed ] = useState({name: '',
    imageUrl: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    lifeSpan: '',
    errors: {
        name: '',
        imageUrl: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        lifeSpan: ''
    },
    //disabled: true
  })
    console.log('newBreeds.errors', newBreed)
    // function onSelect(e){
    //     // let id_temperament = []
    //     // let value_temperament = []
    //     const temperament = e.target.value
    //     //let id = e.target.selectedIndex+1;
    //     // id_temperament.push(id)
    //     // value_temperament.push(temperament)
    //     setNewBreed({
    //         ...newBreed,
    //         //id_temperament : [...newBreed.id_temperament, id],
    //         value_temperament : [temperament]
    //     })
    // }
    //
    
    function handleChange(e) {
        const { name, value } = e.target;
        let errors = newBreed.errors;

        if( name === 'name') errors.name = value.length < 5 ? 'Nombre debe tener 5 caracteres' : '';
        if( name === 'imageUrl') errors.imageUrl = value.length < 5 ? 'Apellido debe tener 5 caracteres' : '';
        if( name === 'minHeight') errors.minHeight = value.length < 5 ? 'Apellido debe tener 5 caracteres' : '';
        if( name === 'maxHeight') errors.maxHeight = value.length < 5 ? 'Apellido debe tener 5 caracteres' : '';
        if( name === 'minWeight') errors.minWeight = value.length < 5 ? 'Apellido debe tener 5 caracteres' : '';
        if( name === 'maxWeight') errors.maxWeight = value.length < 5 ? 'Apellido debe tener 5 caracteres' : '';
        if( name === 'lifeSpan') errors.lifeSpan = value.length < 5 ? 'Apellido debe tener 5 caracteres' : '';
        setNewBreed({
            ...newBreed,
            [name]: value,
            errors
        });
        validarForm(errors)
    }
    
    function validarForm(errors) {
        let valid = true;

        Object.values(errors).forEach( resp => resp.length > 0 ? valid = false : valid = true);

        if(valid) setDisabled( false )
        else setDisabled( true )
    }

    function onSubmit(e){
        e.preventDefault()
        axios.post('http://localhost:3001/api/dog', newBreed)
        alert('Breed added successfully')
    }

    return (
    <div>
        <NavBar />
        <div className={styles.form}>
            <h3>Add a Breed:</h3>
            <form className={styles.form} onSubmit={onSubmit}>
                <input type="text" name='name' placeholder='Name' onChange={handleChange} value={newBreed.name} />
                {!newBreed.errors.name ? null : <div>{newBreed.errors.name}</div>}
                <input type="text" name='imageUrl' placeholder='Image Url' onChange={handleChange} value={newBreed.imageUrl} />
                {!newBreed.errors.imageUrl ? null : <div>{newBreed.errors.imageUrl}</div>}
                <input type="text" name='minHeight' placeholder='Minimum Height' onChange={handleChange} value={newBreed.minHeight} />
                {!newBreed.errors.minHeight ? null : <div>{newBreed.errors.minHeight}</div>}
                <input type="text" name='maxHeight' placeholder='Maximum Height' onChange={handleChange} value={newBreed.maxHeight} />
                {!newBreed.errors.maxHeight ? null : <div>{newBreed.errors.maxHeight}</div>}
                <input type="text" name='minWeight' placeholder='Minimum Weight' onChange={handleChange} value={newBreed.minWeight} />
                {!newBreed.errors.minWeight ? null : <div>{newBreed.errors.minWeight}</div>}
                <input type="text" name='maxWeight' placeholder='Maximun Weight' onChange={handleChange} value={newBreed.maxWeight} />
                {!newBreed.errors.maxWeight ? null : <div>{newBreed.errors.maxWeight}</div>}
                <input type="text" name='lifeSpan' placeholder='Life span' onChange={handleChange} value={newBreed.lifeSpan} />
                {!newBreed.errors.lifeSpan ? null : <div>{newBreed.errors.lifeSpan}</div>}
    
                {/* <div>
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
                {newBreed.value_temperament && newBreed.value_temperament.map( (el, idx) => <span key={idx}>{el}</span>)} */}
                <button type='submit' disabled={disabled} >Add Breed</button>
            </form>
        </div>
    </div>
    )
}