import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

//<AntDesign name="star" size={24} color="black" />
//<AntDesign name="arrowleft" size={24} color="black" />

const ReportSuccess = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 16,
          justifyContent: "flex-start",
          marginBottom: 10,
        }}
      >
        <AntDesign name="arrowleft" size={35} color="black" />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 160,
          backgroundColor: "#f5dc20",
          height: 170,
          borderWidth: 1.5,
          borderColor: "#f5dc20",
          borderRadius: 300,
        }}
      >
        <View>
          <AntDesign name="star" size={80} color="orange" />
        </View>
      </View>
    </View>
  );
};

export default ReportSuccess;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 40,
    marginHorizontal: 15,
  },
});
