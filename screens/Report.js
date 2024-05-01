import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SIZES, COLORS, icons } from "../constants";
import reportData from "../data/report";

import Container from "./ReportContainer/Container";
import TextIconButton from "../components/TextIconButton";
//import Container from "./ReportContainer/container";

const Report = ({ navigation }) => {
  const footerButton = () => {
    return (
      <View>
        <TextIconButton
          containerStyle={{
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            //marginTop: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
          }}
          icon={icons.arrow_right}
          iconPosition="RIGHT"
          iconStyle={{
            tintColor: null,
          }}
          label="View Report Guidelines"
          labelStyle={{
            marginRight: SIZES.radius,
            fontWeight: "700",
            color: "#0276FF",
          }}
          onPress={() => navigation.navigate("GuideLine")}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.primaryContainer}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.imageContainer}
        >
          <Image style={styles.image} source={icons.arrow_back} />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Make a report</Text>
        <Text style={styles.subTitle}>
          Please select the category of report you want to make{" "}
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <FlatList
          data={reportData}
          renderItem={({ item }) => <Container item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={3}
          ListFooterComponent={footerButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 40,
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
  itemContainer: {
    width: 327,
    height: 500,
    marginTop: 17,
  },
});
