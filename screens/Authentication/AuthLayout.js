import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AuthLayout = ({
  title,
  subtitle,
  titleContainerStyle,
  children,
  containerStyle,
}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: SIZES.padding,
        backgroundColor: "white",
        marginTop: 35,
        ...containerStyle,
      }}
    >
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/** App Icon */}
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/citizenx.png")}
            resizeMode="contain"
            style={{
              height: 60,
              width: 120,
            }}
          />
        </View>
        {/** Title & SubTitle */}
        <View
          style={{
            marginTop: SIZES.padding,
            ...titleContainerStyle,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: 20,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "black",
              marginTop: 2,
              fontWeight: "500",
              fontSize: 14,
            }}
          >
            {subtitle}
          </Text>
        </View>
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AuthLayout;
