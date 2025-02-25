import { HF_ACCESS_TOKEN } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const HF_ENDPOINT =
	'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const body = await request.json();

	const hfResposnse = await fetch(HF_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${HF_ACCESS_TOKEN}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ inputs: body })
	});

	if (!hfResposnse.ok) {
		return json({ error: hfResposnse.body }, { status: hfResposnse.status });
	}

	const data = await hfResposnse.json();

	return json(data, { status: 201 });
};
