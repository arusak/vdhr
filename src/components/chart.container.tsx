import React from 'react';
import  AutoSizer  from 'react-virtualized-auto-sizer';
import { DataService, DataServiceContext } from '../services/data.service.context';
import { Level } from '../services/levels.model';
import { ChartComponent, LevelsByDate } from './chart.component';

type ChartProps = { years: string[] };
type ChartState = { levels: Level[] };


export class Chart extends React.Component<ChartProps, ChartState> {
	static contextType = DataServiceContext;

	state: ChartState = { levels: [] };

	private service: DataService;

	constructor(props: ChartProps) {
		super(props);
		this.service = this.context;
	}

	componentDidMount() {
		let service: DataService = this.context;
		service.getLevels().then(levels => this.setState({ levels }));
	}

	render() {
		const { levels } = this.state;
		const { years } = this.props;

		const chartData = levels.reduce<LevelsByDate[]>((res, level) => {
			const dateStr = level.date.toFormat('dd.MM');
			const yearStr = level.date.toFormat('yyyy');
			let levelsByDate = res.find(byDate => byDate.date === dateStr);
			if (!levelsByDate) {
				levelsByDate = { date: dateStr };
				res.push(levelsByDate);
			}
			levelsByDate[yearStr] = level.level;
			return res;
		}, []);

		return (
			<AutoSizer>
				{({ width, height }) => <ChartComponent data={chartData}
				                                        years={years.map(String)}
				                                        height={height}
				                                        width={width} />}
			</AutoSizer>
		);
	}
}
