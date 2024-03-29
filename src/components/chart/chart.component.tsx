import React from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { labelFormatter, getTimelineTicks } from './chart.utils';
import styles from './chart.module.sass';
import { getYearColor } from '../../utils/color.utils';
import { formatDate, parseDate } from '../../utils/date.utils';

export type ChartData = { date: string; [year: string]: any };
export type ChartProps = {
    data: ChartData[];
    years: string[];
    width: number;
    height: number;
};

const MonthTick = (props: any) => {
    const {
        x,
        y,
        payload: { value },
        width,
        height,
        fill,
    } = props;
    const date = parseDate(value, 'dd.MM');
    const label = formatDate(date, 'MMM');
    const textProps = {
        x: width / 24 + x,
        y: height / 2 - 18 + y,
        dominantBaseline: 'middle',
        textAnchor: 'middle',
        fill,
    };
    return <text {...textProps}>{label}</text>;
};

export const ChartComponent = (props: ChartProps) => {
    const { data, years, width, height } = props;
    const ticks = getTimelineTicks();
    return (
        <LineChart
            className={styles.lineChart}
            width={width}
            height={height}
            data={data}
        >
            <CartesianGrid strokeDasharray="3 5" />
            <XAxis
                orientation="top"
                dataKey="date"
                axisLine={false}
                ticks={ticks}
                tick={<MonthTick />}
            />
            <YAxis domain={[98.4, 102]} tickCount={19} axisLine={false} />
            <Tooltip
                labelFormatter={labelFormatter}
                isAnimationActive={false}
            />
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
