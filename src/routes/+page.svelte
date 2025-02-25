<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import type { Sentiment } from '$lib/types/ApiTypes';

	let text = $state('');
	let hfPrediction = $state();
</script>

<main class="container">
	<form
		method="POST"
		use:enhance={() => {
			return ({ result }) => {
				if (result.type === 'success') {
					hfPrediction = result.data as Sentiment;
				}
			};
		}}
	>
		<TextArea name="sentiment-text" bind:text />
		<Button type="submit" label="Analize" />
	</form>
</main>
<pre>{JSON.stringify(hfPrediction, null, 2)}</pre>
