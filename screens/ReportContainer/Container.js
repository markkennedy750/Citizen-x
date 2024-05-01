// ReportContainer.js
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Container = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.primaryContainer}
      onPress={() => navigation.navigate(item.navigation)}
    >
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default Container;

const styles = StyleSheet.create({
  primaryContainer: {
    width: 100,
    height: 97,
    margin: 5,
    borderRadius: 5,
    paddingTop: 5,
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "80%",
    //marginBottom: 5,
  },
  text: {
    color: "black",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 10,
  },
});
