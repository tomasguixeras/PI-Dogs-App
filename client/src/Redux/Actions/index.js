import axios from 'axios'
export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_BREED_DETAIL = "GET_BREED_DETAIL";
export const GET_BREED_BY_NAME = "GET_BREED_BY_NAME";
export const ADD_BREED = "ADD_BREED";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";

export function getAllBreeds(name){
    return function (dispatch){
        axios.get('http://localhost:3001/api/dogs')
        .then(data => {
            dispatch({
                type: GET_ALL_BREEDS,
                payload: data.data
            })
        })
    }
}
export function getBreedDetail(id){
    return function (dispatch){
        axios.get(`http://localhost:3001/api/dogs/${id}`)
        .then(data => {
            dispatch({
                type: GET_BREED_DETAIL,
                payload: data
            })
        })
    }
}
export function getBreedByName(name){
    return function (dispatch){
        axios.get(`http://localhost:3001/api/dogs?name=${name}`)
        .then(data => {
            dispatch({
                type: GET_ALL_BREEDS,
                payload: data.data
            })
        })
    }
}
export function getTemperaments(){
    return function (dispatch){
        axios.get('http://localhost:3001/api/temperament')
        .then( data => {
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: data
            })
        })
    }
}
export function addBreed(values){
    return function (){
        axios.post('')
    }
}