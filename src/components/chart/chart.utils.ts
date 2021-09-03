const colors: { [index: string]: string } = {
    '2014': '#9BC53D',
    '2015': '#C3423F',
    '2016': '#404E4D',
    '2017': '#9BC53D',
    '2018': '#19535F',
    '2019': '#0B7A75',
    '2020': '#7B2D26',
    '2021': '#F1D302',
    '2022': '#9BC53D',
    '2023': '#9BC53D',
    '2024': '#9BC53D',
};

const labelCache: Map<any, string> = new Map();

export const labelFormatter = (v: any) => {
    let res = labelCache.get(v);
    if (!res) {
        try {
            const [dd, mm] = v.split('.').map(Number);
            const date = new Date(2020, mm - 1, dd);
            res = date.toLocaleString('ru-RU', { month: 'long', day: 'numeric' });
        } catch (e) {
            res = '';
        }
        labelCache.set(v, res);
    }
    return res;
};

export const getYearColor = (year: string) => colors[year] || '#000000';

export const getTimelineTicks =
    () => Array(12).fill(1).map((_, idx) => '01.' + Number(idx + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 }));
