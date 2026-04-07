import * as fs from 'node:fs/promises';

export const isFile = async (fileName: string) => {
    const stat = await fs.lstat(fileName);
    return stat.isFile();
};
