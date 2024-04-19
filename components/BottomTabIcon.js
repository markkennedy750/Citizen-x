import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeIcon from "../assets/icons/svg/Home.svg";
import HotSpotIcon from "../assets/icons/svg/HotSpot.svg";
import NotificationIcon from "../assets/icons/svg/Notification.svg";
import ProfileIcon from "../assets/icons/svg/Profile.svg";
import ReportIcon from "../assets/icons/svg/Report.svg";

const BottomTabIcon = ({ route, isFocused }) => {
  const renderIcon = (route, isFocused) => {
    let height = 34;
    let width = 34;

    switch (route) {
      case "Home":
        return (
          <HomeIcon
            width={width}
            height={height}
            fill={isFocused ? "#0E9C67" : "#000a03"}
          />
        );
      case "HotSpot":
        return (
          <HotSpotIcon
            width={width}
            height={height}
            fill={isFocused ? "#0E9C67" : "#000a03"}
          />
        );
      case "Report":
        return (
          <ReportIcon
            width={width}
            height={height}
            fill={isFocused ? "#0E9C67" : "#000a03"}
          />
        );
      case "Notification":
        return (
          <NotificationIcon
            width={width}
            height={height}
            fill={isFocused ? "#0E9C67" : "#000a03"}
          />
        );
      case "Profile":
        return (
          <ProfileIcon
            width={width}
            height={height}
            fill={isFocused ? "#0E9C67" : "#000a03"}
          />
        );

      default:
        break;
    }
  };
  return <View>{renderIcon(route, isFocused)}</View>;
};

export default BottomTabIcon;

const styles = StyleSheet.create({});
