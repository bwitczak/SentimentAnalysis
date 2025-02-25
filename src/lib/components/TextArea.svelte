<script lang="ts">
	let { text = $bindable(), name }: { text: string; name: string } = $props();
</script>

<textarea {name} bind:value={text}></textarea>
