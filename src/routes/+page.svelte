<script lang="ts">
	import TextArea from '$lib/components/TextArea.svelte';

	let text = $state('');
</script>

<TextArea bind:text />
