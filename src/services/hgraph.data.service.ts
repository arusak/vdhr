import {DateTime} from 'luxon';
import {Memoize} from 'typescript-memoize';
import {LevelsByYearMap} from '../components/chart/chart.component';
import data from '../data/all.json';
import {DataService} from './data.service.context';
import {Level} from './levels.model';

type HgraphDataItem = {
    date: string;
    items: { [key: string]: number[] };
}
const FIRST_YEAR = 2014;
const LAST_CACHE_YEAR = 2019;

export class HgraphDataService implements DataService {
    private static getCachedData(): Level[] {
        return rawDataToSortedLevels(data, FIRST_YEAR, LAST_CACHE_YEAR);
    };

    private static async getLiveData(): Promise<Level[]> {
        const response = await fetch('http://hgraph.ru/api/year/2020');
        const data = await response.json();
        return rawDataToSortedLevels(data, 2020, 2020);
    }

    @Memoize()
    getLevels(): Promise<Level[]> {
        return HgraphDataService.getLiveData().then(liveData => HgraphDataService.getCachedData().concat(liveData));
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

function rawDataToSortedLevels(raw: any, startYear: number, endYear: number) {
    const typedData = raw as HgraphDataItem[];
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
