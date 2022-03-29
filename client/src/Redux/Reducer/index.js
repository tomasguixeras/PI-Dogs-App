import { GET_ALL_BREEDS, 
    GET_BREED_DETAIL,
    GET_BREED_BY_NAME,
    GET_TEMPERAMENTS, 
    SORT_ALPHA, 
    SORT_WEIGHT, 
    FILTER_BY_ORIGIN, 
    FILTER_BY_TEMPERAMENT, 
    LOADING } from '../Actions/index.js'

const initialState = {
    breeds: [],
    filteredBreeds: [],
    breedDetail: {},
    temperaments: [],
    loading: false,
}

export default function rootReducer( state = initialState, action ){
    switch(action.type){
        case GET_ALL_BREEDS:
            return { 
                ...state, 
                breeds: action.payload,
                filteredBreeds: action.payload,
                loading: false
            };
        case SORT_ALPHA:
            let orderedByName = [...state.filteredBreeds]
            orderedByName.sort((a,b) => {
                if( a.name.toLowerCase() < b.name.toLowerCase() ) return action.payload === "A-Z" ? -1 : 1
                if( a.name.toLowerCase() > b.name.toLowerCase() ) return action.payload === "A-Z" ? 1 : -1
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
            let filterOrigin = [...state.filteredBreeds]
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
            if(action.payload === "allTemperaments") filterTemperament = [...state.breeds]
            else filterTemperament = filterTemperament.filter(dog => dog.temperament ? dog.temperament.includes(action.payload) : '')
            return {
                ...state,
                filteredBreeds: filterTemperament
            }
        case GET_BREED_DETAIL:
            return { 
                ...state, 
                breedDetail: action.payload,
                loading: false
            };
        case GET_BREED_BY_NAME:
            return {
                ...state, 
                filteredBreeds: action.payload,
                loading: false
            };
        case GET_TEMPERAMENTS:
            return {
                ...state, 
                temperaments: action.payload
            }
        case LOADING:
            return {
                ...state, 
                loading: true
            }
        default:
            return state
    }
}