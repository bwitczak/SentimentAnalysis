import { HF_ACCESS_TOKEN } from '$env/static/private';
import type { Sentiment } from '$lib/types/ApiTypes';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const HF_ENDPOINT =
	'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const sentimentText: string = await request.json();

	const hfResposnse = await fetch(HF_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${HF_ACCESS_TOKEN}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ inputs: sentimentText })
	});

	if (!hfResposnse.ok) {
		return json({ error: hfResposnse.body }, { status: hfResposnse.status });
	}

	const data: Sentiment = await hfResposnse.json();

	return json(data, { status: 201 });
};
