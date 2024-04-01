import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const TextButton = ({
  buttonContainerStyle,
  label,
  labelStyle,
  icon,
  iconStyle,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...buttonContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={{ ...labelStyle }}>{label}</Text>
      <Image
        source={icon}
        style={{
          marginLeft: 5,
          width: 20,
          height: 20,
          tintColor: COLORS.black,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};

export default TextButton;
