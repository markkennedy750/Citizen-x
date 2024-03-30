import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MotiView, MotiImage } from "moti";

const SplashScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    const checkSplashScreen = async () => {
      try {
        // const isFirstTime = await AsyncStorage.getItem("splashShown");

        // // If splash screen has been shown before, navigate to the next screen immediately
        // if (isFirstTime !== null) {
        //   navigation.navigate("WelcomeScreen"); // Change this to the next screen you want to navigate to
        // } else {
        //   // If splash screen is shown for the first time, set a timeout to navigate after a few seconds
        // }
        setTimeout(() => {
          navigation.navigate("WelcomeScreen");
          //AsyncStorage.setItem("splashShown", "true");
        }, 6000); // Change the delay time (in milliseconds) according to your preference (here, it's set to 3000 milliseconds = 3 seconds)
      } catch (error) {
        console.error("Error accessing AsyncStorage:", error);
      }
    };

    checkSplashScreen();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MotiImage
        source={require("../assets/citizenx.png")} // Provide the path to your image
        style={{ width: width * 0.3, height: width * 0.3 }}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 1000 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
