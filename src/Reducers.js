export const resultsReducer = (state, action) => {
  switch (action.type) {
    case "DATA_FETCH_INIT":
      return {
        ...state,
        isFetched: false,
        isError: false,
        isLoading: true,
      };
    case "DATA_FETCH_SUCCESS":
      return {
        ...state,
        isFetched: true,
        isError: false,
        isLoading: false,
        data: action.payload,
      };
    case "DATA_FETCH_FAILURE":
      return {
        ...state,
        isFetched: false,
        isError: true,
        isLoading: false,
      };
    default:
      throw new Error();
  }
};
