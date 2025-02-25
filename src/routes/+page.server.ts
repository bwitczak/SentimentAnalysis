import type { HFResponse } from '$lib/types/ApiTypes';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const sentimentText = formData.get('sentiment-text');

		const response = await fetch('/api/sentiment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(sentimentText)
		});

		if (!response.ok) {
			return { success: false, error: JSON.stringify(response) };
		}

		const data: HFResponse = await response.json();
		return { success: true, data: data[0][0] };
	}
};
