import { LOCATION_CHANGE, DATE_CHANGE, MONTH_CHANGE } from '../constants';

export function changeLocation(location) {
    return {
        type: LOCATION_CHANGE,
        payload: location
    }
}

export function changeDate(date) {
    return {
        type: DATE_CHANGE,
        payload: date
    }
}

export function changeMonth(month) {
    return {
        type: MONTH_CHANGE,
        payload: month
    }
}