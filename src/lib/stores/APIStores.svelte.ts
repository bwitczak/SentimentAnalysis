type FetchType = {
	isFetching: boolean;
};

export const fetching = $state<FetchType>({
	isFetching: false
});
