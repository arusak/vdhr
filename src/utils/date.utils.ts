import parse from 'date-fns/parse';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';
import isValid from 'date-fns/isValid';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';

export const parseDate = (raw: string, formatString: string) =>
    parse(raw, formatString, new Date());

export const parseApiDate = (raw: string) => parseDate(raw, 'dd.MM.yyyy');

export const parseArchiveDate = (raw: string) => parseDate(raw, 'yyyy-MM-dd');

export const formatDate = (date: Date, formatString: string) =>
    format(date, formatString, { locale: ru });

export const isValidDate = (
    date: Date,
    [startYear, endYear]: [number, number],
) => {
    return (
        isValid(date) &&
        date.getFullYear() >= startYear &&
        date.getFullYear() <= endYear
    );
};

export const diffDates = (d1: Date, d2: Date) =>
    differenceInMilliseconds(d1, d2);

export const getDefaultYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const defaultYear = month > 2 ? year : year - 1;
    return defaultYear.toString();
};
