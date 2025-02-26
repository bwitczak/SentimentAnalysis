import { HF_ACCESS_TOKEN } from '$env/static/private';

import { LabelEnum, type Sentiment } from '$lib/types/SentimentTypes';
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

	const label: LabelEnum = Object.values(LabelEnum).includes(data.label as LabelEnum)
		? (data.label as LabelEnum)
		: LabelEnum.UNKNOWN;

	return json({ label: label, score: data.score }, { status: 201 });
};
