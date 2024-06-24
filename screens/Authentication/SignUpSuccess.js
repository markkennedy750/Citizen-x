import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import React from "react";
import { icons, COLORS, SIZES } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import TextButton from "../../components/TextButton";

const SignUpSuccess = ({ navigation, route }) => {
  console.log("Route Params:", route.params);
  const { fullname, email, phoneNumber, password, username } =
    route.params || {};

  if (!fullname || !email || !phoneNumber || !password || !username) {
    console.error("Missing signup information");
    return (
      <View style={styles.container}>
        <Text>Error: Missing signup information. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image source={icons.SignUpSuccess} style={styles.image} />
        <View style={styles.textConatiner}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 23,
              lineHeight: 28,
              textAlign: "center",
            }}
          >
            SignUp Successful
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 17,
              lineHeight: 20,
              textAlign: "center",
            }}
          >
            Welcome, {fullname}!
          </Text>
        </View>
        <TextButton
          label="Continue"
          buttonContainerStyle={{
            height: 55,
            width: 300,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 65,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          labelStyle={{
            color: COLORS.white,
            fontWeight: "700",
            fontSize: 17,
          }}
          onPress={() => navigation.navigate("MainScreen")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 45,
    backgroundColor: COLORS.white2,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textConatiner: {
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 260,
    height: 260,
  },
});

export default SignUpSuccess;
