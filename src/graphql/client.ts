import { Client, cacheExchange, fetchExchange } from '@urql/svelte';

import { ssrExchange } from '@urql/core';

const isServerSide = typeof window === 'undefined';

// The `ssrExchange` must be initialized with `isClient` and `initialState`
const ssr = ssrExchange({
	isClient: !isServerSide
});

export const client = new Client({
	url: 'http://localhost:4000/graphql',
	exchanges: [cacheExchange, ssr, fetchExchange]
});
