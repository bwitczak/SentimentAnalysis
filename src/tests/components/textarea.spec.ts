import TextArea from '$lib/components/TextArea.svelte';
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

describe('TextArea.svelte', () => {
	afterEach(() => cleanup());

	it('Should component render', async () => {
		const { getByTestId } = render(TextArea);

		expect(getByTestId('text-area')).toBeTruthy();
	});

	it('Should counter count text chars', async () => {
		const { getByTestId } = render(TextArea, {
			props: {
				text: 'Lorem ipsum',
				name: 'text-area'
			}
		});
		const counter = getByTestId('text-area-counter');

		expect(counter).toBeTruthy();
		expect(counter.textContent).toBe('11/500');
	});

	it('Should block above 500 chars', async () => {
		const { getByTestId } = render(TextArea, {
			props: {
				text: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Maximus facilisi duis adipiscing tempus; amet ornare hac. Tempor ultrices posuere venenatis ad ullamcorper diam montes. Fringilla eu orci ultricies pretium accumsan magnis fusce felis ullamcorper. Pharetra dictum montes malesuada ipsum sociosqu sed tempor. Nunc eleifend posuere natoque facilisis cras platea potenti feugiat. Eu vehicula gravida tellus nostra tellus torquent tempus. Nostra odio tincidunt conubia dapibus ante habitant. Scelerisque nascetur rutrum accumsan tempor efficitur elementum.',
				name: 'text-area'
			}
		});

		const textarea = getByTestId('text-area') as HTMLTextAreaElement;
		const counter = getByTestId('text-area-counter');

		expect(textarea.value.length).toBe(500);
		expect(counter.textContent).toBe('500/500');
	});
});
