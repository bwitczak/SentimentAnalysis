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
	<div class="wrapper">
		<h1>Sentiment Analyser</h1>
		<form
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					fetching.isFetching = false;
					if (result.type === 'success') {
						await applyAction(result);
						hfPrediction = result.data?.data as Sentiment;
					} else if (result.type === 'failure' || result.type === 'error') {
						hfPrediction = undefined;
					}
				};
			}}
		>
			<TextArea name="sentiment-text" bind:text />
			<Button
				type="submit"
				label="Analize"
				isFetching={fetching.isFetching}
				onClick={getSentiment}
			/>
		</form>
	</div>
</main>

<Modal closeOnClickOutside={true}>
	{#snippet content()}
		{#if fetching.isFetching}
			<div class="sentiment-evaluation-container">
				<Loader />
			</div>
		{:else}
			{@const { icon, message, proTip } = evaluateSentiment(hfPrediction)}
			{@const Icon = icon}
			<div class="sentiment-evaluation-container">
				<Icon />
				<p>{message}</p>
				<p>Pro tip: {proTip}</p>
			</div>
		{/if}
	{/snippet}
</Modal>

<style lang="scss">
	:global(body) {
		margin: 0;
		padding: 0;
	}

	.container {
		display: flex;
		justify-content: center;
		height: 100vh;
		background-color: $background-color;

		& > .wrapper {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: $padding-small;
			padding: $padding-medium;

			& > h1 {
				margin: 0;
			}

			& > form {
				display: grid;
				gap: $padding-large;
				border: 2px solid grey;
				padding: $padding-large;
				border-radius: 4px;
			}
		}
	}

	.sentiment-evaluation-container {
		display: grid;
		gap: $padding-large;
		justify-items: center;

		& > p {
			margin: 0;
		}
	}
</style>
