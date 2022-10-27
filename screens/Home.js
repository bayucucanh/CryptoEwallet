import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BallanceInfo, IconTextButton } from "../components";
import { COLORS, icons, SIZES } from "../constants";
import dummyData from "../constants/dummy";
import { getHoldings } from "../stores/market/marketAction";
import { MainLayout } from "./";

const Home = () => {
  const dispatch = useDispatch();
  const totalWallet = useSelector((state) =>
    state.marketReducer.myHoldings.reduce((a, b) => a + (b.total || 0), 0)
  );
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
      console.log(totalWallet);
    })
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
            marginTop: 50,
          }}
        />

        {/* Buttons */}
        <View style={{
          flexDirection: 'row',
          marginTop: 30,
          marginBottom: -15,
          paddingHorizontal: SIZES.radius
        }}>
          <IconTextButton 
            label="Transfer"
            icon={icons.send}
            containerStyle={{ 
              flex: 1,
              height: 40,
              marginRight: SIZES.radius
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
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header - Wallet Info */}
        {renderWalletInfoSection()}
      </View>
    </MainLayout>
  );
};

export default Home;
