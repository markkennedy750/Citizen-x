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
          <Text style={styles.subTitleContainer}>
            Create your Citizen X account, join as a citizen or journalist.
          </Text>
        </View>

        <TextButton
          label="Sign In as a Citizen"
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
          onPress={() => navigation.navigate("SignIn")}
        />

        <TextButton
          label="Sign In as a Journalist"
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
            textAlign: "center",
          }}
          onPress={() => navigation.navigate("SignIn")}
        />

        <View
          style={{
            marginTop: SIZES.radius,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.darkGray,
              fontWeight: "600",
              fontSize: 18,
            }}
          >
            Don't have an acount?
          </Text>

          <TextButton
            label="SignUp as citizen/Journalist "
            buttonContainerStyle={{
              marginLeft: 5,
              marginRight: 4,
              backgroundColor: null,
            }}
            labelStyle={{
              color: "#0E9C67",
              fontWeight: "700",
              fontSize: 17,
            }}
            onPress={() => navigation.navigate("InitialSignUp")}
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
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 24,
  },
  subTitleContainer: {
    marginTop: SIZES.padding * 0.3,
    color: COLORS.darkGray2,
    fontSize: 14,
    lineHeight: 19,
  },
  imageTitle: {
    fontSize: 17,
  },
});
