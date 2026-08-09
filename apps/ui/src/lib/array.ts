export function updateAt<T>(list: T[], index: number, next: T): T[] {
    return list.map((item, i) => (i === index ? next : item));
}

export function removeAt<T>(list: T[], index: number): T[] {
    return list.filter((_, i) => i !== index);
}

export function withoutIndices<T>(list: T[], indices: number[]): T[] {
    const drop = new Set(indices);

    return list.filter((_, i) => !drop.has(i));
}

export function move<T>(list: T[], from: number, to: number): T[] {
    if (to < 0 || to >= list.length || from === to) return list;

    const next = [...list];
    const [moved] = next.splice(from, 1);

    next.splice(to, 0, moved);

    return next;
}
