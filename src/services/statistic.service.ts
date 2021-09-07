import { Observation } from './observation.model';

class StatisticService {
    /**
     * Check if
     */
    readonly smoothenLevels = (levels: Observation[]): Observation[] => {
        return levels.map((val, idx) => {
            const isLast = idx === levels.length - 1;
            const isFirst = idx === 0;
            // first/last value is checked against single next/prev value (not fully accurate logic but let it be)
            const prev = !isFirst
                ? levels[idx - 1].level
                : levels[idx + 1].level;
            const next = !isLast
                ? levels[idx + 1].level
                : levels[idx - 1].level;
            const diffFromPrev = val.level - prev;
            const diffFromNext = val.level - next;
            const isSameSignDiff = diffFromPrev * diffFromNext > 0;
            const correctedLevel =
                Math.abs(diffFromPrev) > 0.05 &&
                Math.abs(diffFromNext) > 0.05 &&
                isSameSignDiff
                    ? (prev + next) / 2
                    : val.level;
            return { ...val, level: correctedLevel };
        });
    };
}

export const statisticService = new StatisticService();
