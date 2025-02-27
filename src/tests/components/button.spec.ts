import Button from '$lib/components/Button.svelte';
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

describe('Button.svelte', () => {
	afterEach(() => cleanup());

	it('Should component render', async () => {
		const { getByTestId } = render(Button);

		expect(getByTestId('button')).toBeTruthy();
	});
});
