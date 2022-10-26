import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { COLORS, SIZES, icons } from "../constants";
import { IconTextButton } from "../components";
import { useDispatch, useSelector } from "react-redux";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch()
  const isTradeModalVisible = useSelector(
    (state) => state.tabReducer.isTradeModalVisible
  );

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }

    useDispatch
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 300],
  });

  return (
    <View style={{ flex: 1 }}>
      {children}

      {/* Modal */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          top: modalY,
          width: "100%",
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}
      >
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => console.log("Transfer")}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          onPress={() => console.log("Withdraw")}
          containerStyle={{
            marginTop: SIZES.base,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({});
