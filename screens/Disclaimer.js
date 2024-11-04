import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { icons, SIZES, COLORS } from "../constants";
import TextButton from "../components/TextButton";

const Disclaimer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.secondaryContainer}>
        <Image
          source={icons.citizenx}
          resizeMode="contain"
          style={{ width: 60, height: 60 }}
        />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            lineHeight: 25,
          }}
        >
          Citizen X
        </Text>
      </View>
      <View
        style={{
          paddingVertical: SIZES.padding,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            lineHeight: 25,
            color: COLORS.red,
            marginVertical: SIZES.padding,
          }}
        >
          We Disclaim:
        </Text>

        <Text
          style={{
            fontSize: 18,
            lineHeight: 20,
            fontWeight: "400",
          }}
        >
          CitizenX is definitely not affiliated with any government entity—just
          a group of citizens here to help you keep tabs! 🕵️‍♂️📍 Information is
          user-sourced, and we don’t offer any official government services (but
          wouldn’t that be cool? 😄). For the official stuff, check government
          sites directly.
        </Text>
      </View>

      <TextButton
        label="Continue"
        //disabled={isEnableSignIn() ? false : true}
        buttonContainerStyle={{
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: "#104833",
          alignSelf: "center",
        }}
        labelStyle={{
          color: COLORS.white,
          fontWeight: "700",
          fontSize: 17,
        }}
        onPress={() => {
          navigation.navigate("Interest");
        }}
      />
      <View
        style={{
          marginTop: "auto",
          height: 140,
          backgroundColor: "#104833",
          width: 320,
          borderTopRightRadius: 250,
          //borderTopLeftRadius: 100,
          paddingLeft: 18,
          //paddingVertical: 16,
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          FOR MORE INFORMATION
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            Visit :
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.citizenx.ng/disclaimer")
            }
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 14,
                fontWeight: "600",
                textDecorationLine: "underline",
              }}
            >
              www.citizenx.ng/disclaimer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Disclaimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "#B7FF9D33",
  },
  secondaryContainer: {
    alignItems: "center",
    paddingTop: SIZES.padding * 3,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
