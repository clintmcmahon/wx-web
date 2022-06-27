import { LOCATION_CHANGE } from '../constants';
import * as locationService from "../services/LocationService";

const initialState = {
    location: null
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                location: action.payload
            };
        default:
            return state;
    }
}

export default locationReducer;