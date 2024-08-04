import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { FONTS, SIZES, COLORS } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation } from "@react-navigation/native";



export default function AuthLayoutSignUp({
  children,
  title,
  subTitle,
  steps = "",
  //show = false,
  containerStyle,
  screen,
}) {
  //const { navigation } = useNavigation();

 

  return (
    <View style={{ ...styles.layoutContainer, ...containerStyle }}>
      
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 15,
        }}
      >
        <View style={styles.textContainer}>
          <Text
            style={{
              fontWeight: "800",
              fontSize: 14,
              color: COLORS.primary,
              lineHeight: 16,
            }}
          >
            {steps}
          </Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 24,
              lineHeight: 33.3,
              marginVertical: 5,
            }}
          >
            {title}
          </Text>
          <Text style={{ fontWeight: "500", fontSize: 14, lineHeight: 19 }}>
            {subTitle}
          </Text>
        </View>
        {children}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 45,
    //backgroundColor: "white",

    //paddingHorizontal:5
  },
  textContainer: {
    marginTop: 5,
  },
});
