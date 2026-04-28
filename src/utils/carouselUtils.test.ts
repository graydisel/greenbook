import { describe, it, expect } from 'vitest';
import { getNextStep } from './carouselUtils';

describe('Carousel Logic', () => {
    it('should increment step by 1', () => {
        expect(getNextStep(0, 10)).toBe(1);
        expect(getNextStep(5, 10)).toBe(6);
    });

    it('should reset to 0 when reaching maxSteps', () => {
        expect(getNextStep(9, 10)).toBe(0);
    });
});