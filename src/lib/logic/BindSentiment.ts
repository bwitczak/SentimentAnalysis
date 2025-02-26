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
import type { SentimentResult } from '$lib/types/BindSentimentTypes';
import { LabelEnum, type Sentiment } from '$lib/types/SentimentTypes';

export function evaluateSentiment(sentiment: Sentiment | undefined): SentimentResult {
	if (!sentiment) {
		return {
			icon: HeartCrack,
			message: ERROR_MESSAGE,
			proTip: ERROR_PROTIP
		};
	}

	if (sentiment.label === LabelEnum.POSITIVE && sentiment.score >= 0.75) {
		return {
			icon: VeryPositive,
			message: VERY_POSITIVE_MESSAGE,
			proTip: VERY_POSITIVE_PROTIP
		};
	} else if (sentiment.label === LabelEnum.POSITIVE && sentiment.score < 0.75) {
		return {
			icon: Positive,
			message: POSITIVE_MESSAGE,
			proTip: POSITIVE_PROTIP
		};
	} else if (sentiment.label === LabelEnum.NEGATIVE && sentiment.score < 0.75) {
		return {
			icon: Sad,
			message: SAD_MESSAGE,
			proTip: SAD_PROTIP
		};
	} else if (sentiment.label === LabelEnum.NEGATIVE && sentiment.score >= 0.75) {
		return {
			icon: Angry,
			message: ANGRY_MESSAGE,
			proTip: ANGRY_PROTIP
		};
	} else if (sentiment.label === LabelEnum.NEUTRAL) {
		return {
			icon: Neutral,
			message: NEUTRAL_MESSAGE,
			proTip: NEUTRAL_PROTIP
		};
	} else {
		return {
			icon: HeartCrack,
			message: UNEXPECTED_LABEL_MESSAGE,
			proTip: UNEXPECTED_LABEL_PROTIP
		};
	}
}
