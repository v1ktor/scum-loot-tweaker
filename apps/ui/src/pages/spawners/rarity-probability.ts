const RARITY_WEIGHTS: Record<string, number> = {
    Abundant: 32,
    Common: 16,
    Uncommon: 8,
    Rare: 4,
    VeryRare: 2,
    ExtremelyRare: 1,
};

export function calcSelectionProbability(rarity: string | undefined, siblingRarities: (string | undefined)[]): number {
    if (siblingRarities.length === 0) {
        return 0;
    }

    const totalWeight = siblingRarities.reduce((sum, r) => sum + (RARITY_WEIGHTS[r ?? 'Common'] ?? 1), 0);

    return (RARITY_WEIGHTS[rarity ?? 'Common'] ?? 1) / totalWeight;
}

export function formatProbability(prob: number): string {
    const pct = prob * 100;

    if (pct === 0) return '0%';
    if (pct >= 1) return `${pct.toFixed(1)}%`;

    return `${pct.toFixed(2)}%`;
}
