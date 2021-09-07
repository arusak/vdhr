import { parseDate } from './date.utils';

describe('date.utils', () => {
    describe('#parseDate', () => {
        it('should parse yyyy-MM-dd dates', () => {
            const date = parseDate('2020-01-01', 'yyyy-MM-dd');
            expect(date.getFullYear()).toBe(2020);
            expect(date.getMonth()).toBe(0);
            expect(date.getDate()).toBe(1);
        });
    });
});
