import * as marketActions from "./marketAction";

const initialState = {
  myHoldings: [],
  coins: [],
  error: null,
  loading: false,
};

const marketReducer = (state = initialState, action) => {
  switch (action.type) {
    case marketActions.GET_HOLDING_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case marketActions.GET_HOLDING_SUCCESS:
      return {
        ...state,
        myHoldings: action.payload,
      };
    case marketActions.GET_HOLDING_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case marketActions.GET_COIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case marketActions.GET_COIN_SUCCESS:
      return {
        ...state,
        coins: action.payload,
      };
    case marketActions.GET_COIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default marketReducer;
