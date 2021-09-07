import React, { useContext, useState, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ChartComponent, LevelsByDate } from './chart.component';
import { StateContext } from '../../contexts/state/state.context';
import { DataServiceContext, Level } from '../../services';
import { formatDate, diffDates, parseDate } from '../../utils/date.utils';

export const Chart = () => {
    const service = useContext(DataServiceContext);
    const [levels, setLevels] = useState<Level[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [{ selectedYears }] = useContext(StateContext);

    useEffect(() => {
        service
            .getLevels()
            .then(setLevels)
            .finally(() => setLoading(false));
    }, [service]);

    const chartData = levels
        .reduce<LevelsByDate[]>((res, observation) => {
            const dateStr = formatDate(observation.date, 'dd.MM');
            const yearStr = formatDate(observation.date, 'yyyy');
            let levelsByDate = res.find((byDate) => byDate.date === dateStr);
            if (!levelsByDate) {
                levelsByDate = { date: dateStr };
                res.push(levelsByDate);
            }
            levelsByDate[yearStr] = observation.level;
            return res;
        }, [])
        // because we must have consistent x-axis for all years
        .filter((v) => v.date !== '29.02');

    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <AutoSizer>
            {({ width, height }) => (
                <ChartComponent
                    data={chartData}
                    years={selectedYears}
                    height={height}
                    width={width}
                />
            )}
        </AutoSizer>
    );
};
