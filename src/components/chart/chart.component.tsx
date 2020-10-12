import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {Level} from '../../services/levels.model';

export type LevelsByYearMap = Map<number, Level[]>;
export type LevelsByDate = { date: string, [year: string]: any }
type ChartComponentProps = { data: LevelsByDate[], years: string[], width: number, height: number };

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

const getYearColor = (year: string) => colors[year] || '#000000';

export const ChartComponent = (props: ChartComponentProps) => {
    const {data, years, width, height} = props;
    return (
        <LineChart
            width={width}
            height={height}
            data={data}
        >
            <CartesianGrid strokeDasharray="1 1"/>
            <XAxis dataKey="date"
                   ticks={Array(12).fill(1).map((_, idx) => '01.' + Number(idx + 1).toLocaleString(undefined, {minimumIntegerDigits: 2}))}/>
            {/*<YAxis domain={[(min: number) => Math.round(min * 10 - 2) / 10, (max: number) => Math.round(max * 10 + 2) / 10]} />*/}
            <YAxis domain={[98, 102]} tickCount={11}/>
            <Tooltip labelStyle={{textAlign: 'left'}} contentStyle={{background: 'white', padding: '0.5rem', borderRadius: '0.5rem', border: 'thin solid #ddd'}} itemStyle={{background: 'none'}}/>
            <Legend/>
            {years.map((year) => (
                <Line key={year}
                      type="monotone"
                      dataKey={year}
                      dot={false}
                      isAnimationActive={false}
                      stroke={(getYearColor(year)) as string}/>
            ))
            }
        </LineChart>
    );
};
