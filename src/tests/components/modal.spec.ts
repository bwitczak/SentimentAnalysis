import Modal from '$lib/components/Modal.svelte';
import { modalState } from '$lib/stores/ModalStores.svelte';
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('$lib/stores/ModalStores.svelte', () => ({
	modalState: {
		isOpen: false,
		title: 'Test title',
		open: vi.fn(() => {
			modalState.isOpen = true;
		}),
		close: vi.fn(() => {
			modalState.isOpen = false;
		})
	}
}));

const testContent = createRawSnippet(() => {
	return {
		render: () => '<div data-testid="test-content">Test Content</div>'
	};
});

describe('Modal.svelte', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		modalState.isOpen = true;
	});

	afterEach(() => {
		cleanup();
	});

	test('Should show modal', () => {
		render(Modal, { content: testContent, closeOnClickOutside: true });

		expect(screen.getByText('Test Content')).toBeTruthy();
	});

	test('Should render content correctly', () => {
		render(Modal, { content: testContent, closeOnClickOutside: true });

		expect(screen.getByText('Test Content')).toBeTruthy();
	});

	test('Should render modal title correctly', () => {
		render(Modal, { content: testContent, closeOnClickOutside: true });

		expect(screen.getByText('Test title')).toBeTruthy();
	});

	test('Should modal close on click inside backdrop', async () => {
		render(Modal, { content: testContent, closeOnClickOutside: true });

		const backdrop = screen.getByTestId('modal-backdrop');
		await fireEvent.click(backdrop);

		expect(modalState.close).toHaveBeenCalled();
	});

	test("Should't close modal on click inside content", async () => {
		render(Modal, { content: testContent, closeOnClickOutside: true });

		const modalContent = screen.getByTestId('modal-content');
		await fireEvent.click(modalContent);

		expect(modalState.close).not.toHaveBeenCalled();
	});

	test('Should modal close on click escape', async () => {
		render(Modal, { content: testContent, closeOnClickOutside: true });

		const modalContent = screen.getByTestId('modal-content');

		await fireEvent.keyDown(modalContent, { key: 'Escape' });
		expect(modalState.close).toHaveBeenCalled();
	});

	test('Should modal close on click space', async () => {
		render(Modal, { content: testContent, closeOnClickOutside: true });

		const modalContent = screen.getByTestId('modal-content');

		await fireEvent.keyDown(modalContent, { key: ' ' });
		expect(modalState.close).toHaveBeenCalled();
	});

	test('Should close modal on click close button', async () => {
		render(Modal, { content: testContent, closeOnClickOutside: true });

		const closeButton = screen.getByTestId('modal-close-button');
		await fireEvent.click(closeButton);

		expect(modalState.close).toHaveBeenCalled();
	});
});
