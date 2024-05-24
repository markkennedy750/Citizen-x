import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SIZES, COLORS } from "../constants";
import TextButton from "../components/TextButton";

const InitialSignIn = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.semiContainer}>
        <Image
          source={require("../assets/citizenx.png")}
          resizeMode="contain"
          style={{
            height: 75,
            width: 150,
          }}
        />
        <Text style={styles.imageTitle}>Citizen x</Text>

        <View style={styles.textContainer}>
          <Text style={styles.titleContainer}>
            Be part of the Citizen X community, become the force for change.
          </Text>
        </View>

        <View style={styles.buttomTextButton}>
          <TextButton
            label="Create an account"
            //disabled={isEnableSignUp() ? false : true}
            buttonContainerStyle={{
              height: 55,
              alignItems: "center",
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: "#0E9C67",
              width: "100%",
            }}
            labelStyle={{
              color: COLORS.white,
              fontWeight: "700",
              fontSize: 17,
            }}
            onPress={() => navigation.navigate("SignUp")}
          />
          <TextButton
            label="Continue without an account"
            //disabled={isEnableSignUp() ? false : true}
            buttonContainerStyle={{
              height: 55,
              alignItems: "center",
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: null,
              borderWidth: 2,
              width: "100%",
            }}
            labelStyle={{
              color: "black",
              fontWeight: "700",
              fontSize: 17,
              textAlign: "center",
            }}
            onPress={() => navigation.navigate("MainScreen")}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            marginTop: 35,
          }}
        >
          <Text
            style={{
              color: COLORS.darkGray,
              fontWeight: "700",
              fontSize: 15,
              marginRight: 5,
            }}
          >
            Already have an account?
          </Text>
          <TextButton
            label="Sign In"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: "#0E9C67",
              fontWeight: "700",
              fontSize: 18,
            }}
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
    paddingVertical: SIZES.padding,
    backgroundColor: "white",
    backgroundColor: "#B7FF9D33",
  },
  semiContainer: {
    flex: 1,
    marginTop: SIZES.padding * 3,
    paddingTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
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
