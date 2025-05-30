import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  Modal,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import feeds from "../data/DummyFeedData";
import { COLORS, icons, SIZES } from "../constants";
import BottomTabFeed from "../components/BottomTabFeed";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingImage from "../components/loadingStates/LoadingImage";
import { logout, profile_sec, rewardCount } from "../Redux/authSlice";
import ErrorImage from "../components/loadingStates/ErrorImage";
import TextButton from "../components/TextButton";
import { HOST, PROFILE } from "../Redux/URL";
import axios from "axios";

const Profile = ({ navigation }) => {
  const [access_token, setAccess_token] = useState("");
  const [catchUser, setCatchUser] = useState({});
  const [isAppReady, setIsAppReady] = useState(false); // new state to control initial loading
  const [modalVisible, setModalVisible] = useState(false);
  const [isValidImage, setIsValidImage] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, user, availableCoins } = useSelector(
    (state) => state.auth
  );

  const handleRefresh = () => {
    if (access_token) {
      dispatch(profile_sec({ access_token }));
      dispatch(rewardCount({ access_token }));
      Alert.alert("Profile Refreshed", "Your profile details are updated!");
    }
  };

  const userProfile = async () => {
    try {
      const response = await axios.get(PROFILE, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("access_token");
        const userDetail = await AsyncStorage.getItem("user_details");
        setAccess_token(value);
        setCatchUser(userDetail);
      } catch (e) {
        console.log(e);
      } finally {
        setIsAppReady(true); // set ready state once data is fetched
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (user?.profileImage) {
      Image.prefetch(user.profileImage)
        .then(() => setIsValidImage(true))
        .catch(() => setIsValidImage(false));
    } else {
      setIsValidImage(false);
    }
  }, [user?.profileImage]);

  useEffect(() => {
    if (access_token) {
      dispatch(profile_sec({ access_token }));
      dispatch(rewardCount({ access_token }));
    }
    console.log(availableCoins);
  }, [dispatch, access_token]);

  useFocusEffect(
    useCallback(() => {
      if (access_token) {
        dispatch(profile_sec({ access_token }));
        dispatch(rewardCount({ access_token }));
        userProfile();
      }
    }, [dispatch, access_token])
  );

  function loguserout() {
    dispatch(logout());
    setModalVisible(false);
    navigation.navigate("SignIn");
  }

  function refreshBtn() {
    dispatch(profile_sec({ access_token }));
  }

  if (!isAppReady || loading) return <LoadingImage />;

  if (error)
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingHorizontal: 8,
            paddingTop: 5,
          }}
        >
          <TextButton
            label="log out"
            buttonContainerStyle={{
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              borderRadius: SIZES.radius,
              //backgroundColor: "#0E9C67",
              borderWidth: 1,
              borderColor: COLORS.primary,
            }}
            labelStyle={{
              color: COLORS.black,
              fontWeight: "700",
              fontSize: 18,
            }}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </View>
        <View style={styles.errorStyle}>
          <ErrorImage />
          <Text
            style={{
              color: "red",
              fontSize: 12,
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            Failed to load your profile, please check your network connection or
            click to refresh
          </Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TextButton
              label="Refresh"
              buttonContainerStyle={{
                height: 50,
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
              onPress={refreshBtn}
            />
          </View>
        </View>
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
      </View>
    );
  console.log("user section", user);
  console.log("user profile image", user?.profileImage);
  console.log("user details", catchUser);
  const host = `${HOST}/`;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleRefresh}>
        <Image
          source={icons.refresh_btn}
          style={{ width: 32, height: 32, tintColor: COLORS.primary }}
        />
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <View style={styles.profileContiner}>
          <Image
            source={
              isValidImage ? { uri: user?.profileImage } : icons.anonymous
            }
            style={styles.profileImag}
          />
          <View style={styles.profileNameContainer}>
            <Text style={styles.fullName}>{user?.name}</Text>
            <Text style={styles.userName}>@{user?.username}</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Coin")}>
            <ImageBackground
              source={icons.coin_bg}
              style={styles.coinImage}
              imageStyle={styles.imageStyle}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.topCircle}>
                  <View style={styles.innerCircle}>
                    <Image
                      source={icons.staricon}
                      style={{ height: 12, width: 12, tintColor: "#d49013" }}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                    lineHeight: 20,
                    color: COLORS.white,
                    marginHorizontal: 8,
                  }}
                >
                  {availableCoins?.total_balance}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 14,
                    //marginHorizontal: 4,
                    color: COLORS.white,
                  }}
                >
                  X
                </Text>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 14,
                    marginHorizontal: 10,
                    color: COLORS.white,
                  }}
                >
                  Points
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
            marginVertical: 12,
            gap: 5,
          }}
        >
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Image
              source={icons.solution1icon}
              style={{ height: 35, width: 35, tintColor: `${COLORS.primary}` }}
            />

            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <Image
              source={icons.setting}
              style={{ height: 23, width: 23, tintColor: `${COLORS.primary}` }}
            />

            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomTabFeed />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 18,
    paddingHorizontal: 12,
  },
  profileContiner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImag: {
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  profileNameContainer: {
    marginHorizontal: 15,
  },
  fullName: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
  },
  userName: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
  },
  coinImage: {
    width: 112,
    height: 70,
    //borderRadius: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "#F1D020",
  },
  imageStyle: {
    borderRadius: 10,
    borderWidth: 1.5,
  },
  topCircle: {
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 120,
    backgroundColor: "#f5dc20",
    height: 21,
    width: 21,
    borderWidth: 2,
    borderColor: "#f5dc20",
    borderRadius: 300,
  },
  innerCircle: {
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderRadius: 50,
    backgroundColor: "#F1D020", //  #e3b612
    borderColor: "#f0a61d",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 25,
  },
  editButton: {
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    height: 45,
    width: 155,
    borderWidth: 1.5,
    //marginRight: 8,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "800",
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.primary,
    marginLeft: 10,
  },
  errorStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 33,
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
