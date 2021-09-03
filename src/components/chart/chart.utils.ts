const labelCache: Map<any, string> = new Map();

export const labelFormatter = (v: any) => {
    let res = labelCache.get(v);
    if (!res) {
        try {
            const [dd, mm] = v.split('.').map(Number);
            const date = new Date(2020, mm - 1, dd);
            res = date.toLocaleString('ru-RU', { month: 'long', day: 'numeric' });
        } catch (e) {
            res = '';
        }
        labelCache.set(v, res);
    }
    return res;
};

export const getTimelineTicks =
    () => Array(12).fill(1).map((_, idx) => '01.' + Number(idx + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 }));
