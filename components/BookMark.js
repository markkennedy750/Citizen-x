import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "../constants";
import * as Font from "expo-font";

const BookMark = () => {
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        ...FontAwesome6.font,
      });
    };

    loadFonts();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", paddingTop: 70, flex: 1 }}>
        <FontAwesome6 name="hourglass-empty" size={80} color={COLORS.primary} />
        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 10 }}>
          Your Bookmark is empty
        </Text>
      </View>
    </View>
  );
};

export default BookMark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: COLORS.white,
  },
});
