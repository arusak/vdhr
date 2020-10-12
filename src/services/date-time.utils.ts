import {DateTime} from 'luxon';

export const getDefaultYear = () => {
    const today = DateTime.local();
    if (today.month <= 3) {
        return today.minus({years: 1}).year;
    }
    return today.year;
};
