import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
//import feeds from "../data/DummyFeedData";
//import Feed from "./Feed";
import { COLORS, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorImage from "./loadingStates/ErrorImage";
import TextButton from "./TextButton";

import LoadingImage from "./loadingStates/LoadingImage";
import { GET_USER_FEED } from "../Redux/URL";
import axios from "axios";
import ApiUserFeed from "./ApiUserFeed";
import ApiFeed from "./ApiFeed";

const UserPost = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [userFeed, setUserFeed] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const value = await AsyncStorage.getItem("access_token");
        const response = await axios.get(GET_USER_FEED, {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        });
        // console.log(
        //   "Auth Feeds successfully gotten:",
        //   response.data.incident_reports
        // );
        if (response.status === 200) {
          setUserFeed(response.data.reports);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);

        if (error.response) {
          console.log("server error:", error.response.data);
          setErrorMessage(
            "There was an issue with the server. Please try again later."
          );
          return rejectWithValue(error.response.data);
        } else if (error.request) {
          console.log("network error:", error.message);
          setErrorMessage(
            "Network error. Please check your internet connection and try again."
          );
          return rejectWithValue(error.message);
        } else {
          console.log("error:", error.message);
          setErrorMessage("An unexpected error occurred. Please try again.");
          return rejectWithValue(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const getData = async () => {
      try {
        setLoading(true);
        const value = await AsyncStorage.getItem("access_token");
        const response = await axios.get(GET_USER_FEED, {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        });
        // console.log(
        //   "Auth Feeds successfully gotten:",
        //   response.data.incident_reports
        // );
        if (response.status === 200) {
          setUserFeed(response.data.reports);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);

        if (error.response) {
          console.log("server error:", error.response.data);
          setErrorMessage(
            "There was an issue with the server. Please try again later."
          );
          return rejectWithValue(error.response.data);
        } else if (error.request) {
          console.log("network error:", error.message);
          setErrorMessage(
            "Network error. Please check your internet connection and try again."
          );
          return rejectWithValue(error.message);
        } else {
          console.log("error:", error.message);
          setErrorMessage("An unexpected error occurred. Please try again.");
          return rejectWithValue(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
    if (loading === false) {
      setRefreshing(false);
    }
  }, []);

  function refreshBtn() {
    const getData = async () => {
      try {
        setLoading(true);
        const value = await AsyncStorage.getItem("access_token");
        const response = await axios.get(GET_USER_FEED, {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        });
        // console.log(
        //   "Auth Feeds successfully gotten:",
        //   response.data.incident_reports
        // );
        if (response.status === 200) {
          setUserFeed(response.data.reports);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);

        if (error.response) {
          console.log("server error:", error.response.data);
          setErrorMessage(
            "There was an issue with the server. Please try again later."
          );
          return rejectWithValue(error.response.data);
        } else if (error.request) {
          console.log("network error:", error.message);
          setErrorMessage(
            "Network error. Please check your internet connection and try again."
          );
          return rejectWithValue(error.message);
        } else {
          console.log("error:", error.message);
          setErrorMessage("An unexpected error occurred. Please try again.");
          return rejectWithValue(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
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
          {errorMessage}
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
      {userFeed.length > 0 && userFeed !== null && (
        <FlatList
          data={userFeed}
          renderItem={({ item }) => <ApiUserFeed item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ ...styles.itemContainer, flexGrow: 1 }}
          ListFooterComponent={<View style={{ height: 105 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default UserPost;

const styles = StyleSheet.create({
  itemContainer: {
    //paddingHorizontal: 20,
    paddingTop: 2,
    marginBottom: "auto",
    backgroundColor: COLORS.white,
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
