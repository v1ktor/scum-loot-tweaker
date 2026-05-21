import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import type { AppRouter } from '../../server/src/api/procedures/router.ts';
import { config } from './config.ts';
import { queryClient } from './query-client.ts';

const client = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `${config.API_URL}/api`,
        }),
    ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({ client, queryClient });
