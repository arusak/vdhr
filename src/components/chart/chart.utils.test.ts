import { getTimelineTicks } from './chart.utils';

describe('chart.utils', () => {
    describe('#getTimelineTicks', () => {
        it('should return 12 ticks', () => {
            expect(getTimelineTicks().length).toBe(12);
        });
        it('should return month names', () => {
            expect(getTimelineTicks()[0]).toBe('янв.');
        });
    });
});
