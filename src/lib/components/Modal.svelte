<script lang="ts">
	import Cross from '$lib/icons/Cross.svelte';
	import { modalState } from '$lib/stores/ModalStores.svelte';
	import { onMount, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	let {
		closeOnClickOutside,
		content
	}: {
		closeOnClickOutside: boolean;
		content: Snippet;
	} = $props();

	let modalContent: HTMLDivElement | undefined = $state();

	function close(): void {
		modalState.close();
	}

	function handleBackdropClick(event: MouseEvent): void {
		if (closeOnClickOutside && event.target === event.currentTarget) {
			modalState.close();
		}
	}

	function handleBackdropKeydown(event: KeyboardEvent): void {
		if ((event.key === 'Escape' || event.key === ' ') && modalState.isOpen) {
			modalState.close();
		}
	}

	onMount(() => {
		if (modalState.isOpen && modalContent) {
			modalContent.focus();
		}
	});
</script>

<div
	class="modal-backdrop"
	onclick={handleBackdropClick}
	onkeydown={handleBackdropKeydown}
	bind:this={modalContent}
	tabindex="0"
	role="button"
	transition:fade={{ duration: 200 }}
>
	<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
		<div class="modal-header">
			<h2 id="modal-title">{modalState.title}</h2>
			<button class="close-button" onclick={close} aria-label="Close modal"><Cross /></button>
		</div>
		<div class="modal-content">
			{@render content()}
		</div>
	</div>
</div>

<style lang="scss">
	.modal-backdrop {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		animation: backdrop-fade 0.2s ease-out forwards;

		.modal {
			background-color: white;
			border-radius: 8px;
			max-width: 500px;
			width: 100%;
			max-height: 90vh;
			display: flex;
			flex-direction: column;
			box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
			animation: modal-pop 0.3s ease-out forwards;
			overflow: hidden;

			&-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1rem;
				border-bottom: 1px solid #eee;
				background-color: #f9f9f9;

				h2 {
					margin: 0;
					font-size: 1.25rem;
					font-weight: 600;
				}

				.close-button {
					appearance: none;
					padding: 0;
					background: transparent;
					border: none;
					cursor: pointer;
				}
			}

			&-content {
				padding: 1.25rem;
				overflow-y: auto;
				flex-grow: 1;
			}
		}
	}

	@keyframes backdrop-fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes modal-pop {
		0% {
			opacity: 0;
			transform: scale(0.9) translateY(10px);
		}
		100% {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}
</style>
