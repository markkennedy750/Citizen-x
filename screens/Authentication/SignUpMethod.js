import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { SIZES, COLORS, icons } from "../../constants";
import TextButton from "../../components/TextButton";
import TextIconButton from "../../components/TextIconButton";

const SignUpMethods = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.miniContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.imageContainer}
        >
          <Image style={styles.image} source={icons.arrow_back} />
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
          <Text style={styles.line}>Or</Text>
        </View>
      </View>
      <View>
        {/** Facebook */}

        <TextIconButton
          containerStyle={{
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.blue,
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
        <TextIconButton
          containerStyle={{
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            borderWidth:1,
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
          onPress={() => {}}
        />
      </View>

      <View
        style={{
          marginTop: SIZES.padding *0.5,
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
            marginRight:2
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
          onPress={() => console.log("To do terms and conditions")}
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
          onPress={() => console.log("To do terms and conditions")}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding * 6,
          marginBottom: 3,
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
            marginLeft: 5,
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
    marginTop: 45,
    marginHorizontal: SIZES.padding * 0.5,
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
    height: 85,
    width: 361,
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
    marginVertical: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 20,
  },
});
