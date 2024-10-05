import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SIZES, COLORS, icons } from "../../constants";
import TextButton from "../../components/TextButton";
import TextIconButton from "../../components/TextIconButton";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import axios from "axios";
import { LOGIN_WITH_GOOGLE } from "../../Redux/URL";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();
const SignUpMethods = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId: Platform.select({
  //     androidClientId: ANDROID_GOOGLE_CLIENT_ID,
  //     iosClientId: IOS_GOOGLE_CLIENT_ID,
  //   }),
  //   redirectUri: AuthSession.makeRedirectUri({
  //     useProxy: true,
  //   }),
  //   scopes: ["openid", "profile", "email"],
  // });
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1089518464102-r4upttig1g193o85v3nkqae937ppk0h0.apps.googleusercontent.com",
    iosClientId:
      "1089518464102-qdgrc9ulmneip0l4cj1ijc2igv8bubvk.apps.googleusercontent.com",
  });

  const getUserInfo = async (token) => {
    setLoading(true);

    try {
      const res = await axios.get(LOGIN_WITH_GOOGLE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { access_token, refresh_token } = res.data;

      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("refresh_token", refresh_token);

      navigation.navigate("MainScreen");
    } catch (error) {
      console.error("Google login error:", error);
      Alert.alert("Google login error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type === "success" && !isRequesting) {
      setIsRequesting(true);
      const { authentication } = response;
      getUserInfo(authentication.accessToken);
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.miniContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("InitialSignUp")}
          style={styles.imageContainer}
        >
          <Image
            source={icons.arrowleft}
            style={{ width: 20, height: 20, tintColor: "black" }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleContainer}>Choose Sign up option</Text>
        <Text style={styles.subTitleContainer}>Join Citizen X today!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TextButton
          label="Continue with email"
          //disabled={isEnableSignUp() ? false : true}
          disabled={loading}
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
          onPress={() => navigation.navigate("SignUp")}
        />
        <View style={styles.lineConatiner}>
          <View
            style={{ width: "35%", height: 2, backgroundColor: COLORS.black }}
          />
          <Text style={styles.line}>Or</Text>
          <View
            style={{ width: "35%", height: 2, backgroundColor: COLORS.black }}
          />
        </View>
      </View>
      <View>
        {/** Facebook */}

        <TextIconButton
          disabled={loading}
          containerStyle={{
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.blue,
            marginBottom: 18,
          }}
          icon={icons.fb}
          iconPosition="LEFT"
          iconStyle={{
            tintColor: COLORS.white,
          }}
          label="Continue with Facebook"
          labelStyle={{
            marginLeft: SIZES.radius,
            color: COLORS.white,
          }}
          onPress={() => {}}
        />

        {/** Google */}
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <TextIconButton
            disabled={loading}
            containerStyle={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2,
              borderWidth: 1,
            }}
            icon={icons.google}
            iconPosition="LEFT"
            iconStyle={{
              tintColor: null,
            }}
            label="Continue with Google"
            labelStyle={{
              marginLeft: SIZES.radius,
            }}
            onPress={async () => await promptAsync()}
          />
        )}
      </View>
      <View
        style={{
          marginTop: SIZES.padding * 0.5,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.darkGray,
            fontWeight: "400",
            fontSize: 11,
            marginRight: 2,
          }}
        >
          By signing up, you agree to our
        </Text>
        <TextButton
          label="Terms of Service"
          buttonContainerStyle={{
            backgroundColor: null,
          }}
          labelStyle={{
            color: "#0E9C67",
            fontWeight: "400",
            fontSize: 11,
          }}
          onPress={() => navigation.navigate("TermsAndConditions")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.darkGray,
            fontWeight: "400",
            fontSize: 11,
            marginHorizontal: 5,
          }}
        >
          and
        </Text>
        <TextButton
          label="Privacy Policy"
          buttonContainerStyle={{
            backgroundColor: null,
          }}
          labelStyle={{
            color: "#0E9C67",
            fontWeight: "400",
            fontSize: 11,
          }}
          onPress={() => navigation.navigate("TermsAndConditions")}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: "auto",
          marginBottom: 25,
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
          Already have an account?
        </Text>

        <TextButton
          label="Sign In"
          buttonContainerStyle={{
            marginLeft: 2,
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
    </SafeAreaView>
  );
};

export default SignUpMethods;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: SIZES.padding * 0.5,
    backgroundColor: COLORS.background,
  },
  miniContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: 32,
    height: 30,
  },
  image: {
    flex: 1,
    width: 32,
    height: 30,
  },
  textContainer: {
    marginTop: 40,
    padding: 5,
    // height: 85,
    //width: "100",
  },
  titleContainer: {
    color: COLORS.black,
    fontWeight: "800",
    fontSize: 30,
    lineHeight: 33,
  },
  subTitleContainer: {
    color: COLORS.black,
    marginTop: 3,
    fontWeight: "500",
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 10,
  },
  lineConatiner: {
    marginVertical: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  line: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 20,
  },
});
