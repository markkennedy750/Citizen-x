import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { Image } from "expo-image";

const Medialibrary = () => {
  const [assets, setAssets] = useState([]);

  async function getAlbums() {
    const fetchAlnums = await getAlbumsAsync();
    const albumAssets = await getAssetsAsync({
      mediaType: "photo",
      sortBy: "creationTime",
    });

    setAssets(albumAssets.assets);
  }

  useEffect(() => {
    getAlbums();
  }, []);
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          //paddingTop:50,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {assets.map((photo) => (
          <Image
            key={photo.id}
            source={photo.uri}
            style={{ width: "25%", height: 100 }}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default Medialibrary;

const styles = StyleSheet.create({});
