import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  //Dimensions,
} from "react-native";
import React, { useRef } from "react";
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
import { icons, COLORS } from "../constants";
import { LinearGradient } from "expo-linear-gradient";


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
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarStyle: {
            backgroundColor: "white",
            position: "absolute",
            bottom: 15,
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
                <TouchableOpacity onPress={() => navigation.navigate("Report")}>
                  <View
                    style={{
                      width: 62,
                      height: 62,
                      backgroundColor: `${COLORS.primary}`,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 67,
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
                    size={33}
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
      
    </>
  );
};

export default Home;


// <Ionicons name="notifications-outline" size={24} color="black" />
// <Octicons name="home" size={24} color="black" />
// <Octicons name="person" size={24} color="black" /> <FontAwesome6 name="location-pin" size={24} color="black" />
// <Feather name="map-pin" size={24} color="black" /> <MaterialIcons name="home-filled" size={24} color="black" />
