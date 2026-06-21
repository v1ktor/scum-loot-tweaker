import fs from 'node:fs';
import { TRPCError } from '@trpc/server';
import { COOLDOWN_GROUPS_FILE } from '../../../config/paths.ts';
import { publicProcedure } from '../../../connections/trpc/trpc.ts';
import { GetCooldownGroupsSchema } from '../../models/cooldown-groups/index.ts';

export const get = publicProcedure.query(() => {
    if (!fs.existsSync(COOLDOWN_GROUPS_FILE)) {
        throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Could not find CooldownGroups.json',
        });
    }

    const fileContents = fs.readFileSync(COOLDOWN_GROUPS_FILE, 'utf-8');

    return GetCooldownGroupsSchema.parse(JSON.parse(fileContents));
});
