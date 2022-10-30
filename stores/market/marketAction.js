import axios from "axios";

export const GET_HOLDING_BEGIN = "GET_HOLDING_BEGIN";
export const GET_HOLDING_SUCCESS = "GET_HOLDING_SUCCESS";
export const GET_HOLDING_FAILURE = "GET_HOLDING_FAILURE";
export const GET_COIN_BEGIN = "GET_COIN_BEGIN";
export const GET_COIN_SUCCESS = "GET_COIN_SUCCESS";
export const GET_COIN_FAILURE = "GET_COIN_FAILURE";

// Holding / My Holdings

export const getHoldingBegin = () => ({
  type: GET_HOLDING_BEGIN,
});

export const getHoldingSuccess = (payload) => ({
  type: GET_HOLDING_SUCCESS,
  payload: payload,
});

export const getHoldingFailure = (err) => ({
  type: GET_HOLDING_FAILURE,
  payload: err,
});

export const getHoldings =
  (
    holdings,
    currency = "idr",
    orderBy = "market_cap_desc",
    sparkline = true,
    priceChangePercentage = "7d",
    perPage = 10,
    page = 1
  ) =>
  async (dispatch) => {
    // dispatch(loading(true));
    let ids = holdings
      .map((item) => {
        return item.id;
      })
      .join(",");
    try {
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${ids}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePercentage}`
        )
        .then((response) => {
          dispatch(getHoldingBegin());
          console.log("Get Holding", holdings);
          console.log(response);
          if (response.status === 200) {
            let myHoldings = response.data.map((item) => {
              let coin = holdings.find((a) => a.id == item.id);

              console.log("Coin", coin);

              let price7d =
                item.current_price /
                (1 + item.price_change_percentage_7d_in_currency * 0.01);

              return {
                id: item.id,
                symbol: item.symbol,
                name: item.name,
                image: item.image,
                current_price: item.current_price,
                qty: coin.qty,
                total: coin.qty * item.current_price,
                price_change_percentage_7d_in_currency:
                  item.price_change_percentage_7d_in_currency,
                holdings_value_change_7d:
                  (item.current_price - price7d) * coin.qty,
                sparkline_in_7d: {
                  value: item.sparkline_in_7d.price.map((price) => {
                    return price * coin.qty;
                  }),
                },
              };
            });
            dispatch(getHoldingSuccess(myHoldings));
          }
        });
    } catch (err) {
      dispatch(getHoldingFailure(err.message));
      console.log(err.message);
    }
  };

// Get Coin Market
export const getCoinBegin = () => ({
  type: GET_COIN_BEGIN,
});

export const getCoinSuccess = (payload) => ({
  type: GET_COIN_SUCCESS,
  payload: payload,
});

export const getCoinFailure = (err) => ({
  type: GET_COIN_FAILURE,
  payload: err,
});

export const getCoinMarkets =
  (
    currency = "idr",
    orderBy = "market_cap_desc",
    sparkline = true,
    priceChangePercentage = "7d",
    perPage = 10,
    page = 1
  ) =>
  async (dispatch) => {
    try {
      await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePercentage}`
      ).then((response) => {
        dispatch(getCoinBegin())
        if (response.status === 200) {
          dispatch(getCoinSuccess(response.data))
        } else {
          dispatch(getCoinFailure(response.data))
        }
      });
    } catch (error) {
      dispatch(getCoinFailure(error))
    }
  };
