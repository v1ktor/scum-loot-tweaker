import fs from 'node:fs';
import { TRPCError } from '@trpc/server';
import { PARAMETERS_FILE } from '../../../config/paths.ts';
import { publicProcedure } from '../../../connections/trpc/trpc.ts';
import { GetParametersSchema } from '../../models/parameters/index.ts';

export const get = publicProcedure.query(() => {
    if (!fs.existsSync(PARAMETERS_FILE)) {
        throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Could not find Parameters.json',
        });
    }

    const fileContents = fs.readFileSync(PARAMETERS_FILE, 'utf-8');

    return GetParametersSchema.parse(JSON.parse(fileContents));
});
