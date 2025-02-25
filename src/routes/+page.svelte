<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import TextArea from '$lib/components/TextArea.svelte';

	let text = $state('');
</script>

<main class="container">
	<form method="POST" use:enhance>
		<TextArea name="sentiment-text" bind:text />
		<Button type="submit" label="Analize" />
	</form>
</main>
