import { combineReducers } from 'redux';
import {collectionReducer} from "./collection.reducer";

export const rootReducer = combineReducers({
    collectionReducer: collectionReducer
})
