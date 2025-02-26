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
	button {
		&.fetching {
			pointer-events: none;
			background-color: $secondary-color;
			color: $text-color;
		}

		& {
			padding: $padding-small;
			background-color: $primary-color;
			color: $text-color;
			border: $button-border;
		}

		&:focus {
			outline: none;
			border-color: $primary-color;
			box-shadow: $focus-shadow;
		}
	}
</style>
