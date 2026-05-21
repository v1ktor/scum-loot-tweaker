import { router } from '../../../connections/trpc/trpc.ts';
import { list } from './list.ts';

export const itemsRouter = router({
    list,
});
