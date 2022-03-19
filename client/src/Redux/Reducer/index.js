import { GET_ALL_BREEDS, GET_BREED_DETAIL,GET_BREED_BY_NAME , ADD_BREED, GET_TEMPERAMENTS, SORT_ALPHA, SORT_WEIGHT } from '../Actions/index.js'

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