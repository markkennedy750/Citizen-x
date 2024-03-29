import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, HotSpot, Report, Notification, Profile } from "./";
import CustomBottomTab from "../components/CustomBottomTab";

const CustomBottomTabs = (props) => {
  return <CustomBottomTab {...props} />;
};

const Home = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator tabBar={CustomBottomTabs}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="HotSpot" component={HotSpot} />
      <Tab.Screen name="Report" component={Report} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Home;
