import { router } from '../../../connections/trpc/trpc.ts';
import { get } from './get.ts';
import { list } from './list.ts';
import { paths } from './paths.ts';

export const nodesRouter = router({
    get,
    list,
    paths,
});
