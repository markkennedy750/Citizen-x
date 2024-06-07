import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  StatusBar,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { COLORS, SIZES } from "../constants";
import notification from "../data/notification";
import { AntDesign } from "@expo/vector-icons";

const IconButton = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      style={{
        //...styles.iconButtonContainer,
        flex: 1,
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        marginRight: "auto",
        alignItems: "center",
        paddingLeft: 20,
        paddingTop: 15,
      }}
    >
      <AntDesign name="delete" size={35} color="black" />
    </TouchableWithoutFeedback>
  );
};

const Notification = () => {
  const [notifyData, setNotifyData] = useState(notification);

  function removeMyCardHandler() {
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
              backgroundColor: COLORS.lightGray1,
              ...styles.caryItemContainer,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                rowGap: 5,
                paddingHorizontal: 20,
              }}
            >
              <Image
                source={data.item.image}
                style={{
                  width: 58,
                  height: 59,
                  top: 10,
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
              backgroundColor: COLORS.primary,
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
      <View>{renderSwipeList()}</View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 40,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    height: 50,
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
    fontSize: 25,
    lineHeight: 28,
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
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
  },
  time: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    marginLeft:"auto",
    color:COLORS.gray
  },
  iconButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});
