import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { icons } from "../../constants";

const ErrorImage = () => {
  return (
    <View style={{  alignItems: "center", justifyContent: "center" }}>
      <Image
        source={icons.erroricon}
        style={{ width: 160, height: 160, alignSelf: "center" }}
        resizeMode="contain"
      />
      <Text style={{ color: "red", fontSize: 25, fontWeight: "600" }}>
        ERROR!!!
      </Text>
    </View>
  );
};

export default ErrorImage;
