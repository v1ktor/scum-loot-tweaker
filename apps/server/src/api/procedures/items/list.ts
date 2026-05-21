import { listAllItems } from '../../../connections/database/queries/item.ts';
import { publicProcedure } from '../../../connections/trpc/trpc.ts';

export const list = publicProcedure.query(() => {
    return listAllItems();
});
