import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useCallback } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { BallanceInfo, Chart } from "../components";
import { COLORS, dummyData, FONTS, icons, SIZES } from "../constants";
import { getCoinMarkets, getHoldings } from "../stores/market/marketAction";
import FormatRupiah from "../utils/Format/FormatRupiah";
import { MainLayout } from "./";

const Portfolio = () => {
  const dispatch = useDispatch();

  // Selector
  const myHoldings = useSelector((state) => state.marketReducer.myHoldings);

  const totalWallet = useSelector((state) =>
    state.marketReducer.myHoldings.reduce((a, b) => a + (b.total || 0), 0)
  );
  const coins = useSelector((state) => state.marketReducer.coins);

  const valueChange = useSelector((state) =>
    state.marketReducer.myHoldings.reduce(
      (a, b) => a + (b.holdings_value_change_7d || 0),
      0
    )
  );
  const perChange = (valueChange / (totalWallet - valueChange)) * 100;

  useFocusEffect(
    useCallback(() => {
      dispatch(getHoldings(dummyData.holdings));
      dispatch(getCoinMarkets());
      console.log(totalWallet);
    }, [])
  );

  const renderCurrentBallanceSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        <Text
          style={{ marginTop: 5, color: COLORS.white, ...FONTS.largeTitle }}
        >
          Portfolio
        </Text>
        <BallanceInfo
          title="Current Ballence"
          displayAmount={totalWallet}
          changePct={perChange}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        />
      </View>
    );
  };

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header - Current Ballance */}
        {renderCurrentBallanceSection()}

        {/* Chart */}
        <Chart
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          chartPrices={myHoldings[0].sparkline_in_7d?.value}
        />

        {/* Your Assets */}
        <FlatList
          data={myHoldings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              {/* Section Title */}
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  fontSize: 18,
                }}
              >
                Your Assets
              </Text>

              {/* Header Label */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.radius,
                }}
              >
                <Text style={{ flex: 1, color: COLORS.lightGray3 }}>
                  Assets
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: "right",
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: "right",
                  }}
                >
                  Holdings
                </Text>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;

            return (
              <TouchableOpacity style={{ flexDirection: "row", height: 55 }}>
                {/* Assets */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: SIZES.radius,
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                {/* Price */}
                <View style={{ 
                  flex: 1,
                  justifyContent: 'center'
                 }}>
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15
                    }}
                  >
                    Rp.{FormatRupiah(item.current_price)}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {item.price_change_percentage_7d_in_currency != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{ rotate: "45deg" }]
                              : [{ rotate: "125deg" }],
                        }}
                      />
                    )}
                    <Text
                      style={{
                        marginLeft: 5,
                        color: priceColor,
                        ...FONTS.body5,
                        lineHeight: 15,
                      }}
                    >
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}
                    </Text>
                  </View>
                </View>
                {/* Holdings */}
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'right', color: COLORS.white, ...FONTS.h4, lineHeight: 15 }}>
                    Rp.{FormatRupiah(item.total)}
                  </Text>
                  <Text style={{ 
                    textAlign: 'right',
                    color: COLORS.lightGray3,
                    ...FONTS.body5,
                    lineHeight: 15
                   }}>
                    {item.qty} {item.symbol.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<View style={{ marginBottom: 50 }}></View>}
        />
      </View>
    </MainLayout>
  );
};

export default Portfolio;
