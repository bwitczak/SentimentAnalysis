import TextArea from '$lib/components/TextArea.svelte';
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

describe('TextArea.svelte', () => {
	afterEach(() => cleanup());

	it('Should component render', async () => {
		const { getByTestId } = render(TextArea);

		expect(getByTestId('text-area')).toBeTruthy();
	});
});
