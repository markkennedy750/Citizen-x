import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { COLORS, icons, SIZES } from "../constants";
import DummyFeedData from "../data/DummyFeedData";
import Feed from "../components/Feed";

const SearchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("MainScreen")}
            style={styles.goBackButton}
          >
            <Image
              source={icons.arrowleft}
              style={{ width: 20, height: 20, tintColor: "black" }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: SIZES.padding,
            gap: 10,
          }}
        >
          <Text style={styles.appliedFilterTitleText}>Applied Filters</Text>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <Text style={styles.seachText}>Fake Product</Text>
            <Text style={styles.seachText}>Lagos</Text>
          </View>
        </View>
      </View>
      <View style={styles.numberOfSearch}>
        <Text style={styles.searchText}>Over 120 reports</Text>
      </View>

      <FlatList
        data={DummyFeedData}
        renderItem={({ item }) => <Feed item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ ...styles.itemContainer, flexGrow: 1 }}
        ListFooterComponent={<View style={{ height: 105 }} />}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 45,
    backgroundColor: COLORS.white,
    //paddingVertical: 16,
  },
  goBackButton: {
    paddingHorizontal: 15,
  },
  topContainer: {
    height: 145,
    width: "100%",
    borderBottomWidth: 1.5,
    borderColor: COLORS.gray,
    paddingVertical: 10,
  },
  appliedFilterTitleText: {
    fontWeight: "700",
    fontSize: 17,
    lineHeight: 22.4,
  },
  seachText: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding: 8,
    borderRadius: 30,
    fontWeight: "700",
    fontSize: 13,
  },
  itemContainer: {
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: "auto",
  },
  numberOfSearch: {
    width: "100%",
    height: 36,
    backgroundColor: COLORS.gray3,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 15,
  },
  searchText: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 19,
  },
});
