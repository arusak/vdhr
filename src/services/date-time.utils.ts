import { DateTime } from 'luxon';

export const getDefaultYear = () => {
    const today = DateTime.local();
    return today.month > 3 ? today.year : today.minus({ years: 1 }).year;
};
