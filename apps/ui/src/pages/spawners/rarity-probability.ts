const RARITY_WEIGHTS: Record<string, number> = {
    Abundant: 32,
    Common: 16,
    Uncommon: 8,
    Rare: 4,
    VeryRare: 2,
    ExtremelyRare: 1,
};

const nameOf = (rarity: string | undefined) => rarity ?? 'Common';
const weightOf = (rarity: string | undefined) => RARITY_WEIGHTS[nameOf(rarity)] ?? 1;

export function calcSelectionProbability(rarity: string | undefined, siblingRarities: (string | undefined)[]): number {
    if (siblingRarities.length === 0) {
        return 0;
    }

    const distinctRarities = new Set(siblingRarities.map(nameOf));
    const groupSize = siblingRarities.filter((sibling) => nameOf(sibling) === nameOf(rarity)).length;

    if (groupSize === 0) {
        distinctRarities.add(nameOf(rarity));
    }

    const totalWeight = [...distinctRarities].reduce((sum, name) => sum + weightOf(name), 0);

    return weightOf(rarity) / totalWeight / Math.max(groupSize, 1);
}

export type RarityGroupShare = {
    groupProbability: number;
    groupSize: number;
};

export function calcRarityGroupShare(
    rarity: string | undefined,
    siblingRarities: (string | undefined)[],
): RarityGroupShare {
    const groupSize = Math.max(siblingRarities.filter((sibling) => nameOf(sibling) === nameOf(rarity)).length, 1);

    return { groupProbability: calcSelectionProbability(rarity, siblingRarities) * groupSize, groupSize };
}

export function describeSelectionOdds(
    rarity: string | undefined,
    siblingRarities: (string | undefined)[],
    noun = 'entries',
): string {
    if (siblingRarities.length === 0) {
        return '';
    }

    const { groupProbability, groupSize } = calcRarityGroupShare(rarity, siblingRarities);
    const share = `${nameOf(rarity)} takes ${formatProbability(groupProbability)} of the roll here`;

    if (groupSize === 1) {
        return `${share}, and nothing else here shares that rarity.`;
    }

    return `${share}, split evenly between the ${groupSize} ${noun} sharing it.`;
}

export function formatProbability(prob: number): string {
    const pct = prob * 100;

    if (pct === 0) return '0%';
    if (pct >= 1) return `${pct.toFixed(1)}%`;

    return `${pct.toFixed(2)}%`;
}
