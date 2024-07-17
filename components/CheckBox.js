import { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from 'expo-font';

export default function CheckBox({ checked, setChecked, label }) {
  function MyCheckbox({ onChange, checked }) {
    return (
      <Pressable style={styles.checkboxBase} onPress={onChange}>
        <MaterialIcons
          name={checked ? "radio-button-checked" : "radio-button-unchecked"}
          size={36}
          color={checked ? "#0E9C67" : "black"}
        />
      </Pressable>
    );
  }

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        ...MaterialIcons.font,
      });
    };

    loadFonts();
  }, []);
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingVertical: 8,
      }}
    >
      <MyCheckbox onChange={() => setChecked()} checked={checked} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },

  label: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 20,
    marginLeft: 8,
  },
});
