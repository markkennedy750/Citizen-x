import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SIZES, COLORS, icons } from "../../constants";
import FormInput from "../../components/FormInput";
import TextButton from "../../components/TextButton";
import { utils } from "../../utils";
import AuthLayoutSignUp from "./AuthLayoutSignUp";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [fullName, setFullName] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  function isEnableSignUp() {
    return (
      email !== "" &&
      password !== "" &&
      fullName !== "" &&
      emailError === "" &&
      passwordError === "" &&
      phoneNumberError === "" &&
      fullNameError === ""
    );
  }
  return (
    <AuthLayoutSignUp
      steps="Step 1 of 2"
      title="Create your Account"
      subTitle="Create your Citizen X account and be part of the journey."
      show={true}
      //screen="SignUpMethod"
    >
      {/** Form Inputs and Sign Up */}

      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding,
        }}
      >
        <FormInput
          label="Email"
          keyboardType="email-address"
          placeholder="ObiShegunAminu@mail.com"
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

        <FormInput
          label="Full Name"
          placeholder="Obi Shegun Aminu"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          onChange={(value) => {
            setFullName(value);
          }}
          errorMsg={fullNameError}
          appendComponent={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  fullName == "" || (fullName != "" && fullNameError == "")
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    fullName == ""
                      ? COLORS.gray
                      : fullName != "" && fullNameError == ""
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
        {/** TODO: Fix Phone Number */}
        <FormInput
          label="Phone Number"
          inputMode="numeric"
          placeholder="08063XXXXXX"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          onChange={(value) => {
            utils.validatePhoneNumber(value, setPhoneNumberError);
            setPhoneNumber(value);
          }}
          errorMsg={phoneNumberError}
          appendComponent={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  phoneNumber == "" ||
                  (phoneNumber != "" && phoneNumberError == "")
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    phoneNumber == ""
                      ? COLORS.gray
                      : phoneNumber != "" && phoneNumberError == ""
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />

        <FormInput
          label="Password"
          secureTextEntry={!showPass}
          placeholder="!12$ogiQ0L"
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          onChange={(value) => {
            utils.validatePassword(value, setPasswordError);
            setPassword(value);
          }}
          errorMsg={passwordError}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
              onPress={() => setShowPass(!showPass)}
            >
              <Image
                source={showPass ? icons.eye_close : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        />

        {/** Sign Up & Sign In */}
        <TextButton
          label="Sign Up"
          disabled={isEnableSignUp() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignUp() ? "#0E9C67" : COLORS.invisible,
          }}
          labelStyle={{
            color: COLORS.white,
            fontWeight: "700",
            fontSize: 17,
          }}
          onPress={() => navigation.navigate("ProfilePics")}
        />

        <View
          style={{
            flexDirection: "row",
            marginTop: 67,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.darkGray,
              fontWeight: "700",
              fontSize: 15,
              //marginRight: 2,
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

      {/** Footer */}
    </AuthLayoutSignUp>
  );
};

export default SignUp;
