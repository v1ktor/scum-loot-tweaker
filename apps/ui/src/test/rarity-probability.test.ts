import { describe, expect, it } from 'vitest';
import {
    calcRarityGroupShare,
    calcSelectionProbability,
    describeSelectionOdds,
    formatProbability,
} from '@/pages/spawners/rarity-probability.ts';

const chance = (rarity: string | undefined, siblings: (string | undefined)[]) =>
    calcSelectionProbability(rarity, siblings);

describe('calcSelectionProbability', () => {
    it('gives nothing a chance when there is nothing to pick from', () => {
        expect(chance('Common', [])).toBe(0);
    });

    it('always picks the item when it is the only one', () => {
        expect(chance('Rare', ['Rare'])).toBe(1);
    });

    describe('when every item has a different rarity', () => {
        const fruit = ['Abundant', 'Common', 'Uncommon', 'Rare', 'VeryRare', 'ExtremelyRare'];

        it('makes an Abundant item 32 times likelier than an Extremely Rare one', () => {
            expect(chance('Abundant', fruit) / chance('ExtremelyRare', fruit)).toBeCloseTo(32);
        });

        it('doubles the chance with every step up the rarity scale', () => {
            expect(chance('Abundant', fruit) / chance('Common', fruit)).toBeCloseTo(2);
            expect(chance('Abundant', fruit) / chance('VeryRare', fruit)).toBeCloseTo(16);
        });

        it('adds up to 100% across the whole set', () => {
            expect(fruit.reduce((sum, r) => sum + chance(r, fruit), 0)).toBeCloseTo(1);
        });
    });

    describe('when two items share a rarity', () => {
        const fruit = ['Common', 'Common', 'Rare', 'VeryRare'];

        it("splits that rarity's share evenly between the two", () => {
            expect(chance('Common', fruit)).toBeCloseTo(8 / 22);
            expect(chance('Common', fruit) * 2).toBeCloseTo(16 / 22);
        });

        it('leaves the pair together four times likelier than the rarity below', () => {
            expect((chance('Common', fruit) * 2) / chance('Rare', fruit)).toBeCloseTo(4);
        });

        it('leaves the pair together eight times likelier than the rarity below that', () => {
            expect((chance('Common', fruit) * 2) / chance('VeryRare', fruit)).toBeCloseTo(8);
        });

        it('still adds up to 100% across the whole set', () => {
            expect(fruit.reduce((sum, r) => sum + chance(r, fruit), 0)).toBeCloseTo(1);
        });
    });

    it('gives a rarity no extra share just because more items use it', () => {
        const few = ['Common', 'Rare'];
        const many = ['Common', 'Rare', 'Rare', 'Rare', 'Rare'];

        expect(chance('Rare', few)).toBeCloseTo(chance('Rare', many) * 4);
        expect(chance('Common', few)).toBeCloseTo(chance('Common', many));
    });

    it('treats an item with no rarity as Common', () => {
        expect(chance(undefined, ['Common', 'Rare'])).toBeCloseTo(chance('Common', ['Common', 'Rare']));
    });

    it('handles an item that has not joined the set yet', () => {
        expect(chance('Rare', ['Common'])).toBeCloseTo(4 / 20);
    });
});

describe('calcRarityGroupShare', () => {
    it("reports a rarity's share before it is divided between its items", () => {
        const set = ['Uncommon', 'Common', 'Common'];

        expect(calcRarityGroupShare('Common', set)).toEqual({ groupProbability: 16 / 24, groupSize: 2 });
        expect(calcRarityGroupShare('Uncommon', set)).toEqual({ groupProbability: 8 / 24, groupSize: 1 });
    });

    it('matches the item chance when only one item has that rarity', () => {
        const set = ['Abundant', 'Rare'];
        const { groupProbability } = calcRarityGroupShare('Rare', set);

        expect(groupProbability).toBeCloseTo(calcSelectionProbability('Rare', set));
    });

    it("keeps a rarity's share the same however many items use it", () => {
        expect(calcRarityGroupShare('Common', ['Uncommon', 'Common']).groupProbability).toBeCloseTo(16 / 24);
        expect(calcRarityGroupShare('Common', ['Uncommon', 'Common', 'Common', 'Common']).groupProbability).toBeCloseTo(
            16 / 24,
        );
    });
});

describe('describeSelectionOdds', () => {
    it('stays quiet when there is nothing to compare against', () => {
        expect(describeSelectionOdds('Common', [])).toBe('');
    });

    it('spells out the split when items share a rarity', () => {
        expect(describeSelectionOdds('Common', ['Uncommon', 'Common', 'Common'], 'children')).toBe(
            'Common takes 66.7% of the roll here, split evenly between the 2 children sharing it.',
        );
    });

    it('says so when a rarity belongs to one item alone', () => {
        expect(describeSelectionOdds('Uncommon', ['Uncommon', 'Common', 'Common'])).toBe(
            'Uncommon takes 33.3% of the roll here, and nothing else here shares that rarity.',
        );
    });
});

describe('formatProbability', () => {
    it('shows a plain 0% for no chance at all', () => {
        expect(formatProbability(0)).toBe('0%');
    });

    it('shows one decimal place from 1% upwards', () => {
        expect(formatProbability(0.5)).toBe('50.0%');
        expect(formatProbability(0.01)).toBe('1.0%');
    });

    it('shows two decimal places below 1%', () => {
        expect(formatProbability(0.0025)).toBe('0.25%');
    });
});
