import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { createRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderBar, TextButton } from "../components";
import { COLORS, constants, FONTS, icons, SIZES } from "../constants";
import { getCoinMarkets } from "../stores/market/marketAction";
import { MainLayout } from "./";
import { LineChart } from "react-native-chart-kit";
import { useRef } from "react";
import FormatRupiah from "../utils/Format/FormatRupiah";
import { useState } from "react";

const marketTabs = constants.marketTabs.map((marketTab) => ({
  ...marketTab,
  ref: createRef(),
}));

const TabIndicator = ({measureLayout, scrollX}) => {

  const inputRange = marketTabs.map((_, i) => i * SIZES.width)

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x)
  })

  return(
    <Animated.View 
      style={{ 
        position: 'absolute',
        left: 0,
        height: "100%",
        width: (SIZES.width - (SIZES.radius * 2)) / 2, 
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        transform: [{
          translateX
        }]
       }}
    />
  )
}

const Tabs = ({data, scrollX}) => {

  const [measures, setMeasures] = React.useState([]);
  const containerRef = useRef();

  console.log("Contaner Ref", containerRef);

  // React.useEffect(() => {
  //   let m = [];
  //   marketTabs.forEach((i) => {
  //     i.ref.current.measureLayout(
  //       containerRef.current,
  //       (x, y, width, height) => {
  //         m.push({x, y, width, height});
  //         console.log(x, y, width, height);
  //       },
  //     );
  //     if (m.length === data.length) {
  //       setMeasures(m);
  //     }
  //   });
  // }, []);
  

  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {/* Tab Indicator */}
      {measures.length > 0 && <TabIndicator measureLayout={measures} scrollX={scrollX}/>}

      {/* Tabs */}
      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`MarketTab-${index}`}
            style={{
              flex: 1,
            }}
          >
            <View
              ref={item.ref}
              style={{
                // paddingHorizontal: 5,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Market = () => {
  const dispatch = useDispatch();

  const coins = useSelector((state) => state.marketReducer.coins);

  useEffect(() => {
    return () => {
      dispatch(getCoinMarkets());
    };
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;

  function renderTabBar() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          // marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}
      >
        <Tabs 
          scrollX={scrollX}
        />
      </View>
    );
  }

  function renderButtons() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.radius,
          // marginHorizontal: SIZES.radius,
        }}
      >
        <TextButton label="IDR" />

        <TextButton
          label="% 7d"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />

        <TextButton
          label="Top"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
      </View>
    );
  }

  function renderList() {
    return (
      <Animated.FlatList
        data={marketTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}
            >
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  let priceColor =
                    item.price_change_percentage_7d_in_currency == 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;

                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        // paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius,
                      }}
                    >
                      {/* Coins */}
                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.h3,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>

                      {/* Line Charts */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                        }}
                      >
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                          width={85}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                        />
                      </View>

                      {/* Figures */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
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
                                  item.price_change_percentage_7d_in_currency >
                                  0
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
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  }

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Header */}
        <HeaderBar title="Market" />
        {/* Tab Bar */}
        {renderTabBar()}

        {/* Buttons */}
        {renderButtons()}

        {/* Market List */}
        {renderList()}
      </View>
    </MainLayout>
  );
};

export default Market;
