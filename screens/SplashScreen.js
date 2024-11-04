import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MotiImage } from "moti";
import * as Splash from "expo-splash-screen";
import { profile_sec, logout } from "../Redux/authSlice";
import { useDispatch } from "react-redux";

const SplashScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  //const [token, setToken] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();

  Splash.preventAutoHideAsync();

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("access_token");
  //       if (value !== null) {
  //         setToken(value);
  //       }
  //     } catch (e) {
  //       console.log("Error reading token", e);
  //     } finally {
  //       setAppIsReady(true);
  //     }
  //   };
  //   getData();
  // }, []);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const resultAction = await dispatch(
            profile_sec({ access_token: token })
          );

          if (profile_sec.fulfilled.match(resultAction)) {
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "MainScreen" }],
              });
            }, 4000);
          } else {
            dispatch(logout());
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "WelcomeScreen" }],
              });
            }, 4000);
          }
        } else {
          dispatch(logout());
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "WelcomeScreen" }],
            });
          }, 4000);
        }
      } catch (error) {
        console.error("Error validating token", error);
        navigation.reset({
          index: 0,
          routes: [{ name: "WelcomeScreen" }],
        });
      } finally {
        setAppIsReady(true);
        await Splash.hideAsync();
      }
    };

    checkTokenValidity();
  }, [dispatch, navigation]);

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
