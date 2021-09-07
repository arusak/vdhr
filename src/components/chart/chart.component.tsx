import React from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Level } from 'services/levels.model';
import { labelFormatter, getTimelineTicks } from './chart.utils';
import styles from './chart.module.sass';
import { getYearColor } from '../../utils/color.utils';

export type LevelsByYearMap = Map<number, Level[]>;
export type LevelsByDate = { date: string; [year: string]: any };
export type ChartComponentProps = {
    data: LevelsByDate[];
    years: string[];
    width: number;
    height: number;
};

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
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="date" axisLine={false} ticks={ticks} />
            <YAxis domain={[98, 102]} tickCount={21} axisLine={false} />
            <Tooltip labelFormatter={labelFormatter} />
            {years.map((year) => (
                <Line
                    key={year}
                    type="monotone"
                    dataKey={year}
                    dot={false}
                    isAnimationActive={false}
                    connectNulls={true}
                    stroke={getYearColor(year)}
                    strokeWidth={1.5}
                />
            ))}
        </LineChart>
    );
};
