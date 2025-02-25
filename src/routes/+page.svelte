<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import { modalState } from '$lib/stores/ModalStores.svelte';
	import type { Sentiment } from '$lib/types/ApiTypes';

	let text = $state('');
	let hfPrediction: Sentiment = $state() as Sentiment;
</script>

<main class="container">
	<form
		method="POST"
		use:enhance={() => {
			return ({ result }) => {
				if (result.type === 'success') {
					hfPrediction = result.data as Sentiment;
					modalState.title = 'Sentiment analysis';
					modalState.open();
				}
			};
		}}
	>
		<TextArea name="sentiment-text" bind:text />
		<Button type="submit" label="Analize" />
	</form>
</main>

{#if modalState.isOpen}
	<Modal closeOnClickOutside={true}>
		{#snippet content()}
			<pre>{JSON.stringify(hfPrediction, null, 2)}</pre>
		{/snippet}
	</Modal>
{/if}
