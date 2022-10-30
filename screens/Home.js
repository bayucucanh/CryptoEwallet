import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StatusBar, FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { BallanceInfo, Chart, IconTextButton } from "../components";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import dummyData from "../constants/dummy";
import { getCoinMarkets, getHoldings } from "../stores/market/marketAction";
import FormatRupiah from "../utils/Format/FormatRupiah";
import { MainLayout } from "./";

const Home = () => {
  const dispatch = useDispatch();

  // State
  const [selectedCoin, setSelectedCoin] = useState(null);

  // Selector
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

  const renderWalletInfoSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        {/* Ballance Info */}
        <BallanceInfo
          title="Your Wallet"
          displayAmount={totalWallet}
          changePct={perChange}
          containerStyle={{
            marginTop: 5,
          }}
        />

        {/* Buttons */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
            onPress={() => console.log("Transfer")}
          />
          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              height: 40,
            }}
            onPress={() => console.log("Withdraw")}
          />
        </View>
      </View>
    );
  };

  return (
    <MainLayout>
      <StatusBar animated={true} backgroundColor={COLORS.gray} />
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header - Wallet Info */}
        {renderWalletInfoSection()}

        {/* Chart */}     
        <Chart
          containerStyle={{
            marginTop: 17 * 2,
          }}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d.price
              : coins[0]?.sparkline_in_7d?.price
          }
        />

        {/* Top Currency */}
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  fontSize: 18,
                }}
              >
                Top Cryptocurrency
              </Text>
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
              <TouchableOpacity
                style={{
                  height: 55,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setSelectedCoin(item)}
              >
                {/* Logo */}
                <View
                  style={{
                    width: 35,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {item.name}
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.h4,
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
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<View style={{ marginBottom: 50 }}></View>}
        />
      </View>
    </MainLayout>
  );
};

export default Home;
