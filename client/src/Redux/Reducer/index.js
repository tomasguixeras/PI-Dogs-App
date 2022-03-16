import { GET_ALL_BREEDS,GET_BREED_DETAIL, ADD_BREED } from '../Actions/index.js'

const initialState = {
    breeds: [],
    breedDetail: {}
}

export default function rootReducer( state = initialState, action ){
    switch(action.type){
        case GET_ALL_BREEDS:
            return { ...state, breeds: action.payload };
        case GET_BREED_DETAIL:
            return { ...state, breedDetail: action.payload };
        case ADD_BREED:
            return {...state, breeds: [...state.houses, action.payload]}; // MUCHAS DUDAS!!
        default:
            return state
    }
}