import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { COLORS, icons } from "../constants";
import CustomImageSlider from "./CustomImageSlider";
import TextComponent from "./TextComponent";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const ApiFeed = ({ item }) => {
  const navigation = useNavigation();
  const images = item.image;
  const [upvote, setupvote] = useState(true);
  const [downvote, setdownvote] = useState(false);

  const date = item?.time_of_incidence;
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).charAt(0);

    return `${year}-${month}-${day} : ${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  function upVoteClick() {
    setupvote((prev) => !prev);
  }
  function downVoteClick() {
    setdownvote((prev) => !prev);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          //navigation.navigate("ApiFeedDetail", { feed: item });
        }}
      >
        <View style={styles.profileContainer}>
          <Image source={icons.anonymous} style={styles.profileImg} />
          <View style={{ marginLeft: 10 }}>
            <View style={styles.usernameContainer}>
              <Text style={styles.fulName}>{item?.fullname}</Text>
              <Text style={styles.usename}>@{item?.username}</Text>
              {item?.report_status === "Pending" ? (
                <View style={styles.verify}>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 14,
                      fontWeight: "700",
                      color: COLORS.white,
                    }}
                  >
                    Pending
                  </Text>
                </View>
              ) : (
                <View style={styles.verify}>
                  <Text style={styles.verifyText}>verified</Text>
                  <Image
                    source={icons.checkbox}
                    style={{
                      width: 12,
                      height: 12,
                      tintColor: "white",
                    }}
                  />
                </View>
              )}
            </View>
            <View style={styles.reportDaTim}>
              {item?.time_of_incidence && (
                <Text style={styles.date}>{formatDate(date)}</Text>
              )}

              <View
                style={{
                  width: 2,
                  height: 14,
                  backgroundColor: COLORS.gray,
                  marginHorizontal: 5,
                }}
              />
              <Image
                source={icons.hotspots}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: "red",
                }}
              />
              <Text style={{ ...styles.placeStyle, marginRight: 3 }}>
                {item?.state_name}
              </Text>
              <Text style={styles.placeStyle}>{item?.lga_name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.reporttype}>
          <Text style={styles.reportText}>{item?.category}</Text>
        </View>
      </TouchableOpacity>
      <View style={{ marginRight: 10 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <TextComponent text={item?.description} />
        </View>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.voteContainer}>
          <TouchableOpacity
            style={{ width: 25, paddingBottom: 2 }}
            onPress={() => upVoteClick()}
          >
            <Image
              source={upvote ? icons.upvoteIcon : icons.upVoteClick}
              style={{
                width: 28,
                height: 28,
                tintColor: "#000000",
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              marginHorizontal: 5,
              lineHeight: 17,
            }}
          >
            {item?.like_count}
          </Text>

          <TouchableOpacity
            style={{ width: 25, paddingBottom: 2 }}
            onPress={() => downVoteClick()}
          >
            <Image
              source={downvote ? icons.downvoteIcon : icons.downVoteClick}
              style={{
                width: 28,
                height: 28,
                tintColor: "#000000",
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.followUpContainer}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
            }}
            onPress={() => {
              //navigation.navigate("FeedDetail", { feed: item });
            }}
          >
            <Image
              source={icons.swipeicon}
              style={{
                width: 45,
                height: 45,
                tintColor: "#000000",
              }}
            />
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                marginRight: 4,
                lineHeight: 17,
              }}
            >
              Follow Up
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity style={{ width: 20 }}>
            <Image
              source={icons.bookmarkicon}
              style={{
                width: 19,
                height: 19,
                tintColor: "#000000",
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity>
            <Image
              source={icons.eyeseenicon}
              style={{
                width: 20,
                height: 20,
                tintColor: "#000000",
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 14,
              marginHorizontal: 5,
              lineHeight: 17,
            }}
          >
            {item?.view}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity>
            <Image
              source={icons.shareicon}
              style={{
                width: 20,
                height: 20,
                tintColor: "#000000",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ApiFeed;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    borderBottomColor: COLORS.gray,
  },
  profileContainer: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  profileImg: {
    width: 44,
    height: 45,
    borderRadius: 10,
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fulName: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 19.6,
    color: COLORS.black,
  },
  usename: {
    color: COLORS.gray,
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 16.9,
    marginLeft: 5,
  },
  reportDaTim: {
    flexDirection: "row",
    height: 20,
    alignItems: "center",
  },
  date: {
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 16.8,
    color: COLORS.gray,
  },
  placeStyle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 19.6,
    color: COLORS.gray,
  },
  reporttype: {
    marginVertical: 15,
    borderWidth: 1.3,
    height: 30,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderColor: COLORS.primary,
    marginHorizontal: 12,
  },
  reportText: {
    color: COLORS.primary,
    fontWeight: "700",
    textAlign: "center",
  },
  feedContent: {
    textAlign: "left",
    marginBottom: 10,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    color: "black",
  },
  reportImage: {},
  verify: {
    borderRadius: 10,
    backgroundColor: "#0276FF",
    width: 72,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginLeft: 5,
  },
  verifyText: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
    color: "white",
  },
  reportImg: {
    height: 350,
    width: 410,
    borderRadius: 10,
  },
  iconContainer: {
    paddingTop: 5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d8d8d8",
    padding: 8,
    gap: 5,
    borderRadius: 10,
    height: 40,
  },
  followUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d8d8d8",
    padding: 2,
    //gap: 5,
    borderRadius: 10,
    height: 40,
  },
});
