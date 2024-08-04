import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import feeds from "../data/DummyFeedData";
import { COLORS, icons, SIZES } from "../constants";
import BottomTabFeed from "../components/BottomTabFeed";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingImage from "../components/loadingStates/LoadingImage";
import { profile_sec, rewardCount } from "../Redux/authSlice";
import ErrorImage from "../components/loadingStates/ErrorImage";
import TextButton from "../components/TextButton";
import { HOST } from "../Redux/URL";

const Profile = ({ navigation }) => {
  const [access_token, setAccess_token] = useState("");
  const [catchUser, setCatchUser] = useState({});
  const dispatch = useDispatch();
  const { loading, error, user, availableCoins } = useSelector(
    (state) => state.auth
  );
  const profile = feeds[3];

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("access_token");
        const userDetail = await AsyncStorage.getItem("user_details");
        setAccess_token(value);
        setCatchUser(userDetail);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    dispatch(profile_sec({ access_token }));
    dispatch(rewardCount({ access_token }));
  }, [dispatch]);

  function refreshBtn() {
    dispatch(profile_sec({ access_token }));
  }

  if (loading) return <LoadingImage />;
  if (error)
    return (
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
    );
  console.log("user section", user);
  console.log("user profile image", user?.profileImage);
  console.log("user details", catchUser);
  const host = `${HOST}/`;
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={icons.arrowleft}
          style={{ width: 20, height: 20, tintColor: "black" }}
        />
      </TouchableOpacity>
      <View style={{ marginTop: 12 }}>
        <View style={styles.profileContiner}>
          <Image
            source={{
              uri: catchUser?.profileImage,
            }}
            style={styles.profileImag}
          />
          <View style={styles.profileNameContainer}>
            <Text style={styles.fullName}>{user?.name}</Text>
            <Text style={styles.userName}>@{profile.user.username}</Text>
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
                  35
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
        <View style={styles.buttonContainer}>
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
    width: 165,
    borderWidth: 1.5,
    marginRight: 8,
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
    paddingHorizontal: 10,
  },
});
