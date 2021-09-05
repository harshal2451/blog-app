import {LOGOUT,LOGIN, FETCH_SUCCESS, FETCH_BLOG_SUCCESS, FETCH_ERROR, FETCH_BLOG_DETAIL, FETCH_REQUEST} from './actionType'

let ID = 0


const intialState = {
   
    loading: false,
    error: null,
    blogs: [],
    blogDetail: null
}

export const reducer = (state = intialState, action) => {
    switch(action.type){

        case FETCH_SUCCESS:
            return{
                ...state,
                loading: false,
                error:null
            }

        case LOGIN:
            localStorage.setItem("user",JSON.stringify(action.payload))
            return{
                ...state
            }
        case LOGOUT:
            localStorage.removeItem("user")
            return{
                ...state
            }

        case FETCH_BLOG_SUCCESS:
            return{
                ...state,
                blogs: action.payload,
                loading: false,
                error: null
            }

        case FETCH_BLOG_DETAIL:
                return{
                    ...state,
                    blogDetail: action.payload,
                    loading: false,
                    error: null
                }

        case FETCH_REQUEST:
            return{
                ...state,
                loading: true,
            }

        case FETCH_ERROR:
            return{
                ...state,
                error: action.payload,
                loading: false
            }

        
        default : return state
    }
}