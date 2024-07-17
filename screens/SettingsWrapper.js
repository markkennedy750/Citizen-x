import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants";
import * as Font from "expo-font";


const SettingsWrapper = ({ title, containerStyle, children }) => {
  const navigation = useNavigation();
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        ...AntDesign.font,
      });
    };
    loadFonts();
  }, []);
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

export default SettingsWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight || 45,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 15,
  },
  titleText: {
    marginLeft: 35,
    fontWeight: "700",
    fontSize: 20,
    color: COLORS.primary,
  },
});
