<script lang="ts">
	let { text = $bindable(''), name }: { text: string; name: string } = $props();

	$effect(() => {
		if (text.length > 500) {
			text = text.substring(0, 500);
		}
	});
</script>

<div>
	<textarea data-testid="text-area" {name} maxlength="500" bind:value={text}></textarea>
	<!-- /* v8 ignore next 1 */ -->
	<span data-testid="text-area-counter">{text.length}/500</span>
</div>

<style lang="scss">
	div {
		position: relative;
		box-sizing: border-box;

		textarea {
			padding: $padding-small;
			resize: none;
			min-height: 400px;
			background-color: $modal-bg;
			border: 1px solid $border-color;
			border-radius: $border-radius;
			width: 100%;
			box-sizing: border-box;

			&:focus {
				outline: none;
				border-color: $primary-color;
				box-shadow: $focus-shadow;
			}
		}

		span {
			position: absolute;
			bottom: $padding-small;
			right: $padding-small;
			border-radius: $border-radius;
		}
	}
</style>
