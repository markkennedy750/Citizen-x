import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MotiImage } from "moti";
import * as Splash from "expo-splash-screen";

const SplashScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [token, setToken] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  Splash.preventAutoHideAsync();

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("access_token");
        if (value !== null) {
          setToken(value);
        }
      } catch (e) {
        console.log("Error reading token", e);
      } finally {
        setAppIsReady(true);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      const checkSplashScreen = async () => {
        try {
          if (token) {
            console.log("This is the token", token);
            setTimeout(() => {
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
          await Splash.hideAsync();
        }
      };

      checkSplashScreen();
    }
  }, [appIsReady, token, navigation]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
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
