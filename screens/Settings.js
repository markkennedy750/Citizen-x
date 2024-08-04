import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, icons, SIZES } from "../constants";
import SettingsWrapper from "./SettingsWrapper";
import TextButton from "../components/TextButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";
const Settings = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);

  function loguserout() {
    dispatch(logout());
    setModalVisible(false);
    if (access_token === null) {
      navigation.navigate("SignIn");
    }
  }

  return (
    <SettingsWrapper title="Settings">
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => navigation.navigate("Theme")}
      >
        <Image
          source={icons.themeicon}
          style={{ height: 28, width: 28, tintColor: "black" }}
        />
        <Text style={styles.settingTitle}>Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => navigation.navigate("NotifcationSetting")}
      >
        <Image
          source={icons.notification}
          style={{ height: 28, width: 28, tintColor: "black" }}
        />
        <Text style={styles.settingTitle}>Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => navigation.navigate("DataSaver")}
      >
        <Image
          source={icons.ondemandvideo}
          style={{ height: 48, width: 28, tintColor: "black" }}
        />

        <Text style={styles.settingTitle}>Data Saver</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingContainer}>
        <Image
          source={icons.usersicon}
          style={{ height: 28, width: 28, tintColor: "black" }}
        />
        <Text style={styles.settingTitle}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingContainer}>
        <Image
          source={icons.infoicon}
          style={{ height: 28, width: 28, tintColor: "black" }}
        />

        <Text style={styles.settingTitle}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingContainer}>
        <Image
          source={icons.questioncircleo}
          style={{ height: 28, width: 28, tintColor: "black" }}
        />
        <Text style={styles.settingTitle}>Help</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingContainer}>
        <Image
          source={icons.deleteIcon}
          style={{ height: 36, width: 27, tintColor: "black" }}
        />
        <Text style={styles.settingTitle}>Delete Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Image
          source={icons.logouticon}
          style={{ height: 28, width: 28, tintColor: "black" }}
        />

        <Text style={styles.settingTitle}>Logout</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.imagelogoutContainer}>
            <Image
              source={icons.logouticon}
              style={{ height: 60, width: 60, tintColor: "black" }}
            />
          </View>
          <View style={styles.logoutTextContainer}>
            <Text style={styles.primaryText}>Already leaving?</Text>
            <Text style={styles.secondaryText}>
              Are you sure you want to logout?
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TextButton
              label="Yes, Logout"
              buttonContainerStyle={{
                height: 55,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                borderRadius: SIZES.radius,
                backgroundColor: "#0E9C67",
              }}
              labelStyle={{
                color: COLORS.white,
                fontWeight: "700",
                fontSize: 18,
              }}
              onPress={loguserout}
            />
            <TextButton
              label="No, Am staying"
              buttonContainerStyle={{
                height: 55,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.transparent,
                borderWidth: 1,
                marginTop: 15,
                borderColor: COLORS.gray2,
              }}
              labelStyle={{
                color: COLORS.black,
                fontWeight: "700",
                fontSize: 18,
              }}
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    width: "98%",
    height: 350,
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 7,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.gray2,
  },
  imagelogoutContainer: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 60,
    marginTop: 10,
  },
  logoutTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  primaryText: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 25,
  },
  secondaryText: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 15,
  },
});
