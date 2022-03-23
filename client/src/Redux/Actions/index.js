import axios from 'axios'
export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_BREED_DETAIL = "GET_BREED_DETAIL";
export const GET_BREED_BY_NAME = "GET_BREED_BY_NAME";
export const ADD_BREED = "ADD_BREED";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const SORT_ALPHA = "SORT_ALPHA";
export const SORT_WEIGHT = "SORT_WEIGHT"
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";

export function getAllBreeds(){
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
        axios.post('http://localhost:3001/api/dog', values)
    }
}
export function sortAlpha(alphabeticalOrder){
    return{
        type: SORT_ALPHA,
        payload: alphabeticalOrder
    }
}
export function sortWeight(numericalOrder){
    return{
        type: SORT_WEIGHT,
        payload: numericalOrder
    }
}
export function filterByOrigin(originFilter){
    return{
        type: FILTER_BY_ORIGIN,
        payload: originFilter
    }
}
export function filterByTemperament(TemperamentFilter){
    return{
        type: FILTER_BY_TEMPERAMENT,
        payload: TemperamentFilter
    }
}