import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { icons } from "../../constants";

const NetworkError = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image
        source={icons.networkSignal}
        style={{ width: 100, height: 100, alignSelf: "center" }}
        resizeMode="contain"
      />
      <Text style={{ color: "red", fontSize: 18, fontWeight: "600" }}>
        ERROR!!!
      </Text>
    </View>
  );
};

export default NetworkError;
