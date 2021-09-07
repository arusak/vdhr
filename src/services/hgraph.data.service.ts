import { Memoize } from 'typescript-memoize';
import archive from '../data/ryb2019.json';
import archive2020 from '../data/ryb2020.json';
import { DataService } from './data.service.context';
import { Observation } from './observation.model';
import { statisticService } from './statistic.service';
import {
    parseApiDate,
    isValidDate,
    diffDates,
    parseArchiveDate,
} from '../utils/date.utils';

type HgraphDataItem = {
    date: string;
    items: { [key: string]: number[] };
};

type Archive = { [key: string]: number };

export class HgraphDataService implements DataService {
    private static getCachedData(): Observation[] {
        const until2020 = cachedDataToSortedObservations(archive, 2014, 2019);
        const in2020 = cachedDataToSortedObservations(archive2020, 2020, 2020);
        return [...until2020, ...in2020];
    }

    private static async getLiveData(): Promise<Observation[]> {
        try {
            const response = await fetch('http://hgraph.ru/api/year/2021');
            const data = await response.json();
            return rawDataToSortedObservations(data, 2021, 2021);
        } catch (e) {
            console.warn("Couldn't get live data");
            return Promise.resolve([]);
        }
    }

    @Memoize()
    getObservations(): Promise<Observation[]> {
        return HgraphDataService.getLiveData()
            .then((liveData) =>
                HgraphDataService.getCachedData().concat(liveData),
            )
            .then(statisticService.smoothenLevels);
    }

    @Memoize()
    async getYears(): Promise<number[]> {
        const observations = await this.getObservations();
        const yearsSet = observations.reduce<Set<number>>(
            (set, cur) => set.add(cur.date.getFullYear()),
            new Set(),
        );

        return [...yearsSet.keys()];
    }
}

function rawDataToSortedObservations(
    typedData: HgraphDataItem[],
    startYear: number,
    endYear: number,
): Observation[] {
    const rybinskData = typedData.reduce((map, item) => {
        const ryb = item.items['Рыбинское'];
        if (ryb) {
            map.set(item.date, ryb[0]);
        }
        return map;
    }, new Map<string, number>());
    const dataArray = Array.from(rybinskData.entries());

    const convertedArray = dataArray
        .map(([date, level]) => ({
            date: parseApiDate(date),
            level,
        }))
        .filter((item) => isValidDate(item.date, [startYear, endYear]));

    return convertedArray.sort((o1, o2) => diffDates(o1.date, o2.date) || 0);
}

function cachedDataToSortedObservations(
    archive: Archive,
    startYear: number,
    endYear: number,
): Observation[] {
    const dataArray = Array.from(Object.entries(archive));

    const convertedArray = dataArray
        .map(([date, level]) => ({
            date: parseArchiveDate(date),
            level,
        }))
        .filter((item) => isValidDate(item.date, [startYear, endYear]));

    return convertedArray.sort((o1, o2) => diffDates(o1.date, o2.date) || 0);
}
