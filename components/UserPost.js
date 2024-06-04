import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import feeds from "../data/DummyFeedData";
import Feed from "./Feed";
import { COLORS } from "../constants";

const UserPost = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={feeds}
        renderItem={({ item }) => <Feed item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ ...styles.itemContainer, flexGrow: 1 }}
        ListFooterComponent={<View style={{ height: 110 }} />}
      />
    </View>
  );
};

export default UserPost;

const styles = StyleSheet.create({
  itemContainer: {
    //paddingHorizontal: 20,
    paddingTop: 5,
    marginBottom: "auto",
    backgroundColor:COLORS.white
  },
});
