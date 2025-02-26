<script lang="ts">
	let { text = $bindable(), name }: { text: string; name: string } = $props();
</script>

<textarea {name} bind:value={text}></textarea>

<style lang="scss">
	textarea {
		padding: $padding-small;
		resize: none;
		min-height: 300px;
		background-color: $modal-bg;
		border: 1px solid $border-color;
		border-radius: $border-radius;

		&:focus {
			outline: none;
			border-color: $primary-color;
			box-shadow: $focus-shadow;
		}
	}
</style>
