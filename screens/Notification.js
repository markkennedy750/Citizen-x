import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { COLORS, SIZES, icons } from "../constants";
import notification from "../data/notification";

const IconButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.iconButtonContainer,
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#db3951",
        marginRight: "auto",
        alignItems: "center",
        marginBottom: 15,
        marginLeft: 10,
      }}
    >
      <Image
        source={icons.deleteIcon}
        style={{ width: 37, height: 37, tintColor: `${COLORS.white}` }}
      />
    </TouchableOpacity>
  );
};

const Notification = () => {
  const [notifyData, setNotifyData] = useState(notification);

  function removeMyCardHandler(id) {
    let newMyCardList = [...notifyData];
    const index = newMyCardList.findIndex((card) => card.id === id);

    newMyCardList.splice(index, 1);

    setNotifyData(newMyCardList);
  }

  function renderSwipeList() {
    return (
      <SwipeListView
        data={notifyData}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{
          marginTop: 12,
          paddingHorizontal: 15,
          paddingBottom: SIZES.padding * 2,
        }}
        //disableRightSwipe={true}
        leftOpenValue={75}
        //rightOpenValue={-75}
        renderItem={(data, rowMap) => (
          <View
            style={{
              height: 100,
              backgroundColor: "#c4f5d1",
              ...styles.caryItemContainer,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                gap: 10,
                paddingHorizontal: 20,
                alignItems: "center",
              }}
            >
              <Image
                source={data.item.image}
                style={{
                  width: 50,
                  height: 50,
                  top: 10,
                  borderRadius: 10,
                }}
              />

              <Text style={styles.notificationData}>{data.item.text}</Text>
            </View>
            <Text style={styles.time}>{data.item.time}</Text>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View
            style={{
              backgroundColor: "#db3951",
              marginTop: 10,
              height: 95,
              borderRadius: 20,
            }}
          >
            <IconButton onPress={() => removeMyCardHandler(data.item.id)} />
          </View>
        )}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.notifyText}>Notification</Text>
      </View>
      <ScrollView>{renderSwipeList()}</ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    height: 25,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    borderBottomWidth: 1.5,
    borderColor: COLORS.gray,
    //paddingLeft: 15,
  },
  notifyText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 19,
    lineHeight: 23,
    marginLeft: 15,
  },
  caryItemContainer: {
    //flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.radius,
    paddingHorizontal: 12,
    borderRadius: SIZES.radius,
  },
  notificationData: {
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "left",
  },
  time: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    marginLeft: "auto",
    color: COLORS.gray,
  },
  iconButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});
