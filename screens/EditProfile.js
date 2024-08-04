import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { COLORS, icons, SIZES } from "../constants";
import feeds from "../data/DummyFeedData";
import { utils } from "../utils";
import FormInput from "../components/FormInput";

const EditProfile = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [UserName, setUserName] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  const profile = feeds[3];

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.arrowleft}
            style={{ width: 20, height: 20, tintColor: "black" }}
          />
        </TouchableOpacity>
        <Text style={styles.editProfileText}>EditProfile</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <TouchableOpacity>
          <Image source={profile.user.profileImage} style={styles.profileImg} />
        </TouchableOpacity>
        <Text style={styles.profileImageText}>Change Profile Photo</Text>
      </View>

      <ScrollView>
        <View>
          <FormInput
            label="Full Name"
            placeholder="Dapo Karim"
            containerStyle={{
              marginTop: SIZES.radius,
              flex: 1,
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

          <TouchableOpacity style={{ marginLeft: "auto", height: 30 }}>
            <Text
              style={{ fontWeight: "700", fontSize: 17, color: COLORS.primary }}
            >
              Change Fullname
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <FormInput
            label="Username"
            placeholder="Dapo Karim"
            containerStyle={{
              marginTop: SIZES.radius,
              flex: 1,
            }}
            onChange={(value) => {
              setUserName(value);
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
                    UserName == "" || (UserName != "" && usernameError == "")
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      UserName == ""
                        ? COLORS.gray
                        : fullName != "" && usernameError == ""
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />

          <TouchableOpacity style={{ marginLeft: "auto", height: 30 }}>
            <Text
              style={{ fontWeight: "700", fontSize: 15, color: COLORS.primary }}
            >
              Change Username
            </Text>
          </TouchableOpacity>
        </View>

        <View>
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

          <TouchableOpacity style={{ marginLeft: "auto", height: 30 }}>
            <Text
              style={{ fontWeight: "700", fontSize: 15, color: COLORS.primary }}
            >
              Change Email
            </Text>
          </TouchableOpacity>
        </View>

        <View>
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

          <TouchableOpacity style={{ marginLeft: "auto", height: 30 }}>
            <Text
              style={{ fontWeight: "700", fontSize: 15, color: COLORS.primary }}
            >
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: StatusBar.currentHeight || 45,
    paddingTop: 18,
    paddingHorizontal: 15,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  editProfileText: {
    fontWeight: "700",
    color: COLORS.primary,
    fontSize: 20,
    marginLeft: 100,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImageContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  profileImageText: {
    marginLeft: 35,
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.primary,
  },
});
