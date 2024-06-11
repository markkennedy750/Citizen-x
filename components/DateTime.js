import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Fontisto, Feather } from "@expo/vector-icons";
import { COLORS } from "../constants";

const DateTime = ({ date, setDate, time, setTime }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const showDateMode = () => {
    setShowDatePicker(true);
  };

  const showTimeMode = () => {
    setShowTimePicker(true);
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 20,
              color: "#000000B2",
            }}
          >
            Date of Incident
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1.2,
              borderRadius: 5,
              width: 160,
              height: 45,
              paddingHorizontal: 10,
              borderColor: COLORS.gray2,
            }}
            onPress={showDateMode}
          >
            <Text style={{ fontSize: 16 }}>{date.toLocaleDateString()}</Text>
            <Fontisto name="date" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 20,
              color: "#000000B2",
            }}
          >
            Time of Incident
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1.2,
              borderRadius: 5,
              width: 160,
              height: 45,
              paddingHorizontal: 10,
              borderColor: COLORS.gray2,
            }}
            onPress={showTimeMode}
          >
            <Text style={{ fontSize: 16 }}>{time.toLocaleTimeString()}</Text>
            <Feather name="watch" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <RNDateTimePicker
            mode="date"
            display="calendar"
            value={date}
            onChange={onDateChange}
          />
        )}
        {showTimePicker && (
          <RNDateTimePicker
            mode="time"
            display="clock"
            value={time}
            onChange={onTimeChange}
          />
        )}
      </View>
    </>
  );
};

export default DateTime;
