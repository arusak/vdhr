import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { DataService, DataServiceContext, Level } from '../../services';
import { ChartComponent, LevelsByDate } from './chart.component';

type ChartProps = { years: string[] };
type State = { levels: Level[], isLoading: boolean };

export class Chart extends React.Component<ChartProps, State> {
    static contextType = DataServiceContext;

    state: State = { levels: [], isLoading: true };

    private service: DataService;

    constructor(props: ChartProps) {
        super(props);
        this.service = this.context;
    }

    componentDidMount() {
        const service: DataService = this.context;
        service.getLevels()
            .then(levels => this.setState({ levels }))
            .finally(() => this.setState({ isLoading: false }));
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
                                                        width={width}/>}
            </AutoSizer>
        );
    }
}
