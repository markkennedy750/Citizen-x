import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
//import { AuthLayout } from "../";
import { SIZES, COLORS, icons } from "../../constants";
import FormInput from "../../components/FormInput";
import TextButton from "../../components/TextButton";
import { utils } from "../../utils";
import AuthLayoutSignUp from "./AuthLayoutSignUp";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  function isEnableSendEmail() {
    return email != "" && emailError == "";
  }

  return (
    <AuthLayoutSignUp
      title="Password Recovery"
      subtitle="Please enter your email address to recover your password"
      titleContainerStyle={{
        marginTop: StatusBar.currentHeight || 45,
      }}

    >
      {/** Form Input */}

      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}
      >
        <FormInput
          label="Email"
          keyboardType="email-address"
          autoCompleteType="email"
          onChange={(value) => {
            // validate email
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          errorMsg={emailError}
          appendComponent={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  email == "" || (email != "" && emailError == "")
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    email == ""
                      ? COLORS.gray
                      : email != "" && emailError == ""
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
      </View>

      {/** Button */}
      <TextButton
        label="Send Email"
        disabled={isEnableSendEmail() ? false : true}
        buttonContainerStyle={{
          height: 55,
          alignItems: "center",
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: isEnableSendEmail() ? "#0E9C67" : COLORS.invisible,
        }}
        labelStyle={{
          color: COLORS.white,
          fontWeight: "700",
          fontSize: 17,
        }}
        onPress={() => navigation.navigate("Otp")}
      />
    </AuthLayoutSignUp>
  );
};

export default ForgotPassword;
