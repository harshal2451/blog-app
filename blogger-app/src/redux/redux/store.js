import {createStore} from 'redux'
import {adminReducer} from '../reducer'

const store = createStore(adminReducer)

export default store