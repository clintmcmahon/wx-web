import { LOCATION_CHANGE } from '../constants';

export function changeLocation(location) {
    return {
        type: LOCATION_CHANGE,
        payload: location
    }
}