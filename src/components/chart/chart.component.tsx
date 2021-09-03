import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Level } from 'services/levels.model';
import { labelFormatter, getTimelineTicks } from './chart.utils';
import styles from './chart.module.sass';
import { getYearColor } from '../../utils/color.utils';

export type LevelsByYearMap = Map<number, Level[]>;
export type LevelsByDate = { date: string, [year: string]: any }
export type ChartComponentProps = { data: LevelsByDate[], years: string[], width: number, height: number };

export const ChartComponent = (props: ChartComponentProps) => {
    const { data, years, width, height } = props;
    const ticks = getTimelineTicks();
    return (
        <LineChart
            className={styles.lineChart}
            width={width}
            height={height}
            data={data}
        >
            <CartesianGrid strokeDasharray="1 1"/>
            <XAxis dataKey="date"
                   ticks={ticks}/>
            {/*<YAxis domain={[(min: number) => Math.round(min * 10 - 2) / 10, (max: number) => Math.round(max * 10 + 2) / 10]} />*/}
            <YAxis domain={[98, 102]} tickCount={21}/>
            <Tooltip labelFormatter={labelFormatter}/>
            <Legend/>
            {years.map((year) => (
                <Line key={year}
                      type="monotone"
                      dataKey={year}
                      dot={false}
                      isAnimationActive={false}
                      stroke={(getYearColor(year)) as string}/>
            ))}
        </LineChart>
    );
};
