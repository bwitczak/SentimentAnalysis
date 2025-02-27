import {
	ANGRY_MESSAGE,
	ANGRY_PROTIP,
	ERROR_MESSAGE,
	ERROR_PROTIP,
	NEUTRAL_MESSAGE,
	NEUTRAL_PROTIP,
	POSITIVE_MESSAGE,
	POSITIVE_PROTIP,
	SAD_MESSAGE,
	SAD_PROTIP,
	UNEXPECTED_LABEL_MESSAGE,
	UNEXPECTED_LABEL_PROTIP,
	VERY_POSITIVE_MESSAGE,
	VERY_POSITIVE_PROTIP
} from '$lib/consts/BindSentimentConsts';
import Angry from '$lib/icons/Angry.svelte';
import HeartCrack from '$lib/icons/HeartCrack.svelte';
import Neutral from '$lib/icons/Neutral.svelte';
import Positive from '$lib/icons/Positive.svelte';
import Sad from '$lib/icons/Sad.svelte';
import VeryPositive from '$lib/icons/VeryPositive.svelte';
import { evaluateSentiment } from '$lib/logic/BindSentiment';
import { LabelEnum } from '$lib/types/SentimentTypes';
import { describe, expect, it } from 'vitest';

describe('BindSentiment.ts', () => {
	it('should return error result when sentiment is undefined', () => {
		const result = evaluateSentiment(undefined);
		expect(result).toEqual({
			icon: HeartCrack,
			message: ERROR_MESSAGE,
			proTip: ERROR_PROTIP
		});
	});

	it('should return very positive result for high positive sentiment', () => {
		const result = evaluateSentiment({ label: LabelEnum.POSITIVE, score: 0.8 });
		expect(result).toEqual({
			icon: VeryPositive,
			message: VERY_POSITIVE_MESSAGE,
			proTip: VERY_POSITIVE_PROTIP
		});
	});

	it('should return positive result for lower positive sentiment', () => {
		const result = evaluateSentiment({ label: LabelEnum.POSITIVE, score: 0.7 });
		expect(result).toEqual({
			icon: Positive,
			message: POSITIVE_MESSAGE,
			proTip: POSITIVE_PROTIP
		});
	});

	it('should return slightly negative result for low negative sentiment', () => {
		const result = evaluateSentiment({ label: LabelEnum.NEGATIVE, score: 0.7 });
		expect(result).toEqual({
			icon: Sad,
			message: SAD_MESSAGE,
			proTip: SAD_PROTIP
		});
	});

	it('should return strongly negative result for high negative sentiment', () => {
		const result = evaluateSentiment({ label: LabelEnum.NEGATIVE, score: 0.8 });
		expect(result).toEqual({
			icon: Angry,
			message: ANGRY_MESSAGE,
			proTip: ANGRY_PROTIP
		});
	});

	it('should return neutral result for neutral sentiment', () => {
		const result = evaluateSentiment({ label: LabelEnum.NEUTRAL, score: 0.5 });
		expect(result).toEqual({
			icon: Neutral,
			message: NEUTRAL_MESSAGE,
			proTip: NEUTRAL_PROTIP
		});
	});

	it('should return unexpected sentiment result for invalid input', () => {
		const result = evaluateSentiment({ label: LabelEnum.UNKNOWN, score: 0.5 });
		expect(result).toEqual({
			icon: HeartCrack,
			message: UNEXPECTED_LABEL_MESSAGE,
			proTip: UNEXPECTED_LABEL_PROTIP
		});
	});
});
