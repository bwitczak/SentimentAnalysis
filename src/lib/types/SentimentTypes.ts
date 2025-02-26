export enum LabelEnum {
	POSITIVE = 'POSITIVE',
	NEUTRAL = 'NEUTRAL',
	NEGATIVE = 'NEGATIVE',
	UNKNOWN = 'UNKNOWN'
}

export type Sentiment = {
	label: LabelEnum;
	score: number;
};
