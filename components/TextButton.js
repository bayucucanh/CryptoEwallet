import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS } from "../constants";

const TextButton = ({label, containerStyle}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: 3,
        paddingHorizontal: 18,
        borderRadius: 15,
        backgroundColor: COLORS.gray1,
        ...containerStyle
      }}
    >
      <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({});
