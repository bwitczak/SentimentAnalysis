import type { ModalType } from '$lib/types/ModalTypes';

export const modalState = $state<ModalType>({
	isOpen: false,
	title: '',
	open: () => {
		modalState.isOpen = true;
	},
	close: () => {
		modalState.isOpen = false;
	}
});
