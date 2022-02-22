import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

// reducers
import PlacesReducer from './reducers/places.reducer'
import AuthReducer from './reducers/auth.reducer'

const RootReducer = combineReducers({
    places: PlacesReducer,
    auth: AuthReducer,
})

export default createStore(RootReducer, applyMiddleware(thunk))

