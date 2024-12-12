import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { SIZES, COLORS } from "../constants";
import TextButton from "../components/TextButton";

const { width, height } = Dimensions.get("window");

const InitialSignIn = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.semiContainer}>
        <Image
          source={require("../assets/citizenx.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.imageTitle}>Citizen X</Text>

        <View style={styles.textContainer}>
          <Text style={styles.titleContainer}>
            Be part of the Citizen X community, become the force for change.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TextButton
            label="Create an account"
            buttonContainerStyle={styles.createAccountButton}
            labelStyle={styles.createAccountLabel}
            onPress={() => navigation.navigate("SignUpMethod")}
          />
          <TextButton
            label="Continue without an account"
            buttonContainerStyle={styles.continueButton}
            labelStyle={styles.continueLabel}
            onPress={() => navigation.navigate("AnonymousFeed")}
          />
        </View>

        <View style={styles.signInContainer}>
          <Text style={styles.alreadyAccountText}>
            Already have an account?
          </Text>
          <TextButton
            label="Sign In"
            buttonContainerStyle={styles.signInButton}
            labelStyle={styles.signInLabel}
            onPress={() => navigation.navigate("SignIn")}
          />
        </View>
      </View>
    </View>
  );
};

export default InitialSignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B7FF9D33",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  semiContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: height * 0.05, // Adjust based on screen height
  },
  logo: {
    height: height * 0.1, // Relative to screen height
    width: width * 0.4, // Relative to screen width
  },
  imageTitle: {
    fontSize: SIZES.font, // Dynamically adjust font size
    marginTop: 10,
  },
  textContainer: {
    marginTop: height * 0.03,
    alignItems: "center",
  },
  titleContainer: {
    color: COLORS.darkGray,
    fontWeight: "800",
    fontSize: SIZES.large, // Use scalable sizes
    textAlign: "center",
    lineHeight: 25,
  },
  buttonContainer: {
    width: "100%",
    marginTop: height * 0.05,
    marginBottom: height * 0.1,
  },
  createAccountButton: {
    height: 55,
    justifyContent: "center",
    borderRadius: SIZES.radius,
    backgroundColor: "#0E9C67",
    width: "100%",
    marginBottom:SIZES.padding
  },
  createAccountLabel: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: SIZES.medium,
  },
  continueButton: {
    height: 55,
    justifyContent: "center",
    borderRadius: SIZES.radius,
    borderWidth: 2,
    marginTop: 10,
    width: "100%",
  },
  continueLabel: {
    color: "black",
    fontWeight: "700",
    fontSize: SIZES.medium,
    textAlign: "center",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: "auto",
  },
  alreadyAccountText: {
    color: COLORS.darkGray,
    fontWeight: "700",
    fontSize: SIZES.small,
    marginRight: 5,
  },
  signInButton: {
    backgroundColor: null,
  },
  signInLabel: {
    color: "#0E9C67",
    fontWeight: "700",
    fontSize: SIZES.medium,
  },
});
