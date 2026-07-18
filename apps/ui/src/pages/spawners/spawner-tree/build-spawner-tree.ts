export type SpawnerTreeFile = {
    filename: string;
    label: string;
};

export type SpawnerTreeNode = {
    name: string;
    children: SpawnerTreeNode[];
    files: SpawnerTreeFile[];
};

function formatLabel(segment: string): string {
    return segment.replace(/_/g, ' ');
}

export function filenameToBreadcrumbSegments(filename: string): string[] {
    return filename
        .replace(/\.json$/i, '')
        .split('-')
        .map(formatLabel);
}

function findOrCreateChild(node: SpawnerTreeNode, name: string): SpawnerTreeNode {
    const existing = node.children.find((c) => c.name === name);

    if (existing) return existing;

    const created: SpawnerTreeNode = { name, children: [], files: [] };
    node.children.push(created);

    return created;
}

export function buildSpawnerTree(filenames: string[]): SpawnerTreeNode {
    const root: SpawnerTreeNode = { name: '', children: [], files: [] };

    for (const filename of filenames) {
        const withoutExtension = filename.replace(/\.json$/i, '');
        const segments = withoutExtension.split('-');
        const categoryPath = segments.slice(0, -1);
        const leafSegment = segments[segments.length - 1];

        let node = root;
        for (const segment of categoryPath) {
            node = findOrCreateChild(node, formatLabel(segment));
        }

        node.files.push({ filename, label: formatLabel(leafSegment) });
    }

    sortTree(root);
    return root;
}

function sortTree(node: SpawnerTreeNode): void {
    node.children.sort((a, b) => a.name.localeCompare(b.name));
    node.files.sort((a, b) => a.label.localeCompare(b.label));

    for (const child of node.children) {
        sortTree(child);
    }
}

export function countFiles(node: SpawnerTreeNode): number {
    return node.files.length + node.children.reduce((sum, child) => sum + countFiles(child), 0);
}

export function collectFilenames(node: SpawnerTreeNode): string[] {
    return [...node.files.map((f) => f.filename), ...node.children.flatMap(collectFilenames)];
}

export function countMatchingFiles(node: SpawnerTreeNode, filter: string): number {
    const q = filter.toLowerCase();
    const matchedFiles = node.files.filter((f) => f.label.toLowerCase().includes(q)).length;

    return matchedFiles + node.children.reduce((sum, child) => sum + countMatchingFiles(child, filter), 0);
}

export function nodeMatchesFilter(node: SpawnerTreeNode, filter: string): boolean {
    const q = filter.toLowerCase();

    if (node.name.toLowerCase().includes(q)) return true;
    if (node.files.some((f) => f.label.toLowerCase().includes(q))) return true;

    return node.children.some((c) => nodeMatchesFilter(c, q));
}

export function findCategoryPath(root: SpawnerTreeNode, filename: string): string[] | null {
    function search(node: SpawnerTreeNode, path: string[]): string[] | null {
        if (node.files.some((f) => f.filename === filename)) {
            return path;
        }

        for (const child of node.children) {
            const found = search(child, [...path, child.name]);
            if (found) return found;
        }

        return null;
    }

    return search(root, []);
}
