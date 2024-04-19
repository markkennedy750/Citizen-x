import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { SIZES, COLORS } from "../../constants";
import TextButton from "../../components/TextButton";

const SignUpMethods = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text> sign up</Text>
    </SafeAreaView>
  );
};

export default SignUpMethods;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.padding,
    backgroundColor: "white",
    backgroundColor: "#B7FF9D33",
  },
  semiContainer: {
    flex: 1,
    marginTop: SIZES.padding * 3,
    padding: SIZES.padding,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginTop: SIZES.padding * 2.3,
    alignItems: "center",
  },
  titleContainer: {
    color: COLORS.darkGray,
    fontWeight: "800",
    fontSize: 22,
    lineHeight: 24,
  },
  subTitleContainer: {
    marginTop: SIZES.padding * 1,
    color: COLORS.darkGray2,
    fontSize: 22,
    lineHeight: 24,
  },
  imageTitle: {
    fontSize: 17,
  },
  buttomTextButton: {
    width: "100%",
    marginTop: 5,
    marginBottom: 140,
  },
});
