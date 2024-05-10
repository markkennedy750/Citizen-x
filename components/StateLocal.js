import { View, Text } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { NigeriaStates, LocalGovernment } from "../data/state_local";
import { SIZES } from "../constants";

const StateLocal = ({
  selectedState,
  setSelectedState,
  selectedLocalGov,
  setSelectedLocalGov,
}) => {
  const localGovOptions = selectedState ? LocalGovernment[selectedState] : [];
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
        alignItems:"center",
        paddingVertical: SIZES.padding,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
          }}
        >
          State
        </Text>
        <RNPickerSelect
          placeholder={{ label: "Select a State", value: null }}
          onValueChange={(value) => setSelectedState(value)}
          items={NigeriaStates}
        />
        {selectedState && (
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
              }}
            >
              L.G.A
            </Text>
            <RNPickerSelect
              placeholder={{ label: "Select a Local Government", value: null }}
              onValueChange={(value) => setSelectedLocalGov(value)}
              items={localGovOptions.map((lg) => ({ label: lg, value: lg }))}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default StateLocal;
