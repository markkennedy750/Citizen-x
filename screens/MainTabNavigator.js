import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  //Dimensions,
  Modal,
  FlatList,
  //SafeAreaView,
  StyleSheet,
  //StatusBar,
  // ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, HotSpot, Report, Notification, Profile } from "./";
import "react-native-gesture-handler";
import {
  Ionicons,
  Octicons,
  Feather,
  Entypo,
  FontAwesome6,
} from "@expo/vector-icons";
import { icons, COLORS, SIZES } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

//import { SIZES, COLORS, icons } from "../constants";
import reportData from "../data/report";

import Container from "./ReportContainer/Container";
import TextIconButton from "../components/TextIconButton";
// const CustomBottomTabs = (props) => {
//   return <CustomBottomTab {...props} />;
// };
const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <LinearGradient
        color={[COLORS.primary, COLORS.background]}
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
        }}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const HeadeComponent = () => (
  <View style={styles.textContainer}>
    <Text style={styles.title}>Make a report</Text>
    <Text style={styles.subTitle}>
      Please select the category of report you want to make{" "}
    </Text>
  </View>
);
// function getWidth() {
//   let width = Dimensions.get("window").width;
//   width = width - 55;

//   return width / 5;
// }

const CustomTabBarLabel = ({ focused, label }) => (
  <Text
    style={{
      color: focused ? `${COLORS.primary}` : "black",
      fontWeight: "600",
    }}
  >
    {label}
  </Text>
);

const Home = ({ navigation }) => {
  const Tab = createBottomTabNavigator();

  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const footerButton = () => {
    return (
      <TextIconButton
        containerStyle={{
          height: 50,
          alignItems: "center",
          justifyContent: "flex-end",

          //marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: null,
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding,
        }}
        icon={icons.arrow_right}
        iconPosition="RIGHT"
        iconStyle={{
          tintColor: null,
        }}
        label="View Report Guidelines"
        labelStyle={{
          marginRight: SIZES.radius,
          fontWeight: "700",
          color: "#0276FF",
        }}
        onPress={() => navigation.navigate("GuideLine")}
      />
    );
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarStyle: {
            backgroundColor: "white",
            position: "absolute",
            bottom: 10,
            marginHorizontal: 10,
            height: 73,
            borderRadius: 18,
            // Shadow...
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 8,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: "20%",
                    //paddingBottom: 20,
                  }}
                >
                  {focused ? (
                    <Entypo name="home" size={33} color={`${COLORS.primary}`} />
                  ) : (
                    <Octicons
                      name="home"
                      size={32}
                      color={focused ? `${COLORS.primary}` : "black"}
                    />
                  )}

                  <CustomTabBarLabel focused={focused} label="Home" />
                </View>
              );
            },
          }}
          // listeners={({ navigation, route }) => ({
          //   tabPress: (e) => {
          //     Animated.spring(tabOffsetValue, {
          //       toValue: 0,
          //       useNativeDriver: true,
          //     }).start();
          //   },
          // })}
        />
        <Tab.Screen
          name="HotSpot"
          component={HotSpot}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: "20%",
                  }}
                >
                  {focused ? (
                    <FontAwesome6
                      name="location-pin"
                      size={32}
                      color={`${COLORS.primary}`}
                    />
                  ) : (
                    <Feather
                      name="map-pin"
                      size={32}
                      color={focused ? `${COLORS.primary}` : "black"}
                    />
                  )}

                  <CustomTabBarLabel focused={focused} label="Hotspots" />
                </View>
              );
            },
          }}
          // listeners={({ navigation, route }) => ({
          //   tabPress: (e) => {
          //     Animated.spring(tabOffsetValue, {
          //       toValue: getWidth() * 1.1,
          //       useNativeDriver: true,
          //     }).start();
          //   },
          // })}
        />
        <Tab.Screen
          name="Report"
          component={Report}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <TouchableOpacity onPress={() => toggleModal()}>
                  <View
                    style={{
                      width: 62,
                      height: 62,
                      backgroundColor: `${COLORS.primary}`,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 67,
                      //Shadow
                      shadowColor: "#000000",
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.19,
                      shadowRadius: 5.62,
                      elevation: 6,
                    }}
                  >
                    <Image
                      source={icons.plus_icon}
                      style={{
                        width: 40,
                        height: 40,
                        tintColor: "white",
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            },
            TabBarCustomButton: () => {
              <TabBarCustomButton {...props} />;
            },
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: "20%",
                  }}
                >
                  <Ionicons
                    name={focused ? "notifications" : "notifications-outline"}
                    size={33}
                    color={focused ? `${COLORS.primary}` : "black"}
                  />
                  <Text
                    style={{
                      color: focused ? `${COLORS.primary}` : "black",
                      fontSize: 12,
                      fontWeight: "600",
                      marginBottom: 3,
                    }}
                  >
                    Notification
                  </Text>
                </View>
              );
            },
          }}
          // listeners={({ navigation, route }) => ({
          //   tabPress: (e) => {
          //     Animated.spring(tabOffsetValue, {
          //       toValue: getWidth() * 3.2,
          //       useNativeDriver: true,
          //     }).start();
          //   },
          // })}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: "20%",
                  }}
                >
                  <Ionicons
                    name={
                      focused ? "person-circle-sharp" : "person-circle-outline"
                    }
                    size={34}
                    color={focused ? `${COLORS.primary}` : "black"}
                  />
                  <CustomTabBarLabel focused={focused} label="Profile" />
                </View>
              );
            },
          }}
          // listeners={({ navigation, route }) => ({
          //   tabPress: (e) => {
          //     Animated.spring(tabOffsetValue, {
          //       toValue: getWidth() * 4.3,
          //       useNativeDriver: true,
          //     }).start();
          //   },
          // })}
        />
      </Tab.Navigator>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        // style={{
        //   justifyContent: "center",
        //   alignItems: "center",
        //   borderWidth: 1,
        //   borderRadius: 25,
        // }}
      >
        <View style={styles.primaryContainer}>
          <View>
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={styles.imageContainer}
            >
              <Image style={styles.image} source={icons.arrow_back} />
            </TouchableOpacity>
          </View>

          <FlatList
            ListHeaderComponent={HeadeComponent}
            data={reportData}
            renderItem={({ item }) => <Container item={item} />}
            keyExtractor={(item) => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ ...styles.itemContainer, flexGrow: 1 }}
            ListFooterComponent={footerButton}
          />
        </View>
      </Modal>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    marginTop: 25,
    paddingHorizontal: 18,
    marginVertical: 15,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 25,
    borderColor: COLORS.gray2,
  },
  imageContainer: {
    width: 32,
    height: 30,
    marginTop: 15,
  },
  image: {
    flex: 1,
    width: 30,
    height: 25,
  },
  textContainer: {
    flexDirection: "column",
    marginTop: 20,
    justifyContent: "flex-end",
  },
  title: {
    color: `${COLORS.primary}`,
    fontWeight: "700",
    fontSize: 25,
    lineHeight: 28,
  },
  subTitle: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 19.6,
  },
  itemContainer: {
    width: 327,
    marginTop: 10,
    alignSelf: "center",
    alignItems: "center",
  },
});

// <Ionicons name="notifications-outline" size={24} color="black" />
// <Octicons name="home" size={24} color="black" />
// <Octicons name="person" size={24} color="black" /> <FontAwesome6 name="location-pin" size={24} color="black" />
// <Feather name="map-pin" size={24} color="black" /> <MaterialIcons name="home-filled" size={24} color="black" />
