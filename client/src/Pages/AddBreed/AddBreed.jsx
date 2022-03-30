import axios from 'axios'
import styles from './AddBreed.module.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getTemperaments } from "../../Redux/Actions"

import NavBar from '../../Components/NavBar/NavBar.jsx'

export default function AddBreed (){
    const navigate = useNavigate();
    let dispatch = useDispatch();

    let temperaments = useSelector(state => state.temperaments);
    useEffect(()=>{
        dispatch(getTemperaments())
    }, [dispatch])
    
    const [ disabled, setDisabled ] = useState( true )
    const [ newBreed, setNewBreed ] = useState(
        {name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        lifeSpan: '',
        temperament: [],
        errors: {
            name: '* The value must be a valid string.',
            minHeight: '* The value must be a number.',
            maxHeight: '* The value must be a number and greater than minimun height.',
            minWeight: '* The value must be a number.',
            maxWeight: '* The value must be a number and greater than minimun weight.',
            lifeSpan: '* The value must be a number.',
            temperament: '* At list one temperament is required.',
        },
    })
    // HandleChange function for text inputs
    function handleChange(e) {
        const { name, value } = e.target;
        let errors = newBreed.errors;

        if( name === 'name') {
            ( /^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(value.trim()) && isNaN(value) && value.trim().length > 0 ) ? delete errors.name : errors.name = '* The value must be a valid string.'
        }
        if( name === 'minHeight') {
            ( !isNaN(value) && value.trim().length > 0 ) ? delete errors.minHeight : errors.minHeight = '* The value must be a number.'
        }
        if( name === 'maxHeight') {
            ( !isNaN(value) && parseFloat(value) > parseFloat(newBreed.minHeight) && value.trim().length > 0 ) ? delete errors.maxHeight : errors.maxHeight = '* The value must be a number and greater than minimun height.'
        }
        if( name === 'minWeight') {
            ( !isNaN(value) && value.trim().length > 0 ) ? delete errors.minWeight : errors.minWeight = '* The value must be a number.'
        }
        if( name === 'maxWeight') {
            ( !isNaN(value) && parseFloat(value) > parseFloat(newBreed.minWeight) && value.trim().length > 0 ) ? delete errors.maxWeight : errors.maxWeight = '* The value must be a number and greater than minimun weight.'
        }
        if( name === 'lifeSpan') {
            ( !isNaN(value) && value.trim().length > 0 ) ? delete errors.lifeSpan : errors.lifeSpan = '* The value must be a number.'
        }
        
        setNewBreed({
            ...newBreed,
            [name]: value
        });
    }
    // onSelectChange --> function for select Temperament
    function onSelectChange(e){
        const { name, value } = e.target;
        let errors = newBreed.errors;
        const temperaments = newBreed.temperament
        
        !temperaments.includes(value) && temperaments.push(value)

        if( name === 'temperamentSelect') {
            if( newBreed.temperament.length > 0 ) delete errors.temperament
        }
        setNewBreed({
            ...newBreed,
            temperament: temperaments
        })
    }
    // Delete function for Temperament Select
    function deleteTemperament(e){
        const { name, value } = e.target
        setNewBreed( {
            ...newBreed,
            temperament: newBreed.temperament.filter( temp => temp !== value)
        } );
        if( name === 'deleteTemp') {
            if( newBreed.temperament.length < 1 ){
                newBreed.errors.temperament = 'At list one temperament is required.'
            } else delete newBreed.errors.temperament
        }
    }
    // useEffect where validation takes place
    useEffect(()=>{
        Object.keys(newBreed.errors).length > 0 ? setDisabled( true ) : setDisabled( false )
    }, [newBreed])
    // Submit function to add a new breed
    function onSubmit(e){
        e.preventDefault()
        axios.post('http://localhost:3001/api/dog', newBreed)
        alert('Breed added successfully')
        navigate('/home')
    }
    return (
    <div>
        <NavBar className={styles.navbar} />
        <div className={styles.mainDiv}>
        <div className={styles.mainForm}>
            <h3>Add a Breed:</h3>
            <form className={styles.form} onSubmit={onSubmit}>
                <input type="text" name='name' placeholder='Name' onChange={handleChange} value={newBreed.name} />
                    <div className={styles.errorMessage}>{newBreed.errors.name ? newBreed.errors.name : ''}</div>
                <input type="text" name='imageUrl' placeholder='Image Url' onChange={handleChange} value={newBreed.imageUrl} />
                    <div className={styles.errorMessage} >{newBreed.imageUrl ? "" : "Insert a valid image url of the breed."}</div>
                <input type="text" name='minHeight' placeholder='Minimum Height' onChange={handleChange} value={newBreed.minHeight} />
                    <div className={styles.errorMessage} >{newBreed.errors.minHeight ? newBreed.errors.minHeight : ''}</div>
                <input type="text" name='maxHeight' placeholder='Maximum Height' onChange={handleChange} value={newBreed.maxHeight} />
                    <div className={styles.errorMessage} >{newBreed.errors.maxHeight ? newBreed.errors.maxHeight : ''}</div>
                <input type="text" name='minWeight' placeholder='Minimum Weight' onChange={handleChange} value={newBreed.minWeight} />
                    <div className={styles.errorMessage} >{newBreed.errors.minWeight ? newBreed.errors.minWeight : ''}</div>
                <input type="text" name='maxWeight' placeholder='Maximun Weight' onChange={handleChange} value={newBreed.maxWeight} />
                    <div className={styles.errorMessage} >{newBreed.errors.maxWeight ? newBreed.errors.maxWeight : ''}</div>
                <input type="text" name='lifeSpan' placeholder='Life span' onChange={handleChange} value={newBreed.lifeSpan} />
                    <div className={styles.errorMessage} >{newBreed.errors.lifeSpan ? newBreed.errors.lifeSpan : ''}</div>
                <div className={styles.labelInput} >
                    <label htmlFor="filter" className={styles.labelTemp}>Choose Breed Temperaments:</label>
                    <select name="temperamentSelect" onChange={onSelectChange} className={styles.selectTemp} >
                        {
                            temperaments.data &&
                            temperaments.data.map( resp => {
                                return <option id={resp.id} value={resp.name} key={resp.id} >{resp.name}</option>
                            })
                        }
                    </select>
                    <div className={styles.errorMessage}>{newBreed.errors.temperament ? newBreed.errors.temperament : ''}</div>
                </div>
                <div className={styles.selected} >
                    {newBreed.temperament && newBreed.temperament.map( (el, idx) => (
                    <div className={styles.selDiv} key={idx} >
                        <span >{el}</span>
                        <button type='button' onClick={deleteTemperament} className={styles.deleteTemp} name='deleteTemp' value={el} >X</button>
                    </div>))}
                </div>
                <button type='submit' disabled={disabled} className={styles.submit}>Add Breed</button>
            </form>
        </div>
        </div>
    </div>
    )
}