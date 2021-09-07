import React, { useContext, useState, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ChartComponent, ChartData } from './chart.component';
import { StateContext } from '../../contexts/state/state.context';
import { DataServiceContext, Observation } from '../../services';
import { formatDate } from '../../utils/date.utils';

export const Chart = () => {
    const service = useContext(DataServiceContext);
    const [observations, setObservations] = useState<Observation[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [{ selectedYears }] = useContext(StateContext);

    useEffect(() => {
        service
            .getObservations()
            .then(setObservations)
            .finally(() => setLoading(false));
    }, [service]);

    const chartData = observations
        .reduce<ChartData[]>((res, observation) => {
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
