import { GET_ALL_BREEDS, GET_BREED_DETAIL,GET_BREED_BY_NAME , ADD_BREED, GET_TEMPERAMENTS, SORT_ALPHA, SORT_WEIGHT, FILTER_BY_ORIGIN, FILTER_BY_TEMPERAMENT } from '../Actions/index.js'

const initialState = {
    breeds: [],
    filteredBreeds: [],
    breedDetail: {},
    temperaments: []
}

export default function rootReducer( state = initialState, action ){
    switch(action.type){
        case GET_ALL_BREEDS:
            return { 
                ...state, 
                breeds: action.payload,
                filteredBreeds: action.payload
            };
        //
        case SORT_ALPHA:
            let orderedByName = [...state.filteredBreeds]
            orderedByName.sort((a,b) => {
                if(a.name<b.name) return action.payload === "A-Z" ? -1 : 1
                if(a.name>b.name) return action.payload === "A-Z" ? 1 : -1
                return 0
            })
            return{
                ...state,
                filteredBreeds: orderedByName
            }
        case SORT_WEIGHT:
            let orderedByWeight = [...state.filteredBreeds]
            orderedByWeight = orderedByWeight.sort((a, b) => {
                if(a.weight<b.weight) return action.payload === "ascendent" ? -1 : 1;
                if(a.weight>b.weight) return action.payload === "ascendent" ? 1 : -1;
                return 0;
            });
            
            return{
                ...state,
                filteredBreeds: orderedByWeight
            };
        case FILTER_BY_ORIGIN:
            let filterOrigin = [...state.breeds]
            let fromDB = filterOrigin.filter( el => typeof el.id === 'string')
            let fromAPI = filterOrigin.filter( el => typeof el.id === 'number')
            if(action.payload === "existing") filterOrigin = fromAPI;
            if(action.payload === "created") filterOrigin = fromDB;
            if(action.payload === "all") filterOrigin = [...state.breeds]
            return {
                ...state,
                filteredBreeds: filterOrigin
            }
        case FILTER_BY_TEMPERAMENT:
            let filterTemperament = [...state.breeds]
            filterTemperament = filterTemperament.filter(dog => dog.temperament ? dog.temperament.includes(action.payload) : '')
            return {
                ...state,
                filteredBreeds: filterTemperament
            }
        //
        case GET_BREED_DETAIL:
            return { 
                ...state, 
                breedDetail: action.payload 
            };
        case GET_BREED_BY_NAME:
            return {
                ...state, 
                breeds: action.payload
            };
        case GET_TEMPERAMENTS:
            return {
                ...state, 
                temperaments: action.payload
            }
        case ADD_BREED:
            return {
                ...state, 
                breeds: [...state.houses, action.payload]
            }; // MUCHAS DUDAS!!
        default:
            return state
    }
}