import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { COLORS, icons } from "../constants";
import CustomImageSlider from "./CustomImageSlider";
import TextComponent from "./TextComponent";
import { useNavigation } from "@react-navigation/native";


const Feed = ({ item }) => {
  const navigation = useNavigation();
  const images = item.image;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("FeedDetail", { feed: item })}
      >
        <View style={styles.profileContainer}>
          <Image source={item.user.profileImage} style={styles.profileImg} />
          <View style={{ marginLeft: 10 }}>
            <View style={styles.usernameContainer}>
              <Text style={styles.fulName}>{item.user.fullname}</Text>
              <Text style={styles.usename}>@{item.user.username}</Text>
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
            </View>
            <View style={styles.reportDaTim}>
              <Text style={styles.date}>{item.createdAt}</Text>
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
              <Text style={styles.placeStyle}>{item.place}</Text>
            </View>
          </View>
        </View>
        <View style={styles.reporttype}>
          <Text style={styles.reportText}>{item.reportType}</Text>
        </View>
      </TouchableOpacity>
      <View style={{ marginRight: 10 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <TextComponent text={item.content} />
        </View>

        {item.image && (
          <TouchableOpacity
            onPress={() => navigation.navigate("ImageScreen", { images })}
          >
            <CustomImageSlider images={item.image} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.iconContainer}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity style={{ width: 25, paddingBottom: 2 }}>
            <Image
              source={icons.likeicon}
              style={{
                width: 25,
                height: 25,
                tintColor: "#000000",
              }}
              resizeMode="contain"
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
            {item.numOfLike}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => navigation.navigate("FeedDetail", { feed: item })}
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
                marginHorizontal: 3,
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
            {item.numberOfView}
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

export default Feed;

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
    fontSize: 13,
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
    height: 23,
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
});
