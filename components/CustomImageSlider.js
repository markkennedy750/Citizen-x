import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";

const { width: viewportWidth } = Dimensions.get("window");

const CustomImageSlider = ({ images, contentContainerStyle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / viewportWidth);
    setActiveIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <View>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatListRef}
        style={{ ...styles.flatList, ...contentContainerStyle }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginRight: "auto",
    width: 415,
    
  },
  imageContainer: {
    width: viewportWidth,
    justifyContent: "center",
    alignItems:"flex-start"
  },
  image: {
    width: viewportWidth * 0.8,
    height: viewportWidth * 0.5,
    borderRadius: 8,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    fontSize: 24,
    marginHorizontal: 3,
  },
});

export default CustomImageSlider;
