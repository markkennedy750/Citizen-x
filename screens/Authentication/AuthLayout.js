import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { SIZES, COLORS } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";



const AuthLayout = ({
  title,
  subtitle,
  titleContainerStyle,
  children,
  containerStyle,
}) => {
  const { navigation } = useNavigation();
 
  return (
    <View
      style={{
        flex: 1,
        //paddingVertical: SIZES.padding,
        backgroundColor: "white",
        marginTop: StatusBar.currentHeight || 45,
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
            marginTop: 15,
          }}
        >
          <Image
            source={require("../../assets/citizenx.png")}
            resizeMode="contain"
            style={{
              height: 50,
              width: 50,
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
              fontWeight: "700",
              fontSize: 16,
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
