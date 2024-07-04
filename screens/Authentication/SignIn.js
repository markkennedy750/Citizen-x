import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
//import { AuthLayout } from "../";
import { SIZES, COLORS, icons } from "../../constants";
import FormInput from "../../components/FormInput";
import { utils } from "../../utils";
import CustomSwitch from "../../components/CustomSwitch";
import TextButton from "../../components/TextButton";
import TextIconButton from "../../components/TextIconButton";
import { StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/authSlice";
import LoadingImage from "../../components/loadingStates/LoadingImage";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const { loading, error, refresh_token, access_token } = useSelector(
    (state) => state.auth
  );

  const [showPass, setShowPass] = useState(false);
  const [saveMe, setSaveMe] = useState(false);

  function isEnableSignIn() {
    return email != "" && password != "" && emailError == "";
  }

  useEffect(() => {
    if (access_token) {
      navigation.navigate("MainScreen");
    }
  }, [access_token]);

  useEffect(() => {
    if (error) {
      Alert.alert("Login Failed", error);
    }
  }, [error]);

  function signInFn() {
    dispatch(
      login({
        email,
        password,
      })
    );
  }

  if (loading) return <LoadingImage />;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginTop: 5,
          justifyContent: "flex-start",
          marginBottom: 10,
          marginLeft: 15,
        }}
        onPress={() => navigation.navigate("SignUp")}
      >
        <AntDesign name="arrowleft" size={27} color="black" />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          paddingTop: SIZES.padding * 0.5,
          paddingHorizontal: 17,
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={icons.citizenx}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.titleText}>CITIZEN X</Text>
        </View>
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
              fontWeight: "600",
            }}
            onPress={signInFn}
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
            backgroundColor: isEnableSignIn() ? "#0E9C67" : COLORS.invisible,
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
            marginTop: "auto",
            marginBottom: 10,
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
              //marginLeft: 2,
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
    </View>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 45,
    backgroundColor: COLORS.white,
  },
  image: {
    width: 65,
    height: 65,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
  },
  titleText: {
    fontSize: 12.1,
    fontWeight: "500",
    color: "#000000",
  },
});
