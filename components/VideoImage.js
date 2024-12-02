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
import { Video } from "expo-av";

const screenWidth = Dimensions.get("window").width;

const VideoImage = ({ url }) => {
  const navigation = useNavigation();
  const [mediaFiles, setMediaFiles] = useState([]);

  const parseFeedUrls = (feedUrls) => {
    if (!feedUrls) return [];
    return feedUrls.split(",").map((url) => url.trim());
  };

  useEffect(() => {
    const processMedia = async () => {
      if (url) {
        const parsedMedia = parseFeedUrls(url);
        const validMedia = [];

        for (let url of parsedMedia) {
          if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
            validMedia.push({ type: "image", url });
          } else if (url.match(/\.(mp4|mov|m4v)$/)) {
            validMedia.push({ type: "video", url });
          }
        }

        setMediaFiles(validMedia);
      }
    };

    processMedia();
  }, [url]);

  const renderMedia = ({ item }) => {
    if (!item || !item.url) {
      return null;
    }

    if (item.type === "image") {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SingleImage", { imageUrl: item.url })
          }
        >
          <Image source={{ uri: item.url }} style={styles.image} />
        </TouchableOpacity>
      );
    } else if (item.type === "video") {
      return (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: item.url }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false} // Autoplay is off
            useNativeControls
            style={styles.video}
          />
        </View>
      );
    }

    return null;
  };

  return (
    <View>
      {mediaFiles.length > 0 ? (
        <FlatList
          data={mediaFiles}
          renderItem={renderMedia}
          keyExtractor={(item, index) => `${index}`}
          numColumns={1}
          contentContainerStyle={styles.mediaContainer}
        />
      ) : (
        <Text style={styles.noMediaText}>No media available</Text>
      )}
    </View>
  );
};

export default VideoImage;

const styles = StyleSheet.create({
  mediaContainer: {
    padding: 10,
  },
  image: {
    width: screenWidth,
    height: 300,
    resizeMode: "cover",
    marginBottom: 10,
  },
  videoContainer: {
    width: screenWidth,
    height: 300,
    marginBottom: 10,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  noMediaText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
