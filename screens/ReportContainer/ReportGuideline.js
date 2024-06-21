import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SIZES, COLORS, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const ReportGuideline = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.primaryContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("MainScreen")}
        style={styles.imageContainer}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Report Guidelines</Text>
        <Text style={styles.subTitle}>
          Here a some quick guides regarding how you can best make your reports.
        </Text>
      </View>
      <View style={styles.bulletContainer}>
        <View style={styles.singleContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.item}>
            Provide specific details about the problem, such as its location and
            time of occurrence, to aid authorities in resolving it promptly.
          </Text>
        </View>
        <View style={styles.singleContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.item}>
            If possible, provide visual evidence such as photos or videos to
            illustrate the issue, helping authorities understand its seriousness
            and respond promptly.
          </Text>
        </View>

        <View style={styles.singleContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.item}>
            Ensure accuracy by reviewing all information before submission, as
            errors can hinder the resolution process.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReportGuideline;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 40,
    marginHorizontal: 20,
  },
  imageContainer: {
    width: 32,
    height: 30,
  },
  image: {
    flex: 1,
    width: 30,
    height: 25,
  },
  textContainer: {
    flexDirection: "column",
    marginTop: 20,
    justifyContent: "flex-end",
  },
  title: {
    color: `${COLORS.primary}`,
    fontWeight: "700",
    fontSize: 25,
    lineHeight: 28,
  },
  subTitle: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 19.6,
  },
  bulletContainer: {
    marginTop: 15,
    marginLeft: 4,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  bullet: {
    fontSize: 35,
    marginRight: 5,
    marginTop: 0,
    marginBottom: 37,
  },
  item: {
    //flexDirection: "row",
    //alignItems: "center",
    // marginBottom: 10,
    marginTop: 0,
    marginRight: 4,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
  },
  singleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
});
