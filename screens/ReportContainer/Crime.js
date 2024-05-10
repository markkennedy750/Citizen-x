import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ReportWrapper from "./ReportWrapper";
import InsidentType from "../../components/InsidentType";
import TextDesc from "../../components/TextDesc";

const Crime = () => {
  const [insidentType, setInsidentType] = useState("");
  const [textInput, setTextInput] = useState("");

  const crime = [
    { label: "Theft", value: "Theft" },
    { label: "Robbery", value: "Robbery" },
    { label: "Vandalism", value: "Vandalism" },
    { label: "Kidnapping", value: "Kidnapping" },
    { label: "Assault", value: "Kidnapping" },
  ];
  return (
    <ReportWrapper title="Crime & Safety">
      <InsidentType
        insidenType={insidentType}
        setInsidentType={setInsidentType}
        labelType="Crime Type"
        label="Select the type of Insident"
        insident={crime}
      />
      <TextDesc
        onChange={setTextInput}
        value={textInput}
        placeholder="Enter Description"
      />
    </ReportWrapper>
  );
};

export default Crime;

const styles = StyleSheet.create({});
