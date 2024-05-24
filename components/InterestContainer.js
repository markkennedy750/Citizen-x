import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const InterestContainer = ({ id, title }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default InterestContainer;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1.8,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderColor:COLORS.primary
  },
  text: {
    marginHorizontal: 10,
    color:COLORS.primary,
    fontWeight:"700",
    fontSize:14
  },
});
