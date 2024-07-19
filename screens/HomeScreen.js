import { StyleSheet, Text, View, StatusBar, FlatList } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import DummyFeedData from "../data/DummyFeedData";
import Feed from "../components/Feed";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 20,
            color: COLORS.primary,
            marginLeft: 15,
          }}
        >
          Reports Feed
        </Text>
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 45,
    backgroundColor: "white",
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    height: 57,
  },
  itemContainer: {
    //paddingHorizontal: 6,
    marginTop: 8,
    marginBottom: "auto",
  },
});
