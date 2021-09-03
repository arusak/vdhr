import React, { useContext, useState, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { DataServiceContext, Level } from '../../services';
import { ChartComponent, LevelsByDate } from './chart.component';

type ChartProps = { years: string[] };

export const Chart = ({ years }: ChartProps) => {
    const service = useContext(DataServiceContext);
    const [levels, setLevels] = useState<Level[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        service.getLevels()
            .then(setLevels)
            .finally(() => setLoading(false));
    }, [service]);

    const chartData = levels.reduce<LevelsByDate[]>((res, observation) => {
        const dateStr = observation.date.toFormat('dd.MM');
        const yearStr = observation.date.toFormat('yyyy');
        let levelsByDate = res.find(byDate => byDate.date === dateStr);
        if (!levelsByDate) {
            levelsByDate = { date: dateStr };
            res.push(levelsByDate);
        }
        levelsByDate[yearStr] = observation.level;
        return res;
    }, []);

    return (
        isLoading
            ?
            <div>Loading...</div>
            :
            <AutoSizer>
                {({ width, height }) =>
                    <ChartComponent data={chartData}
                                    years={years}
                                    height={height}
                                    width={width}/>}
            </AutoSizer>
    );
};
