import { Animated, View, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SavedDraft from "./SavedDraft";
import BookMark from "./BookMark";
import UserPost from "./UserPost";

const Tab = createMaterialTopTabNavigator();

export default function BottomTabFeed() {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Post" component={UserPost} />
      <Tab.Screen name="SavedDraft" component={SavedDraft} />
      <Tab.Screen name="BookMark" component={BookMark} />
    </Tab.Navigator>
  );
}
