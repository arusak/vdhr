import { DateTime } from 'luxon';
import { Memoize } from 'typescript-memoize';
import { LevelsByYearMap } from '../components/chart/chart.component';
import archive from '../data/ryb2019.json';
import archive2020 from '../data/ryb2020.json';
import { DataService } from './data.service.context';
import { Level } from './levels.model';
import { statisticService } from './statistic.service';

type HgraphDataItem = {
    date: string;
    items: { [key: string]: number[] };
}

type Archive = { [key: string]: number }

export class HgraphDataService implements DataService {
    private static getCachedData(): Level[] {
        const until2020 = cachedDataToSortedLevels(archive, 2014, 2019);
        const in2020 = cachedDataToSortedLevels(archive2020, 2020, 2020);
        return [...until2020, ...in2020];
    };

    private static async getLiveData(): Promise<Level[]> {
        const response = await fetch('http://hgraph.ru/api/year/2021');
        const data = await response.json();
        return rawDataToSortedLevels(data, 2021, 2021);
    }

    @Memoize()
    getLevels(): Promise<Level[]> {
        return HgraphDataService.getLiveData()
            .then(liveData => HgraphDataService.getCachedData().concat(liveData))
            .then(statisticService.smoothenLevels);
    }

    @Memoize()
    async getYears(): Promise<number[]> {
        const levels = await this.getLevels();
        const yearsMap = levels.reduce<LevelsByYearMap>((map: LevelsByYearMap, cur: Level) => {
            const year = cur.date.year;
            const levels = map.get(year) || map.set(year, []).get(year);
            levels!.push(cur);
            return map;
        }, new Map());

        return [...yearsMap.keys()];
    }
}

function rawDataToSortedLevels(typedData: HgraphDataItem[], startYear: number, endYear: number) {
    const rybinskData = typedData.reduce((map, item) => {
        const ryb = item.items['Рыбинское'];
        if (ryb) {
            map.set(item.date, ryb[0]);
        }
        return map;
    }, new Map<string, number>());
    const dataArray = Array.from(rybinskData.entries());

    const convertedArray = dataArray.map(([date, level]) => ({
        date: DateTime.fromFormat(date, 'dd.MM.yyyy'),
        level,
    })).filter(item => item.date.isValid).filter(item => item.date.year >= startYear && item.date.year <= endYear);

    return convertedArray.sort((o1, o2) => {
        return o1.date.diff(o2.date).toObject().milliseconds || 0;
    });
}

function cachedDataToSortedLevels(archive: Archive, startYear: number, endYear: number) {
    const dataArray = Array.from(Object.entries(archive));

    const convertedArray = dataArray.map(([date, level]) => ({
        date: DateTime.fromFormat(date, 'yyyy-MM-dd'),
        level,
    })).filter(item => item.date.isValid).filter(item => item.date.year >= startYear && item.date.year <= endYear);

    return convertedArray.sort((o1, o2) => {
        return o1.date.diff(o2.date).toObject().milliseconds || 0;
    });

}
