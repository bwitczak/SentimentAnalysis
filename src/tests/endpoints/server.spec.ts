import { LabelEnum } from '$lib/types/SentimentTypes';
import type { RequestHandler } from '@sveltejs/kit';
import * as kit from '@sveltejs/kit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '../../routes/api/sentiment/+server';

vi.mock('$env/static/private', () => ({
	HF_ACCESS_TOKEN: 'mocked-token'
}));

type MockResponse = {
	ok: boolean;
	status?: number;
	body?: unknown;
	json: () => Promise<unknown>;
};

describe('+server.ts', () => {
	let mockRequest: { json: () => Promise<string> };
	let mockFetch: ReturnType<typeof vi.fn>;
	let jsonSpy: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		vi.resetAllMocks();

		jsonSpy = vi.fn().mockImplementation((data: unknown) => {
			return { body: data };
		});

		vi.spyOn(kit, 'json').mockImplementation(jsonSpy);

		mockFetch = vi.fn();
		global.fetch = mockFetch as typeof global.fetch;

		mockRequest = {
			json: vi.fn().mockResolvedValue('Test text for sentiment analysis')
		};
	});

	it('Should return positive sentiment', async () => {
		const mockHfResponse: MockResponse = {
			ok: true,
			json: vi.fn().mockResolvedValue({
				label: LabelEnum.POSITIVE,
				score: 0.95
			})
		};
		mockFetch.mockResolvedValue(mockHfResponse);

		await (POST as RequestHandler)({
			request: mockRequest as Request,
			fetch: mockFetch as typeof fetch
		} as Parameters<RequestHandler>[0]);

		expect(mockFetch).toHaveBeenCalledWith(
			'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
			{
				method: 'POST',
				headers: {
					Authorization: 'Bearer mocked-token',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ inputs: 'Test text for sentiment analysis' })
			}
		);

		expect(jsonSpy).toHaveBeenCalledWith(
			{ label: LabelEnum.POSITIVE, score: 0.95 },
			{ status: 201 }
		);
	});

	it('Should return negative sentiment', async () => {
		const mockHfResponse: MockResponse = {
			ok: true,
			json: vi.fn().mockResolvedValue({
				label: LabelEnum.NEGATIVE,
				score: 0.87
			})
		};
		mockFetch.mockResolvedValue(mockHfResponse);

		await (POST as RequestHandler)({
			request: mockRequest as Request,
			fetch: mockFetch as typeof fetch
		} as Parameters<RequestHandler>[0]);

		expect(jsonSpy).toHaveBeenCalledWith(
			{ label: LabelEnum.NEGATIVE, score: 0.87 },
			{ status: 201 }
		);
	});

	it('Should handle unknown', async () => {
		const mockHfResponse: MockResponse = {
			ok: true,
			json: vi.fn().mockResolvedValue({
				label: 'UNEXPECTED_LABEL',
				score: 0.5
			})
		};
		mockFetch.mockResolvedValue(mockHfResponse);

		await (POST as RequestHandler)({
			request: mockRequest as Request,
			fetch: mockFetch as typeof fetch
		} as Parameters<RequestHandler>[0]);

		expect(jsonSpy).toHaveBeenCalledWith({ label: LabelEnum.UNKNOWN, score: 0.5 }, { status: 201 });
	});

	it('Should return error if HF API fails', async () => {
		const mockErrorResponse: MockResponse = {
			ok: false,
			status: 500,
			body: 'Internal Server Error',
			json: vi.fn()
		};
		mockFetch.mockResolvedValue(mockErrorResponse);

		await (POST as RequestHandler)({
			request: mockRequest as Request,
			fetch: mockFetch as typeof fetch
		} as Parameters<RequestHandler>[0]);

		expect(jsonSpy).toHaveBeenCalledWith({ error: 'Internal Server Error' }, { status: 500 });
	});
});
