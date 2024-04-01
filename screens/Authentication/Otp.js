import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { SIZES, COLORS } from "../../constants";
import TextButton from "../../components/TextButton";
import { AuthLayout } from "../";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const Otp = ({ navigation }) => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthLayout
      title="OTP Authentication"
      subtitle="An authentication code has been sent to your email address"
      titleContainerStyle={{
        mariginTop: SIZES.padding * 1.5,
      }}
    >
      {/** OTP inputs */}
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}
      >
        <OTPInputView
          pinCount={4}
          style={{
            width: "100%",
            height: 50,
          }}
          codeInputFieldStyle={{
            width: 65,
            height: 65,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            color: COLORS.black,
            fontWeight: "600",
            fontSize: 20,
          }}
          onCodeFilled={(code) => {
            console.log(code);
          }}
        />

        {/** Countdown Timer */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: SIZES.padding,
          }}
        >
          <Text
            style={{
              color: COLORS.darkGray,
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Didn't receive code?
          </Text>
          <TextButton
            label={`Resend (${timer}s)`}
            disabled={timer == 0 ? false : true}
            buttonContainerStyle={{
              marginLeft: SIZES.base,
              backgroundColor: null,
            }}
            labelStyle={{
              color: "#0E9C67",
              fontWeight: "700",
              fontSize: 16,
            }}
            onPress={() => setTimer(60)}
          />
        </View>
      </View>

      {/** Footer */}
      <View>
        <TextButton
          label="Continue"
          buttonContainerStyle={{
            height: 50,
            alignItems: "center",
            borderRadius: SIZES.radius,
            backgroundColor: "#0E9C67",
          }}
          labelStyle={{
            color: COLORS.white,
            fontWeight: "700",
            fontSize: 17,
          }}
          onPress={() => navigation.navigate("MainScreen")}
        />

        <View
          style={{
            marginTop: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.darkGray,
              fontWeight: "700",
              fontSize: 15,
              marginRight: 7,
            }}
          >
            By signing up, you agree to our
          </Text>
          <TextButton
            label="Terms and Conditions"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: "#0E9C67",
              fontWeight: "700",
              fontSize: 15,
            }}
            onPress={() => console.log("To do terms and conditions")}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

export default Otp;
