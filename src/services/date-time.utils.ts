import { DateTime } from 'luxon';

export const getDefaultYear = () => {
    const today = DateTime.local();
    const defaultYear = today.month > 3 ? today.year : today.minus({ years: 1 }).year;
    return defaultYear.toString();
};
