import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { AuthLayout } from "../";
import { SIZES, COLORS, icons } from "../../constants";
import FormInput from "../../components/FormInput";
import { utils } from "../../utils";
import CustomSwitch from "../../components/CustomSwitch";
import TextButton from "../../components/TextButton";
import TextIconButton from "../../components/TextIconButton";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [saveMe, setSaveMe] = useState(false);

  function isEnableSignIn() {
    return email != "" && password != "" && emailError == "";
  }
  return (
    <AuthLayout
      title="Let's Sign You In"
      subtitle="Welcome back you've been missed"
    >
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}
      >
        {/** Email Form Inputs */}
        <FormInput
          label="email"
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

        <FormInput
          label="password"
          secureTextEntry={!showPass}
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          onChange={(value) => setPassword(value)}
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
        {/** Save me & Forget Password */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            justifyContent: "space-between",
          }}
        >
          <CustomSwitch value={saveMe} onChange={(value) => setSaveMe(value)} />
          <TextButton
            label="Forgot Password?"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.gray,
              fontWeight: "400",
            }}
            onPress={() => navigation.navigate("ForgotPassword")}
          />
        </View>
        {/** Sign In */}
        <TextButton
          label="Sign In"
          disabled={isEnableSignIn() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignIn() ? "#0E9C67" : COLORS.gray3,
          }}
          labelStyle={{
            color: COLORS.white,
            fontWeight: "700",
            fontSize: 17,
          }}
          onPress={() => navigation.navigate("MainScreen")}
        />
        {/** Sign up */}

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.darkGray,
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Don't have an acount?
          </Text>

          <TextButton
            label="Sign Up"
            buttonContainerStyle={{
              marginLeft: 5,
              backgroundColor: null,
            }}
            labelStyle={{
              color: "#0E9C67",
              fontWeight: "700",
              fontSize: 18,
            }}
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </View>

      {/** Footer */}
    </AuthLayout>
  );
};

export default SignIn;
