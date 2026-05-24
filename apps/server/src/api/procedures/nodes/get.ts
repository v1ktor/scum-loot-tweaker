import fs from 'node:fs';
import path from 'node:path';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { DATA_DIR } from '../../../config/paths.ts';
import { publicProcedure } from '../../../connections/trpc/trpc.ts';
import { GetNodeSchema } from '../../models/nodes/index.ts';

export const get = publicProcedure.input(z.string()).query(({ input }) => {
    const filename = input;

    const nodesDir = path.join(DATA_DIR, 'Loot/Nodes/Default');
    const fullPath = path.join(nodesDir, filename);

    const doesFileExist = fs.existsSync(nodesDir) && fs.existsSync(fullPath);

    if (!doesFileExist) {
        throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Could not find node ${filename}`,
        });
    }

    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    return GetNodeSchema.parse(JSON.parse(fileContents));
});
