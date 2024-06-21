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
    <View style={styles.sliderContainer}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatListRef}
        contentContainerStyle={contentContainerStyle}
        snapToAlignment="center"
        decelerationRate="fast"
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <Text
            key={index}
            style={[
              styles.dot,
              { color: index === activeIndex ? "black" : "gray" },
            ]}
          >
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  flatList: {
    width: viewportWidth,
  },
  imageContainer: {
    width: viewportWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: viewportWidth * 0.85,
    height: viewportWidth * 0.7, // Adjust based on aspect ratio
    resizeMode: "cover",
    borderRadius: 5,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    fontSize: 19,
    //marginHorizontal: 1,
  },
});

export default CustomImageSlider;
