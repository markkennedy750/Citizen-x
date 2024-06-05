import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const Task = () => {
  const Text = ({ tasks, points, you }) => {
    return (
      <View style={styles.reportContainer}>
        <Text style={styles.textContent}>{tasks}</Text>
        <Text style={styles.textContent}>{points}</Text>
        <Text style={styles.textContent}>{you}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Task</Text>
        <Text style={styles.text}>Points</Text>
        <Text style={styles.text}>You got</Text>
      </View>
      <Text tasks="Video Reports" points="4 X Points" you={12} />
      <Text tasks="Audio Reports" points="25 X Points" you="-" />
      <Text tasks="Follow-Up Reports" points="2 X Points" you={4} />
      <Text tasks="Instant Report Time" points="4 X Points" you={16} />
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: COLORS.gray,
    height: 40,
  },
  text: {
    fontWeight: "700",
    fontSize: 18,
    color: COLORS.gray,
  },
  reportContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 60,
    borderBottomWidth: 1,
    borderColor: COLORS.gray,
    marginTop: 10,
  },
  textContent: {
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 20,
  },
});
