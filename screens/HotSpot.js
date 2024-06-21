import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { COLORS } from "../constants";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

const HotSpot = ({ navigation }) => {
  const dispatch = useDispatch();
  const ReportContainer = ({ primaryText, scondarytext }) => {
    return (
      <TouchableOpacity
        style={styles.reportComponentContainer}
        onPress={() => navigation.navigate("SearchScreen")}
      >
        <Text style={styles.primTextConatiner}>{primaryText}</Text>
        <Text style={styles.secTextContainer}>{scondarytext}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.firstContainer}>
        <Text style={styles.hotSpotText}>HotSpot</Text>
      </View>

      <View style={styles.secondContainer}>
        <TouchableOpacity
          style={styles.seachContainer}
          onPress={() => navigation.navigate("HotspotSearch")}
        >
          <Feather name="search" size={25} color={COLORS.gray} />
          <Text style={styles.filterReportText}>Filter Reports HotSpot</Text>
        </TouchableOpacity>

        <Text style={styles.instructionText}>
          Get access to live report data on location hotspots in your community
          and other places in Nigeria.
        </Text>

        <ScrollView>
          <ReportContainer primaryText="Crime" scondarytext="102 Reports" />
          <ReportContainer
            primaryText="Consumer Protection"
            scondarytext="234 reports"
          />
          <ReportContainer primaryText="Crime" scondarytext="102 Reports" />
          <ReportContainer
            primaryText="Consumer Protection"
            scondarytext="234 reports"
          />
          <ReportContainer
            primaryText="Healthcare"
            scondarytext="125 reports"
          />
          <ReportContainer primaryText="Crime" scondarytext="102 Reports" />
          <ReportContainer primaryText="Crime" scondarytext="102 Reports" />
          <ReportContainer primaryText="Crime" scondarytext="102 Reports" />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HotSpot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 45,
    backgroundColor: COLORS.white,
  },
  firstContainer: {
    height: 55,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    borderBottomWidth: 1.5,
    borderColor: COLORS.gray,
  },
  hotSpotText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 25,
    lineHeight: 28,
    marginLeft: 15,
  },
  seachContainer: {
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    borderRadius: 25,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  secondContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 120,
  },
  filterReportText: {
    fontWeight: "700",
    fontSize: 18,
    color: COLORS.gray,
    lineHeight: 22,
  },
  reportContainer: {
    borderWidth: 1.5,
    marginTop: 20,
    borderRadius: 10,
    height: 180,
    borderColor: COLORS.gray,
    padding: 12,
  },
  reportedCaseText: {
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.gray,
    marginLeft: 8,
  },
  reportImage: {
    width: 62,
    height: 62,
  },
  reportComponentContainer: {
    //alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: "#ECFDF7",
    height: 70,
    padding: 12,
    borderRadius: 10,
    gap: 5,
  },
  instructionText: {
    textAlign: "left",
    color: "#000000B2",
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 8,
  },

  primTextConatiner: {
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 19.6,
  },
  secTextContainer: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 19.6,
  },
});
