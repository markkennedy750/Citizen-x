import { StyleSheet, Text, View, StatusBar, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../constants";
import DummyFeedData from "../data/DummyFeedData";
import Feed from "../components/Feed";
import { authFeed } from "../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingImage from "../components/loadingStates/LoadingImage";

const Home = () => {
  // const [apiFeeds, setApiFeeds] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const dispatch = useDispatch();
  const { loading, error, auth_feed } = useSelector((state) => state.auth);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("access_token");
        setAccessToken(value);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    dispatch(authFeed({ accessToken }));
  }, [dispatch]);

  if (loading) return <LoadingImage />;
  //console.log("From feed section", auth_feed);

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
    height: 35,
  },
  itemContainer: {
    //paddingHorizontal: 6,
    marginTop: 8,
    marginBottom: "auto",
  },
});
