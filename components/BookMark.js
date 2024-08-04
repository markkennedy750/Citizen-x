import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { COLORS, icons } from "../constants";

const BookMark = () => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", paddingTop: 70, flex: 1 }}>
        <Image
          source={icons.hourlessglass}
          resizeMode="cover"
          style={{ width: 80, height: 80, tintColor: COLORS.primary }}
        />
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
