import fs from 'node:fs';
import path from 'node:path';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { NODES_DIR } from '../../../config/paths.ts';
import { publicProcedure } from '../../../connections/trpc/trpc.ts';
import { GetNodeSchema } from '../../models/nodes/index.ts';

export const get = publicProcedure.input(z.string()).query(({ input }) => {
    const filename = input;

    const fullPath = path.join(NODES_DIR, filename);

    const doesFileExist = fs.existsSync(NODES_DIR) && fs.existsSync(fullPath);

    if (!doesFileExist) {
        throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Could not find node ${filename}`,
        });
    }

    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    return GetNodeSchema.parse(JSON.parse(fileContents));
});
