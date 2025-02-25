<script lang="ts">
	let { label, type = 'button' }: { label: string; type: 'button' | 'submit' } = $props();
</script>

<button {type}>{label}</button>
