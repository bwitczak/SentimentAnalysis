<svg
	xmlns="http://www.w3.org/2000/svg"
	width="48"
	height="48"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="lucide lucide-loader-circle loader"
>
	<path d="M21 12a9 9 0 1 1-6.219-8.56" />
</svg>

<style lang="scss">
	.loader {
		animation: rotate 2s linear infinite;
		transform-origin: center;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
