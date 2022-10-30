import React from "react";
import { Dimensions, View, Text } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
  ChartXLabel,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";
import moment from "moment/moment";
import { COLORS, FONTS, SIZES } from "../constants";

const Chart = ({ containerStyle, chartPrices }) => {

  // console.log("chartPrices", chartPrices);

  // Points
  let startUnixTimestamp = moment().subtract(7, "day").unix();
  let data = chartPrices
    ? chartPrices?.map((item, index) => {
        return {
          x: startUnixTimestamp + (index + 1) * 3600,
          y: item,
        };
      })
    : [];

  let points = monotoneCubicInterpolation({ data, range: 40 });

  const formatIDR = (value) => {
    "worklet";

    if (value === "") {
      return "";
    }

    return `$${Number(value).toFixed(2)}`;
  };

  const formatDateTime = (value) => {
    "worklet";

    if (value === "") {
      return "";
    }

    var selectedDate = new Date(value * 1000);

    let date = `0${selectedDate.getDate()}`.slice(-2);
    let month = `0${selectedDate.getMonth() + 1}`.slice(-2);

    return `${date} / ${month}`;
  };

  const formatNumber = (value, roundedPoint) => {

    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundedPoint)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundedPoint)}M`;
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(roundedPoint)}K`;
    } else {
      return value.toFixed(roundedPoint);
    }
  };

  const getAxisYLabelValues = () => {
    if (chartPrices != undefined) {
      let minValue = Math.min(...chartPrices);
      let maxValue = Math.max(...chartPrices);

      let midValue = (minValue + maxValue) / 2;

      let higherMidValue = (maxValue + midValue) / 2;
      let lowerMidValue = (minValue + midValue) / 2;

      let roundedPoint = 2;

      return [
        formatNumber(maxValue, roundedPoint),
        formatNumber(higherMidValue, roundedPoint),
        formatNumber(lowerMidValue, roundedPoint),
        formatNumber(minValue, roundedPoint),
      ];
    } else {
      return [];
    }
  };


  return (
    <View style={{ ...containerStyle }}>
      {/* Y Axis Label */}
      <View
        style={{
          position: "absolute",
          left: SIZES.padding,
          top: 0,
          bottom: 0,
          justifyContent: "space-between",
        }}
      >
        {getAxisYLabelValues().map((item, index) => {
          return (
            <Text
              key={index}
              style={{
                color: COLORS.lightGray3,
                ...FONTS.body4,
              }}
            >
              {item}
            </Text>
          );
        })}
      </View>

      {/* Chart */}
      {data.length > 0 && (
        <ChartPathProvider data={{ points, smoothingStrategy: "bezier" }}>
          <ChartPath
            height={150}
            width={SIZES.width}
            stroke={COLORS.lightGreen}
            strokeWidth={2}
          />
          <ChartDot>
            <View
              style={{
                position: "absolute",
                left: -35,
                width: 80,
                alignItems: "center",
                backgroundColor: COLORS.transparentBlack1,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  backgroundColor: COLORS.white,
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGreen,
                  }}
                ></View>
              </View>

              {/* Chart Y - Label */}
              <ChartYLabel
                format={formatIDR}
                style={{
                  color: COLORS.white,
                  ...FONTS.body5,
                }}
              />
              <ChartXLabel
                format={formatDateTime}
                style={{
                  marginTop: -30,
                  color: COLORS.lightGray3,
                  ...FONTS.body5,
                  lineHeight: 15,
                }}
              />
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
};

export default Chart;
