import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS, icons, SIZES } from "../constants";
//import DummyFeedData from "../data/DummyFeedData";
//import Feed from "../components/Feed";
import ApiFeed from "../components/ApiFeed";
import { RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authSearchFeed } from "../Redux/authSlice";
import ErrorImage from "../components/loadingStates/ErrorImage";
import TextButton from "../components/TextButton";
import LoadingImage from "../components/loadingStates/LoadingImage";
import { SEARCH } from "../Redux/URL";
import axios from "axios";

const SearchScreen = ({ navigation, route }) => {
  const { reportType, selectedState, selectedLocalGov } = route.params;
  const [accessToken, setAccessToken] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [searchFeed, setSearchFeed] = useState([]);
  const [loading, setLoading] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");

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

  async function searchFnc(reportType, selectedState, selectedLocalGov) {
    try {
      setLoading(true);
      const url = `https://citizenx-9hk2.onrender.com/api/v1/reports/filters?category=${reportType}&state=${selectedState}&lga=${selectedLocalGov}`;

      const value = await AsyncStorage.getItem("access_token");
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      });
      if (response.status === 200) {
        setSearchFeed(response.data.reports);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log("server error:", error.response.data);
        setErrorMessage(
          "There was an issue with the server. Please try again later."
        );
        return setError(error.response.data);
      } else if (error.request) {
        console.log("network error:", error.message);
        setErrorMessage(
          "Network error. Please check your internet connection and try again."
        );
        return setError(error.message);
      } else {
        console.log("error:", error.message);
        setErrorMessage("An unexpected error occurred. Please try again.");
        return setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    searchFnc(reportType, selectedState, selectedLocalGov);
  }, [reportType, selectedState, selectedLocalGov]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    searchFnc(reportType, selectedState, selectedLocalGov);
    if (loading === false) {
      setRefreshing(false);
    }
  }, []);

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
            onPress={() => {
              searchFnc(reportType, selectedState, selectedLocalGov);
            }}
          />
        </View>
      </View>
    );

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
            <Text style={styles.seachText}>{reportType}</Text>
            <Text style={styles.seachText}>{selectedState}</Text>
            <Text style={styles.seachText}>{selectedLocalGov}</Text>
          </View>
        </View>
      </View>
      <View style={styles.numberOfSearch}>
        <Text style={styles.searchText}>Over {searchFeed.length} reports</Text>
      </View>

      <FlatList
        data={searchFeed}
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

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: COLORS.white,
    //paddingVertical: 16,
  },
  goBackButton: {
    paddingHorizontal: 10,
  },
  topContainer: {
    height: "auto",
    width: "100%",
    borderBottomWidth: 1.5,
    borderColor: COLORS.gray,
    paddingbottom: 8,
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
    //paddingHorizontal: 20,
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
