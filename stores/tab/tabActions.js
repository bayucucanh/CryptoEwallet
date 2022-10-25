export const SET_TRADE_MODAL_VISIBILTY = "SET_TRADE_MODAL_VISIBILTY"

export const setTradeModalVisibilitySuccess = (isVisible) => ({
  type: SET_TRADE_MODAL_VISIBILTY,
  payload: isVisible
})

export const setTradeModalVisibility = (isVisible) => async (dispatch) => {
  dispatch(setTradeModalVisibilitySuccess(isVisible))
};