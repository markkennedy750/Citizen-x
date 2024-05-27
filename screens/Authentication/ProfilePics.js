import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AuthLayoutSignUp from "./AuthLayoutSignUp";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import TextButton from "../../components/TextButton";

const ProfilePics = ({ navigation }) => {
  return (
    <AuthLayoutSignUp
      steps="Personalization"
      title="Add Profile Photo"
      subTitle="Add your preferred picture or avatar "
      containerStyle={{
        paddingTop: 35,
      }}
      show={false}
    >
      <View
        style={{
          flex: 1,
          marginTop: 45,
        }}
      >
        <TouchableOpacity style={styles.imageContainer} onPress={() => {}}>
          <Ionicons
            name="person-circle-outline"
            size={90}
            color={COLORS.gray}
          />

          <Text style={styles.text}>Add Profile Photo</Text>
        </TouchableOpacity>

        <TextButton
          label="Next"
          //disabled={isEnableSignUp() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 35,
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
    </AuthLayoutSignUp>
  );
};

export default ProfilePics;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 19.6,
    marginRight: 95,
    color: COLORS.primary,
  },
});
