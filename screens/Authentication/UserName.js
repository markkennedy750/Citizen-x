import { View, Image, Alert } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, icons } from "../../constants";
import AuthLayoutSignUp from "./AuthLayoutSignUp";
import FormInput from "../../components/FormInput";
import TextButton from "../../components/TextButton";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../Redux/authSlice";

const UserName = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const { fullname, email, phoneNumber, password } = route.params;
  const { loading, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function isEnableSignUp() {
    return username !== "";
  }

  function signUpFnc() {
    dispatch(signup(fullname, username, phoneNumber, email, password));
    if (error) {
      Alert.alert(error);
      return;
    }
    navigation.navigate("ProfilePics");
  }
  return (
    <AuthLayoutSignUp
      steps="Personalization"
      title="Create your username"
      subTitle="Create your unique Citizen X username."
      containerStyle={{
        paddingTop: 35,
      }}
      show={false}
    >
      <View
        style={{
          flex: 1,
          marginTop: 35,
        }}
      >
        <FormInput
          label="Username"
          placeholder="Obi Shegun Aminu"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          onChange={(value) => {
            setUsername(value);
          }}
          errorMsg={usernameError}
          appendComponent={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  username == "" || (username != "" && username == "")
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    username == ""
                      ? COLORS.gray
                      : username != "" && username == ""
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />

        <TextButton
          label="Next"
          disabled={isEnableSignUp() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 45,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignUp() ? "#0E9C67" : COLORS.invisible,
          }}
          labelStyle={{
            color: COLORS.white,
            fontWeight: "700",
            fontSize: 17,
          }}
          onPress={() => signUpFnc()}
        />
      </View>
    </AuthLayoutSignUp>
  );
};

export default UserName;
