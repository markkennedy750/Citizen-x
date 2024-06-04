import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import {
  MaterialIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import CustomImageSlider from "./CustomImageSlider";
import TextComponent from "./TextComponent";
import { useNavigation } from "@react-navigation/native";

function FooterButton({ text, IconFamily, IconName, onPress }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        onPress={() => onPress()}
      >
        <IconFamily name={IconName} size={24} color="black" />
      </TouchableOpacity>
      {text && <Text>{text}</Text>}
    </View>
  );
}

const Feed = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
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
              <AntDesign name="checkcircle" size={12} color="white" />
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
            <MaterialIcons name="place" size={15} color="red" />
            <Text style={styles.placeStyle}>{item.place}</Text>
          </View>
        </View>
      </View>
      <View style={styles.reporttype}>
        <Text style={styles.reportText}>{item.reportType}</Text>
      </View>
      <View style={{ marginRight: 10 }}>
        <TextComponent text={item.content} />
        {item.image && <CustomImageSlider images={item.image} />}
      </View>
      <View style={styles.iconContainer}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity>
            <Octicons name="thumbsup" size={24} color={COLORS.gray} />
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
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="comment-edit-outline"
              size={26}
              color={COLORS.gray}
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
            <Feather name="bookmark" size={24} color={COLORS.gray} />
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
            <Feather name="eye" size={24} color={COLORS.gray} />
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
            <MaterialCommunityIcons
              name="share-outline"
              size={28}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
