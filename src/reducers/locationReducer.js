import { LOCATION_CHANGE, DATE_CHANGE, MONTH_CHANGE } from '../constants';

const initialState = {
    location: null,
    date: new Date(),
    month: ""
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                location: action.payload
            };
        case DATE_CHANGE:
            return {
                ...state,
                date: action.payload
            };
        case MONTH_CHANGE:
            return {
                ...state,
                month: action.payload
            };
        default:
            return state;
    }
}

export default locationReducer;