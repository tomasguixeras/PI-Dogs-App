import styles from './AddBreed.module.css'
import NavBar from '../../Components/NavBar/NavBar.jsx'
import { getTemperaments } from "../../Redux/Actions"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddBreed (){
    const navigate = useNavigate();
    let temperaments = useSelector(state => state.temperaments)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTemperaments())
    }, [dispatch])
    
    const [ disabled, setDisabled ] = useState( true )
    const [ newBreed, setNewBreed ] = useState(
        {name: '',
        imageUrl: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        lifeSpan: '',
        temperament: [],
        errors: {
            name: '',
            minHeight: '',
            maxHeight: '',
            minWeight: '',
            maxWeight: '',
            lifeSpan: '',
            temperament: '',
        },
    })
    
    function handleChange(e) {
        const { name, value } = e.target;
        let errors = newBreed.errors;

        if( name === 'name') {
            if( !isNaN(value) || value.trim().length === 0 ){
                errors.name = 'The value must be a valid string.'
            } else delete errors.name
        }
        if( name === 'minHeight') {
            if(isNaN(parseInt(value))){
                errors.minHeight = 'The value must be a number.'
            } else delete errors.minHeight
        }
        if( name === 'maxHeight') {
            if( isNaN(parseInt(value)) || parseFloat(value) <= parseFloat(newBreed.minHeight) ){
                errors.maxHeight = 'The value must be a number and greater than minimun height'
            } else delete errors.maxHeight
        }
        if( name === 'minWeight') {
            if(isNaN(parseInt(value))){
                errors.minWeight = 'The value must be a number'
            } else delete errors.minWeight
        }
        if( name === 'maxWeight') {
            if( isNaN(parseInt(value)) || parseFloat(value) <= parseFloat(newBreed.minWeight) ){
                errors.maxWeight = 'The value must be a number and greater than minimun weight'
            } else delete errors.maxWeight
        }
        if( name === 'lifeSpan') {
            if(isNaN(parseInt(value))){
                errors.lifeSpan = 'The value must be a number'
            } else delete errors.lifeSpan
        }
        
        setNewBreed({
            ...newBreed,
            [name]: value
        });
        validation();
        // Object.keys(errors).length > 0 ? setDisabled( true ) : setDisabled( false )
    }
    function deleteTemperament(e){
        const { name, value } = e.target
        setNewBreed( {
            ...newBreed,
            temperament: newBreed.temperament.filter( temp => temp !== value)
        } );
        // if( name === 'deleteTemp') {
        //     if( newBreed.temperament.length < 1 ){
        //         newBreed.errors.temperament = 'At list one temperament is required.'
        //     } else delete newBreed.errors.temperament
        // }
        validation();
        //newBreed.temperament.length === 0 && setNewBreed( newBreed.errors.temperament = 'At list one temperament is required.' )
    }
    useEffect(()=>{
        if( newBreed.temperament.length < 1 ){
            newBreed.errors.temperament = 'At list one temperament is required.'
        } else delete newBreed.errors.temperament
        validation();
    }, [newBreed, validation])
    function onSelectChange(e){
        const { name, value } = e.target;
        let errors = newBreed.errors;
        const temperaments = newBreed.temperament
        temperaments.push(value);

        if( name === 'temperamentSelect') {
            if( newBreed.temperament.length < 1 ){
                errors.temperament = 'At list one temperament is required.'
            } else delete errors.temperament
        }
        setNewBreed({
            ...newBreed,
            temperament: temperaments
        })
        validation();
        //Object.keys(errors).length > 0 ? setDisabled( true ) : setDisabled( false )
    }
    function validation (){
        Object.keys(newBreed.errors).length > 0 ? setDisabled( true ) : setDisabled( false )
        console.log("newBreed --> ", newBreed)
    }
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
                    <div>{newBreed.errors.name ? newBreed.errors.name : ''}</div>
                <input type="text" name='imageUrl' placeholder='Image Url' onChange={handleChange} value={newBreed.imageUrl} />
                    {/* <div>{newBreed.errors.imageUrl ? newBreed.errors.imageUrl : ''}</div> */}
                <input type="text" name='minHeight' placeholder='Minimum Height' onChange={handleChange} value={newBreed.minHeight} />
                    <div>{newBreed.errors.minHeight ? newBreed.errors.minHeight : ''}</div>
                <input type="text" name='maxHeight' placeholder='Maximum Height' onChange={handleChange} value={newBreed.maxHeight} />
                    <div>{newBreed.errors.maxHeight ? newBreed.errors.maxHeight : ''}</div>
                <input type="text" name='minWeight' placeholder='Minimum Weight' onChange={handleChange} value={newBreed.minWeight} />
                    <div>{newBreed.errors.minWeight ? newBreed.errors.minWeight : ''}</div>
                <input type="text" name='maxWeight' placeholder='Maximun Weight' onChange={handleChange} value={newBreed.maxWeight} />
                    <div>{newBreed.errors.maxWeight ? newBreed.errors.maxWeight : ''}</div>
                <input type="text" name='lifeSpan' placeholder='Life span' onChange={handleChange} value={newBreed.lifeSpan} />
                    <div>{newBreed.errors.lifeSpan ? newBreed.errors.lifeSpan : ''}</div>
                <div className={styles.labelInput} >
                    <label htmlFor="filter" className={styles.labelTemp}>Choose Breed Temperaments:</label>
                    <select name="temperamentSelect" onChange={onSelectChange} className={styles.selectTemp} >
                        {
                            temperaments.data ?
                            temperaments.data.map((resp, idx)=>{
                                return <option id={resp.id} value={resp.name} key={resp.id} >{resp.name}</option>
                            }) : ''
                        }
                    </select>
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