import fs from 'fs';
import luxon from 'luxon';

/*
 Node utility to convert raw hgraph json to local archive
 */

const raw = fs.readFileSync('../src/data/raw2020.json', {encoding: 'utf8'});
const json = JSON.parse(raw);

const processed = json.map(row => {
    const {date, items} = row;
    const isoDate = luxon.DateTime.fromFormat(date, 'dd.MM.yyyy').toFormat('yyyy-MM-dd');
    const value = items && items['Рыбинское'] && items['Рыбинское'][0];
    return [isoDate, value];
})
    .filter(([, v]) => !!v)
    .sort(([d1], [d2]) => d1.localeCompare(d2));

const result = processed.reduce((res, [isoDate, value]) => ({...res, [isoDate]: value}), {});

fs.writeFileSync('../src/data/ryb2020.json', JSON.stringify(result), {encoding: 'utf8'});
