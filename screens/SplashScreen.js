import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MotiView, MotiImage } from "moti";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";

const SplashScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [token, setToken] = useState();

  useEffect(() => {
    const checkSplashScreen = async () => {
      try {
        const isFirstTime = await AsyncStorage.getItem("WelcomeScreen");

        // // If splash screen has been shown before, navigate to the next screen immediately
        if (token !== null && isFirstTime !== null) {
          setTimeout(() => {
            //navigation.navigate("WelcomeScreen");
            //AsyncStorage.setItem("splashShown", "true");
            navigation.navigate("MainScreen"); // Change this to the next screen you want to navigate to
          }, 4000);
        } else {
          // If splash screen is shown for the first time, set a timeout to navigate after a few seconds
          setTimeout(() => {
            navigation.navigate("WelcomeScreen");
            AsyncStorage.setItem("WelcomeScreen", "true");
          }, 4000); // Change the delay time (in milliseconds) according to your preference (here, it's set to 3000 milliseconds = 3 seconds)
        }
      } catch (error) {
        console.error("Error accessing AsyncStorage:", error);
      }
    };

    checkSplashScreen();
  }, [navigation]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("access_token");
        setToken(value);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <MotiImage
        source={require("../assets/citizenx.png")}
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
    backgroundColor: "#B7FF9D33",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
