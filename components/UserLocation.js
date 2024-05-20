import { Platform, View, Text } from "react-native";
import React, { useState } from "react";
import TextIconButton from "./TextIconButton";
import { COLORS, SIZES, icons } from "../constants";
import * as Location from "expo-location";

const UserLocation = ({ location, setLocation }) => {
  //const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    let text = "Waiting..";
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      setLocation(text);
    }
  }
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        marginVertical: 15,
      }}
    >
      <TextIconButton
        containerStyle={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          borderWidth: 1,
          borderColor: COLORS.primary,
          width: 250,
        }}
        icon={icons.location}
        iconPosition="LEFT"
        iconStyle={{
          tintColor: COLORS.primary,
        }}
        label="Use my current location"
        labelStyle={{
          marginLeft: SIZES.radius,
          color: COLORS.primary,
        }}
        onPress={() => getLocation()}
      />
    </View>
  );
};

export default UserLocation;
