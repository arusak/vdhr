const colors: { [index: string]: string } = {
    '2014': '#9BC53D',
    '2015': '#C3423F',
    '2016': '#0D2866',
    '2017': '#8A2691',
    '2018': '#19535F',
    '2019': '#7B2D26',
    '2020': '#3B7A0B',
    '2021': '#F1D302',
    '2022': '#9BC53D',
    '2023': '#9BC53D',
    '2024': '#9BC53D',
};
export const getYearColor = (year: string) => colors[year] || '#000000';
