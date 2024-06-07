import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { COLORS, icons } from "../constants";
import PointInvite from "../components/PointInvite";

const Coin = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.pointText}>X points & Rewards</Text>
      </View>

      <ImageBackground
        source={icons.coin_bg}
        style={styles.coinImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.topCircle}>
          <View style={styles.innerCircle}>
            <AntDesign name="star" size={50} color="#d49013" />
          </View>
        </View>
        <View style={{ marginLeft: 30 }}>
          <Text style={styles.pointNumber}>35</Text>
          <Text style={styles.pointX}>X Point</Text>
        </View>
      </ImageBackground>
      <PointInvite />
    </View>
  );
};

export default Coin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: StatusBar.currentHeight || 40,
    paddingHorizontal: 12,
  },
  topContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
  },
  pointText: {
    fontWeight: "700",
    fontSize: 19,
    lineHeight: 28,
    marginLeft: 50,
    color: COLORS.primary,
  },
  coinImage: {
    width: 335,
    height: 150,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  imageStyle: {
    borderRadius: 10,
  },
  topCircle: {
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 10,
    backgroundColor: "#f5dc20",
    height: 76,
    width: 76,
    borderWidth: 2,
    borderColor: "#f5dc20",
    borderRadius: 300,
  },
  innerCircle: {
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderRadius: 50,
    backgroundColor: "#F1D020", //  #e3b612
    borderColor: "#f0a61d",
  },
  pointNumber: {
    fontWeight: "700",
    fontSize: 35,
    color: COLORS.white,
  },
  pointX: {
    fontWeight: "700",
    fontSize: 20,
    color: COLORS.white,
  },
});
