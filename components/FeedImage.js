import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Helper function to parse feed URLs (split by comma)
const screenWidth = Dimensions.get("window").width;

const ReportFeed = ({ url }) => {
  const navigation = useNavigation();

  const [mediaFiles, setMediaFiles] = useState([]);
  const [numColumns, setNumColumns] = useState(1);

  const parseFeedUrls = (feedUrls) => {
    if (!feedUrls) return [];
    return feedUrls.split(",").map((url) => url.trim()); // Trim spaces and split by comma
  };

  useEffect(() => {
    console.log("unnique id", url);
  }, []);
  // Function to validate if an image URL is loadable
  const validateImage = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  // Function to process the media URLs
  useEffect(() => {
    const processMedia = async () => {
      if (url) {
        console.log("Processing URLs:", url);
        const parsedMedia = parseFeedUrls(url);
        const validMedia = [];

        for (let url of parsedMedia) {
          if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
            const isLoadable = await validateImage(url);
            if (isLoadable) {
              validMedia.push({ type: "image", url });
            }
          } else if (url.match(/\.(mp3|wav|ogg)$/)) {
            validMedia.push({ type: "audio", url });
          }
        }

        setMediaFiles(validMedia); // Update the mediaFiles state
        setNumColumns(validMedia.length > 1 ? 2 : 1); // Adjust number of columns based on items
      }
    };

    processMedia();
  }, [url]);

  // Render function for media items
  const renderMedia = ({ item, index }) => {
    if (!item || !item.url) {
      return null;
    }
    const isSingleImage = mediaFiles.length === 1;
    const isLastOddImage =
      mediaFiles.length % 2 !== 0 && index === mediaFiles.length - 1;

    if (item.type === "image") {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SingleImage", { imageUrl: item.url })
          }
        >
          <Image
            source={{ uri: item.url }}
            style={
              isSingleImage || isLastOddImage
                ? styles.singleImage
                : styles.image
            }
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View>
      {mediaFiles.length > 0 && (
        <FlatList
          data={mediaFiles}
          renderItem={renderMedia}
          keyExtractor={(media, index) => `${index}`} // Unique key using item ID
          numColumns={mediaFiles.length > 1 ? 2 : 1}
          horizontal={false}
          contentContainerStyle={styles.mediaContainer}
        />
      )}
    </View>
  );
};

export default ReportFeed;
const styles = StyleSheet.create({
  singleImage: {
    width: screenWidth,
    height: 300,
    resizeMode: "cover",
  },
  image: {
    width: screenWidth / 2,
    height: 200,
    resizeMode: "cover",
  },
});
