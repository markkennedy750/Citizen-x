import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  useWindowDimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from "react-native";
import { MotiView, MotiImage } from "moti";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BasicRevealAnimation = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  async function navFunction() {
    try {
      const value = await AsyncStorage.getItem("access_token");
      if (value !== null) {
        navigation.navigate("MainScreen");
      }
      navigation.navigate("Onboarding");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <MotiImage
        source={require("../assets/onboarding/slide.png")}
        style={{ width: width * 0.8, height: width * 0.8 }}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 1000 }}
      />
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 2000 }}
      >
        <Text style={styles.title}>Welcome to Citizen X</Text>
        <Text style={styles.text}>
          A platform for citizen reporting and accountability in Nigeria. Our
          mission is to empower citizens to report on government bodies and
          infrastructures in real-time. Together we strive for transparency,
          accountability, and positive change in our communities.
        </Text>
      </MotiView>
      <TouchableWithoutFeedback onPress={navFunction}>
        <MotiView
          style={[styles.button, { width: width * 0.8 }]}
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 3000 }}
        >
          <Text style={styles.textButton}>Get Started</Text>
        </MotiView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default BasicRevealAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#E4F7DF",
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  text: {
    textAlign: "center",
    marginHorizontal: 35,
    color: "black",
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#0E9C67",
    padding: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
});
