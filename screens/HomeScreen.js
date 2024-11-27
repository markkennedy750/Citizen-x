import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { COLORS, SIZES } from "../constants";
import DummyFeedData from "../data/DummyFeedData";
import Feed from "../components/Feed";
import ApiFeed from "../components/ApiFeed";
import { authFeed } from "../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingImage from "../components/loadingStates/LoadingImage";
import TextButton from "../components/TextButton";
import ErrorImage from "../components/loadingStates/ErrorImage";
import { AUTH_FEEDS } from "../Redux/URL";
import axios from "axios";

const Home = () => {
  // const [apiFeeds, setApiFeeds] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [fetchedFeed, setFetchedFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //const dispatch = useDispatch();
  //const { loading, error, auth_feed } = useSelector((state) => state.auth);

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

  function handleError(error) {
    if (error.response) {
      console.log("Server error:", error.response.data.error);
      const errorMessage = error.response.data.error;
      Alert.alert("Error", errorMessage);
    } else if (error.request) {
      console.log("Network error:", error.message);
      Alert.alert(
        "Network error. Please check your internet connection and try again."
      );
    } else {
      console.log("Error:", error.message);
      Alert.alert("An unexpected error occurred. Please try again.");
    }
  }

  async function fetchFeed(accessToken) {
    setLoading(true);
    try {
      if (accessToken) {
        const response = await axios.get(
          "https://citizenx-9hk2.onrender.com/api/v1/incident_reports",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setFetchedFeed(response.data.incident_reports);
        //console.log(fetchedFeed);
        setLoading(false);
        //return response.data.incident_reports;
        setError(false);
      } else {
        const response = await axios.get(AUTH_FEEDS);
        setFetchedFeed(response.data.incident_reports);
        setLoading(false);
        setError(false);
        //return response.data.incident_reports;
      }
    } catch {
      handleError(error);
      setLoading(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFeed(accessToken);
    console.log(fetchedFeed);
  }, []);
  // dispatch(authFeed({ accessToken }));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFeed(accessToken);

    //dispatch(authFeed({ accessToken }));
    if (loading === false) {
      setRefreshing(false);
    }
  }, []);

  function refreshBtn() {
    fetchFeed(accessToken);

    // dispatch(authFeed({ accessToken }));
  }

  if (loading) return <LoadingImage />;
  //console.log("From feed section", auth_feed);

  if (error)
    return (
      <View style={styles.errorStyle}>
        <ErrorImage />
        <Text
          style={{
            color: "red",
            fontSize: 12,
            fontWeight: "400",
            textAlign: "center",
          }}
        >
          Failed to load Feed, please check your network connection or click to
          refresh
        </Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TextButton
            label="Refresh"
            buttonContainerStyle={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              borderRadius: SIZES.radius,
              backgroundColor: "#0E9C67",
            }}
            labelStyle={{
              color: COLORS.white,
              fontWeight: "700",
              fontSize: 18,
            }}
            onPress={refreshBtn}
          />
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 19,
            color: COLORS.primary,
            marginLeft: 15,
          }}
        >
          Reports Feed
        </Text>
      </View>

      <FlatList
        data={fetchedFeed}
        renderItem={({ item }) => <ApiFeed item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ ...styles.itemContainer, flexGrow: 1 }}
        ListFooterComponent={<View style={{ height: 105 }} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "white",
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    height: 30,
  },
  itemContainer: {
    //paddingHorizontal: 6,
    marginTop: 8,
    marginBottom: "auto",
  },
  errorStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
