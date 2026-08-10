import { listAllCharacters } from '../../../connections/database/queries/character.ts';
import { publicProcedure } from '../../../connections/trpc/trpc.ts';

export const list = publicProcedure.query(() => {
    return listAllCharacters();
});
