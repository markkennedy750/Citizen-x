import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import feeds from "../data/DummyFeedData";
import { COLORS, icons } from "../constants";
import BottomTabFeed from "../components/BottomTabFeed";
import * as Font from "expo-font";

const Profile = ({ navigation }) => {
  const profile = feeds[3];

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        ...AntDesign.font,
        ...SimpleLineIcons.font,
      });
    };

    loadFonts();
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AntDesign name="arrowleft" size={30} color="black" />
      </TouchableOpacity>
      <View style={{ marginTop: 15 }}>
        <View style={styles.profileContiner}>
          <Image
            source={profile.user.profileImage}
            style={styles.profileImag}
          />
          <View style={styles.profileNameContainer}>
            <Text style={styles.fullName}>{profile.user.fullname}</Text>
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
                    <AntDesign name="star" size={10} color="#d49013" />
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
            <AntDesign name="solution1" size={22} color={COLORS.primary} />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <SimpleLineIcons name="settings" size={22} color={COLORS.primary} />
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
    paddingTop: StatusBar.currentHeight || 45,
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
});
