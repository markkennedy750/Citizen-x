import { StyleSheet, Text, View, Switch } from "react-native";
import React, { useState } from "react";
import SettingsWrapper from "./SettingsWrapper";
import { COLORS } from "../constants";

const Theme = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <SettingsWrapper title="Theme">
      <View style={styles.container}>
        <Text style={styles.textContainer}>Dark Theme</Text>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: "#767577", true: `${COLORS.primary}` }}
            thumbColor={isEnabled ? `${COLORS.primary}` : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </SettingsWrapper>
  );
};

export default Theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  switchContainer: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
  textContainer: {
    fontWeight: "500",
    fontSize: 16,
    color: "#000000CC",
  },
});
