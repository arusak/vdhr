import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Level } from '../services/levels.model';

export type LevelsByYearMap = Map<number, Level[]>;
export type LevelsByDate = { date: string, [year: string]: any }
type ChartComponentProps = { data: LevelsByDate[], years: string[], width: number, height: number };

const colors = ['#5BC0EB', '#FDE74C', '#9BC53D', '#C3423F', '#404E4D', '#19535F', '#0B7A75', '#7B2D26', '#F1D302'];

export const ChartComponent = (props: ChartComponentProps) => {
	const { data, years, width, height } = props;
	return (
		<LineChart
			width={width}
			height={height}
			data={data}
		>
			<CartesianGrid strokeDasharray="1 1" />
			<XAxis dataKey="date"
			       ticks={Array(12).fill(1).map((_, idx) => '01.' + Number(idx + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 }))} />
			{/*<YAxis domain={[(min: number) => Math.round(min * 10 - 2) / 10, (max: number) => Math.round(max * 10 + 2) / 10]} />*/}
			<YAxis domain={[98, 102]} tickCount={11} />
			<Tooltip />
			<Legend />
			{years.map((year, idx) => (
				<Line key={year}
				      type="monotone"
				      dataKey={year}
				      dot={false}
				      isAnimationActive={false}
				      stroke={colors[idx]} />
			))
			}
		</LineChart>
	);
};
