enum LabelEnum {
	POSITIVE,
	NEUTRAL,
	NEGATIVE
}

export type Sentiment = {
	label: LabelEnum;
	score: number;
};

export type HFResponse = Sentiment[][];
