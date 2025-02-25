<script lang="ts">
	let {
		label,
		type = 'button',
		onClick
	}: { label: string; type: 'button' | 'submit'; onClick: () => void } = $props();
</script>

<button onclick={onClick} {type}>{label}</button>
