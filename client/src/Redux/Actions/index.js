import axios from 'axios'
export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_BREED_DETAIL = "GET_BREED_DETAIL";
export const ADD_BREED = "ADD_BREED";

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
export function addBreed(values){
    return function (){
        axios.post('')
    }
}