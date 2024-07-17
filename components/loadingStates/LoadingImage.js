import React, { useEffect, useRef } from "react";
import { Animated, View, Image, StyleSheet } from "react-native";
import { icons } from "../../constants";

const LoadingImage = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    blink.start();

    return () => blink.stop();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={icons.citizenx}
        style={[styles.image, { opacity }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default LoadingImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});
