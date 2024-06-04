import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
//const ITEM_SIZE = width / 2 - 3;

const ImageGrid = ({ images }) => {
  const itemsPerRow = Math.ceil(images.length / 2);

  return (
    <View style={styles.gridContainer}>
      {images.slice(0, itemsPerRow * 2).map((image, index) => (
        <View key={index} style={styles.gridItem}>
          <Image source={image} style={styles.image} />
        </View>
      ))}
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    //justifyContent: "space-between",
  },
  gridItem: {
    width: 120,
    height: 120,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
