import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  ActivityIndicator,
  Vibration,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, icons, SIZES } from "../constants";
import SettingsWrapper from "./SettingsWrapper";
import TextButton from "../components/TextButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";
import axios from "axios";
import { DELETE_USER } from "../Redux/URL";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Settings = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);

  async function loguserout() {
    dispatch(logout());
    setModalVisible(false);
    if (access_token === null) {
      navigation.navigate("SignIn");
    }
  }

  async function deleteAccount() {
    setDeleteLoading(true);
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await axios.delete(DELETE_USER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setDeleteLoading(false);
        loguserout();
      }
    } catch (error) {
      setDeleteLoading(false);
      if (error.response) {
        console.log("server error:", error.response.data);
        setErrorMessage(
          "There was an issue with the server. Please try again later."
        );
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        console.log("network error:", error.message);
        setErrorMessage(
          "Network error. Please check your internet connection and try again."
        );
        return rejectWithValue(error.message);
      } else {
        console.log("error:", error.message);
        setErrorMessage("An unexpected error occurred. Please try again.");
        return rejectWithValue(error.message);
      }
    } finally {
      setDeleteLoading(false);
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
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => Linking.openURL("https://www.citizenx.ng/about")}
      >
        <Image
          source={icons.usersicon}
          style={{ height: 28, width: 28, tintColor: "black" }}
        />
        <Text style={styles.settingTitle}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => Linking.openURL("www.citizenx.ng/terms")}
      >
        <Image
          source={icons.termscondition}
          style={{ height: 28, width: 28, tintColor: "black" }}
        />
        <Text style={styles.settingTitle}>Terms and Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => Linking.openURL("https://www.citizenx.ng/privacy")}
      >
        <Image
          source={icons.infoicon}
          style={{ height: 28, width: 28, tintColor: "black" }}
        />

        <Text style={styles.settingTitle}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => Linking.openURL("https://www.citizenx.ng/help")}
      >
        <Image
          source={icons.questioncircleo}
          style={{ height: 28, width: 28, tintColor: "black" }}
        />
        <Text style={styles.settingTitle}>Help</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => {
          setModalDelete(true);
          Vibration.vibrate();
        }}
      >
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
              label="No, I'm staying"
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
      <Modal animationType="slide" transparent={true} visible={modalDelete}>
        <View style={styles.modalContainer}>
          {deleteLoading ? (
            <ActivityIndicator size="large" color={`${COLORS.red}`} />
          ) : errorMessage === "" ? (
            <>
              <View style={styles.imageDeletContainer}>
                <Image
                  source={icons.deleteUser}
                  style={{ height: 110, width: 180 }}
                />
              </View>
              <View style={styles.logoutTextContainer}>
                <Text style={styles.primaryText}>We will really miss you?</Text>
                <Text style={styles.secondaryText}>
                  Are you sure you want to delete your account?
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.logoutTextContainer}>
              <Text style={styles.primaryText}>
                An error occured while deleting account
              </Text>
              <Text style={styles.secondaryText}>{errorMessage}</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TextButton
              label="Yes, I want to delete my account"
              buttonContainerStyle={{
                height: 55,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.red,
              }}
              disabled={deleteLoading}
              labelStyle={{
                color: COLORS.white,
                fontWeight: "700",
                fontSize: 18,
              }}
              onPress={deleteAccount}
            />
            <TextButton
              label="No, I clicked this button my mistake"
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
              disabled={deleteLoading}
              labelStyle={{
                color: COLORS.black,
                fontWeight: "700",
                fontSize: 18,
              }}
              onPress={() => {
                setModalDelete(false);
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
  imageDeletContainer: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
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
