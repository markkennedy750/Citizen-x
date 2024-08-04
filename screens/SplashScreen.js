import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MotiView, MotiImage } from "moti";
import * as Splash from "expo-splash-screen";

const SplashScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [token, setToken] = useState();
  const [appIsReady, setAppIsReady] = useState(false);

  Splash.preventAutoHideAsync();

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

  useEffect(() => {
    const checkSplashScreen = async () => {
      try {
        //const isFirstTime = await AsyncStorage.getItem("WelcomeScreen");

        if (token !== undefined && token !== null) {
          console.log(token);
          setTimeout(() => {
            //navigation.navigate("WelcomeScreen");
            //AsyncStorage.setItem("splashShown", "true");

            navigation.navigate("MainScreen");
          }, 4000);
        } else {
          setTimeout(() => {
            navigation.navigate("WelcomeScreen");
          }, 4000);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setAppIsReady(true);
      }
    };

    checkSplashScreen();
  }, [navigation]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await Splash.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <MotiImage
        source={require("../assets/citizenx.png")}
        style={{ width: width * 0.3, height: width * 0.3 }}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 2000 }}
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
