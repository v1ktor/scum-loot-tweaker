export type VariantGroup = {
    label: string;
    names: string[];
    collapsed: boolean;
};

function splitWords(name: string): string[] {
    return name.split(/[\s_]+/).filter(Boolean);
}

function prefixText(name: string, wordCount: number): string {
    if (wordCount === 0) return '';

    const matches = [...name.matchAll(/[^\s_]+/g)];
    const nthMatch = matches[wordCount - 1];

    if (!nthMatch || nthMatch.index === undefined) return name;

    return name.slice(0, nthMatch.index + nthMatch[0].length);
}

export function collapseVariantNames(names: string[]): VariantGroup {
    if (names.length < 3) {
        return { label: names.join(', '), names, collapsed: false };
    }

    const wordLists = names.map(splitWords);
    const minLength = Math.min(...wordLists.map((w) => w.length));

    let commonWordCount = 0;

    for (let i = 0; i < minLength; i++) {
        const word = wordLists[0][i];

        if (wordLists.every((w) => w[i] === word)) {
            commonWordCount++;
        } else {
            break;
        }
    }

    if (commonWordCount < 2) {
        return { label: names.join(', '), names, collapsed: false };
    }

    const commonPrefix = prefixText(names[0], commonWordCount);

    return { label: `${commonPrefix} (×${names.length})`, names, collapsed: true };
}
