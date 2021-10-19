import {formatDate} from "../date";

describe('formatDate', () => {
    it('check format', () => {
        expect(formatDate(1634551400822, 'yyyy')).toBe('2021');
    });
});