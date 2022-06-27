import { createStore } from 'redux'
import locationReducer from '../reducers/locationReducer';

const store = createStore(locationReducer);

export default store;