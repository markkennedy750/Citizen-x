import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import React from "react";
import { icons, COLORS, SIZES } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import TextButton from "../../components/TextButton";

const SignUpSuccess = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        {/**<AntDesign name="checkcircle" size={200} color={COLORS.primary} />**/}
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
            Verification Successful
          </Text>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 14,
              lineHeight: 20,
              textAlign: "center",
            }}
          >
            The code has been verified.
          </Text>
        </View>
        <TextButton
          label="Continue"
          //disabled={isEnableSignUp() ? false : true}
          buttonContainerStyle={{
            height: 55,
            //marginHorizontal: 15,
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
          onPress={() => navigation.navigate("UserName")}
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
