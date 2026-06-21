import { router } from '../../../connections/trpc/trpc.ts';
import { get } from './get.ts';

export const parametersRouter = router({
    get,
});
