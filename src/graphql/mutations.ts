import { Client, gql, mutationStore } from '@urql/svelte';

export function evaluateSentimentMutation(client: Client, input: string) {
	const data = {
		input
	};

	return mutationStore({
		client,
		query: gql`
			mutation EvaluateSentiment($input: String!) {
				evaluateSentiment(input: $input) {
					label
					score
				}
			}
		`,
		variables: data
	});
}
