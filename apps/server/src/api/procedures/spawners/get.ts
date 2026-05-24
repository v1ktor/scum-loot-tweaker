import fs from 'node:fs';
import path from 'node:path';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { SPAWNERS_DIR } from '../../../config/paths.ts';
import { publicProcedure } from '../../../connections/trpc/trpc.ts';
import { GetSpawnerSchema } from '../../models/spawners/index.ts';

export const get = publicProcedure.input(z.string()).query(({ input }) => {
    const filename = input;

    const fullPath = path.join(SPAWNERS_DIR, filename);

    const doesFileExist = fs.existsSync(SPAWNERS_DIR) && fs.existsSync(fullPath);

    if (!doesFileExist) {
        throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Could not find spawner ${filename}`,
        });
    }

    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    return GetSpawnerSchema.parse(JSON.parse(fileContents));
});
