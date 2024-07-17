import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "../constants";
import SettingsWrapper from "./SettingsWrapper";
import {
  MaterialCommunityIcons,
  FontAwesome6,
  MaterialIcons,
  FontAwesome5,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import * as Font from "expo-font";

const Settings = ({ navigation }) => {
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        ...MaterialCommunityIcons.font,
        ...FontAwesome6.font,
        ...MaterialIcons.font,
        ...FontAwesome5.font,
        ...AntDesign.font,
        ...Feather.font,
      });
    };

    loadFonts();
  }, []);
  return (
    <SettingsWrapper title="Settings">
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => navigation.navigate("Theme")}
      >
        <MaterialCommunityIcons name="brush-variant" size={28} color="black" />
        <Text style={styles.settingTitle}>Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => navigation.navigate("NotifcationSetting")}
      >
        <FontAwesome6 name="bell" size={28} color="black" />
        <Text style={styles.settingTitle}>Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => navigation.navigate("DataSaver")}
      >
        <MaterialIcons name="ondemand-video" size={28} color="black" />
        <Text style={styles.settingTitle}>Data Saver</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingContainer}>
        <FontAwesome5 name="users" size={28} color="black" />
        <Text style={styles.settingTitle}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingContainer}>
        <AntDesign name="infocirlceo" size={28} color="black" />
        <Text style={styles.settingTitle}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingContainer}>
        <AntDesign name="questioncircleo" size={28} color="black" />
        <Text style={styles.settingTitle}>Help</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingContainer}>
        <Feather name="trash-2" size={28} color="black" />
        <Text style={styles.settingTitle}>Delete Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingContainer}>
        <Feather name="log-out" size={28} color="black" />
        <Text style={styles.settingTitle}>Logout</Text>
      </TouchableOpacity>
    </SettingsWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingLeft: 10,
  },
  settingTitle: {
    marginLeft: 10,
    fontWeight: "400",
    fontSize: 17,
  },
});
