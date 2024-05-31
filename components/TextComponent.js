import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";

const TextComponent = ({ text }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleTextDisplay = () => {
    setShowFullText(!showFullText);
  };

  const truncatedText = text.length > 25 ? text.substring(0, 25) + "..." : text;

  return (
    <View>
      <Text style={styles.feedContent}>
        {showFullText ? text : truncatedText}
      </Text>
      {text.length > 22 && (
        <TouchableOpacity onPress={toggleTextDisplay}>
          <Text style={styles.showMoreButton}>
            {showFullText ? "Show Less" : "Show More"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextComponent;

const styles = StyleSheet.create({
  feedContent: {
    textAlign: "left",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    color: "black",
  },
  showMoreButton: {
    color: "black",
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 10,
  },
});
