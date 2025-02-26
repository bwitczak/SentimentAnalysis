<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import Loader from '$lib/icons/Loader.svelte';
	import { evaluateSentiment } from '$lib/logic/BindSentiment';
	import { fetching } from '$lib/stores/APIStores.svelte';
	import { modalState } from '$lib/stores/ModalStores.svelte';
	import type { Sentiment } from '$lib/types/SentimentTypes';

	let text = $state('');
	let hfPrediction: Sentiment | undefined = $state();

	function getSentiment() {
		fetching.isFetching = true;
		modalState.title = 'Sentiment analysis';
		modalState.open();
	}
</script>

<main class="container">
	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				fetching.isFetching = false;
				if (result.type === 'success') {
					await applyAction(result);
					hfPrediction = result.data?.data as Sentiment;
				}
			};
		}}
	>
		<TextArea name="sentiment-text" bind:text />
		<Button type="submit" label="Analize" isFetching={fetching.isFetching} onClick={getSentiment} />
	</form>
</main>

<Modal closeOnClickOutside={true}>
	{#snippet content()}
		{#if fetching.isFetching}
			<div class="sentiment-evaluation-container">
				<Loader />
			</div>
		{:else}
			{@const { icon, message } = evaluateSentiment(hfPrediction)}
			{@const Icon = icon}
			<div class="sentiment-evaluation-container">
				<Icon />
				<p>{message}</p>
			</div>
		{/if}
	{/snippet}
</Modal>

<style lang="scss">
	.sentiment-evaluation-container {
		display: grid;
		gap: 0.75rem;
		justify-items: center;
	}
</style>
