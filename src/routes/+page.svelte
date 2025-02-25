<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import TextArea from '$lib/components/TextArea.svelte';

	let text = $state('');
</script>

<main class="container">
	<form method="POST">
		<TextArea name="sentiment-text" bind:text />
		<Button type="submit" label="Analize" />
	</form>
</main>
