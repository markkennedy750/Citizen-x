import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants";
import {
  MaterialIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import TextComponent from "../components/TextComponent";
import ImageGrid from "../components/ImageGrid";
import CustomImageSlider from "../components/CustomImageSlider";
import TextDesc from "../components/TextDesc";
import CameraVideoMedia from "../components/CameraVideoMedia";
import TextButton from "../components/TextButton";
import AnonymousPost from "../components/AnonymousPost";

const FeedDetail = ({ route, navigation }) => {
  const [albums, setAlbums] = useState(null);
  const [storedRecording, setStoredRecording] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  function submitPost() {
    return textInput != "";
  }
  const { feed } = route.params;

  const renderFollowUp = ({ item }) => {
    return (
      <View style={styles.followUpContainer}>
        <View style={styles.profileContainer}>
          <Image source={item.user.profileImage} style={styles.profileImg} />
          <View style={{ marginLeft: 10 }}>
            <View style={styles.usernameContainer}>
              <Text style={styles.fulName}>{item.user.fullname}</Text>
              <Text style={styles.usename}>@{item.user.username}</Text>
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
        <View style={{ marginTop: 10 }}>
          <TextComponent text={item.content} />
          {item.image && <ImageGrid images={item.image} />}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.imageContainer}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        ListHeaderComponent={
          <View>
            <View style={styles.profileContainer}>
              <Image
                source={feed.user.profileImage}
                style={styles.profileImg}
              />
              <View style={{ marginLeft: 10 }}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.fulName}>{feed.user.fullname}</Text>
                  <Text style={styles.usename}>@{feed.user.username}</Text>
                  <View style={styles.verify}>
                    <Text style={styles.verifyText}>verified</Text>
                    <AntDesign name="checkcircle" size={12} color="white" />
                  </View>
                </View>
                <View style={styles.reportDaTim}>
                  <Text style={styles.date}>{feed.createdAt}</Text>
                  <View
                    style={{
                      width: 2,
                      height: 14,
                      backgroundColor: COLORS.gray,
                      marginHorizontal: 5,
                    }}
                  />
                  <MaterialIcons name="place" size={15} color="red" />
                  <Text style={styles.placeStyle}>{feed.place}</Text>
                </View>
              </View>
            </View>
            <View style={styles.reporttype}>
              <Text style={styles.reportText}>{feed.reportType}</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <TextComponent text={feed.content} />
              {feed.image && <CustomImageSlider images={feed.image} />}
              <View style={styles.iconContainer}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity style={{ width: 25 }}>
                    <Octicons name="thumbsup" size={18} color="#000000" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 14,
                      marginHorizontal: 5,
                      lineHeight: 17,
                      marginHorizontal: 5,
                    }}
                  >
                    {feed.numOfLike}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity style={{ width: 25 }}>
                    <Feather name="bookmark" size={19} color="#000000" />
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
                    <Feather name="eye" size={16} color="#000000" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 14,
                      marginHorizontal: 5,
                      lineHeight: 17,
                    }}
                  >
                    {feed.numberOfView}
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
                    <AntDesign name="sharealt" size={19} color="#000000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        }
        ListHeaderComponentStyle={styles.headerComponentStyle}
        data={feed.followUp}
        renderItem={renderFollowUp}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        //contentContainerStyle={styles.flatListStyle}
        ListFooterComponent={
          <View style={{ paddingVertical: 20, flex: 1 }}>
            <TextDesc
              onChange={setTextInput}
              value={textInput}
              placeholder="Enter Description"
            />
            <CameraVideoMedia
              setAlbums={setAlbums}
              setStoredRecording={setStoredRecording}
              setPhotoUri={setPhotoUri}
            />
            <AnonymousPost isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
            <TextButton
              label="Submit Report"
              disabled={submitPost() ? false : true}
              buttonContainerStyle={{
                height: 55,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: submitPost() ? "#0E9C67" : COLORS.invisible,
              }}
              labelStyle={{
                color: COLORS.white,
                fontWeight: "700",
                fontSize: 17,
              }}
              onPress={() => navigation.navigate("MainScreen")}
            />
          </View>
        }
      />
    </View>
  );
};

export default FeedDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 45,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  followUpContainer: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#F0F0F0",
    borderColor: COLORS.gray,
    padding: 10,
    marginVertical: 15,
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
  headerComponentStyle: {
    paddingVertical: 20,
  },
  flatListStyle: {
    paddingHorizontal: 5,
  },
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
  flatListStyle: {
    marginVertical: 15,
  },
  iconContainer: {
    paddingTop: 2,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
  },
});
