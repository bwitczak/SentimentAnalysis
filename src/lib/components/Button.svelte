<script lang="ts">
	let {
		label,
		type = 'button',
		isFetching = false,
		onClick
	}: {
		label: string;
		type: 'button' | 'submit';
		isFetching: boolean;
		onClick: () => void;
	} = $props();
</script>

<button onclick={onClick} {type} data-fetching={isFetching} class:fetching={isFetching}
	>{label}</button
>

<style lang="scss">
	.fetching {
		pointer-events: none;
		background-color: gray;
		color: white;
	}
</style>
