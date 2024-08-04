import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import {
  getAlbumsAsync,
  getAssetsAsync,
  saveToLibraryAsync,
  usePermissions,
} from "expo-media-library";
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import * as WebBrowser from "expo-web-browser";
import { SymbolView } from "expo-symbols";
import { COLORS, icons } from "../constants";
import { shareAsync } from "expo-sharing";

//import {  VideoView } from "expo-video";

function IconButton(
  iosName,
  containerStyle,
  height,
  onPress,
  width
) {
  const CONTAINER_PADDING = 5;
  const CONTAINER_WIDTH = 34;
  const ICON_SIZE = 25;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: "#00000050",
          padding: CONTAINER_PADDING,
          borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
          width: CONTAINER_WIDTH,
        },
        containerStyle,
      ]}
    >
      <SymbolView
        name={iosName}
        size={ICON_SIZE}
        style={width && height ? { width, height } : {}}
        tintColor={"white"}
      />
    </TouchableOpacity>
  );
}

function MainRowActions({ cameraMode, handleTakePicture, isRecording }) {
  const [assets, setAssets] = useState([]);

  async function getAlbums() {
    const fetchAlnums = await getAlbumsAsync();
    const albumAssets = await getAssetsAsync({
      mediaType: "photo",
      sortBy: "creationTime",
      first: 6,
    });

    setAssets(albumAssets.assets);
  }

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <View style={styles.mainRowContainer}>
      <FlatList
        data={assets}
        inverted
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            key={item.id}
            source={item.uri}
            style={{
              width: 40,
              height: 40,
              borderRadius: 5,
            }}
          />
        )}
        horizontal
        contentContainerStyle={{ gap: 6 }}
      />
      <TouchableOpacity onPress={handleTakePicture}>
        <SymbolView
          name={
            cameraMode === "picture"
              ? "circle"
              : isRecording
              ? "record.circle"
              : "circle.circle"
          }
          size={90}
          type="hierarchical"
          tintColor={isRecording ? COLORS.primary : "white"}
          animationSpec={{
            effect: {
              type: isRecording ? "pulse" : "bounce",
            },
            repeating: isRecording,
          }}
          fallback={
            cameraMode === "picture" ? (
              <Image
                source={icons.dotcircle}
                style={{ height: 100, width: 100, tintColor: "white" }}
              />
            ) : isRecording ? (
              <Image
                source={icons.circlestop}
                style={{ height: 100, width: 100, tintColor: "white" }}
              />
            ) : (
              <Image
                source={icons.playcircle}
                style={{ width: 90, height: 90, tintColor: "white" }}
              />
            )
          }
        />
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 2 }}
        showsHorizontalScrollIndicator={false}
      >
        {[0, 1, 2, 3].map((item) => (
          <Image
            source={icons.tagfaces}
            style={{ width: 50, height: 50, tintColor: "white" }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function QRCodeButton({ handleOpenQRCode }) {
  return (
    <TouchableOpacity
      onPress={handleOpenQRCode}
      style={{
        width: 200,
        alignItems: "center",
        top: "65%",
        alignSelf: "center",
        padding: 6,
        borderWidth: 3,
        borderRadius: 10,
        borderStyle: "dashed",
        borderColor: "white",
      }}
    >
      <IconButton iosName="qrcode" androidName="qr-code" />
      <Text style={{ color: "white" }}>QR Code Detected</Text>
    </TouchableOpacity>
  );
}

function CameraTools({
  cameraZoom,
  cameraFlash,
  cameraTorch,
  setCameraZoom,
  setCameraFacing,
  setCameraTorch,
  setCameraFlash,
}) {
  const CONTAINER_PADDING = 5;
  const CONTAINER_WIDTH = 34;
  const ICON_SIZE = 25;

  return (
    <View
      style={{
        position: "absolute",
        right: 6,
        gap: 16,
        zIndex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => setCameraTorch((prev) => !prev)}
        style={[
          {
            backgroundColor: "#00000050",
            padding: CONTAINER_PADDING,
            borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
            width: CONTAINER_WIDTH,
            marginTop: 35,
            marginRight: 10,
          },
        ]}
      >
        <Image
          source={icons.flashicon}
          style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: "white" }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setCameraFacing((prevValue) =>
            prevValue === "back" ? "front" : "back"
          )
        }
        style={[
          {
            backgroundColor: "#00000050",
            padding: CONTAINER_PADDING,
            borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
            width: CONTAINER_WIDTH,
            marginTop: 10,
            marginRight: 10,
          },
        ]}
      >
        <Image
          source={icons.camerareverseicon}
          style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: "white" }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setCameraFlash((prevValue) => (prevValue === "off" ? "on" : "off"))
        }
        style={[
          {
            backgroundColor: "#00000050",
            padding: CONTAINER_PADDING,
            borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
            width: CONTAINER_WIDTH,
            marginTop: 10,
            marginRight: 10,
          },
        ]}
      >
        <Image
          source={icons.flashlightoutline}
          style={{ height: ICON_SIZE, width: ICON_SIZE, tintColor: "white" }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (cameraZoom < 1) {
            setCameraZoom((prevValue) => prevValue + 0.01);
          }
        }}
        style={[
          {
            backgroundColor: "#00000050",
            padding: CONTAINER_PADDING,
            borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
            width: CONTAINER_WIDTH,
            marginTop: 10,
            marginRight: 10,
          },
        ]}
      >
        <Image
          source={icons.addcircleoutline}
          style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: "white" }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (cameraZoom > 0) {
            setCameraZoom((prevValue) => prevValue - 0.01);
          }
        }}
        style={[
          {
            backgroundColor: "#00000050",
            padding: CONTAINER_PADDING,
            borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
            width: CONTAINER_WIDTH,
            marginTop: 10,
            marginRight: 6,
          },
        ]}
      >
        <Image
          source={icons.minuscircleo}
          style={{ width: 30, height: 30, tintColor: "white" }}
        />
      </TouchableOpacity>
    </View>
  );
}
const CameraScreen = ({ route, navigation }) => {
  const { setPhotoUri, videoMedia, setVideoMedia } = route.params;
  const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermisson] =
    usePermissions();
  const cameraRef = useRef(null);
  const [cameraMode, setCameraMode] = useState("picture");
  const [qrCodeDetected, setQrCodeDetected] = useState("");
  const [isBrowsing, setIsBrowsing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const timeoutRef = useRef(null);
  const [cameraZoom, setCameraZoom] = useState(0);
  const [cameraTorch, setCameraTorch] = useState(false);
  const [cameraFlash, setCameraFlash] = useState("off");
  const [cameraFacing, setCameraFacing] = useState("back");
  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");

  function PictureView({ picture, setPicture }) {
    const CONTAINER_PADDING = 5;
    const CONTAINER_WIDTH = 34;
    const ICON_SIZE = 25;
    return (
      <View>
        <View
          style={{
            position: "absolute",
            right: 6,
            zIndex: 1,
            paddingTop: 50,
            gap: 16,
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              await saveToLibraryAsync(picture);
              Alert.alert("Picture saved to phone Library");
              navigation.goBack();
            }}
            style={[
              {
                backgroundColor: "#00000050",
                padding: CONTAINER_PADDING,
                borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
                width: CONTAINER_WIDTH,
                marginTop: 10,
                marginRight: 10,
              },
            ]}
          >
            <Image
              source={icons.saveoutline}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                tintColor: "white",
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPicture("")}
            style={[
              {
                backgroundColor: "#00000050",
                padding: CONTAINER_PADDING,
                borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
                width: CONTAINER_WIDTH,
                marginTop: 10,
                marginRight: 10,
              },
            ]}
          >
            <Image
              source={icons.deleteIcon}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                tintColor: "white",
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => await shareAsync(picture)}
            style={[
              {
                backgroundColor: "#00000050",
                padding: CONTAINER_PADDING,
                borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
                width: CONTAINER_WIDTH,
                marginTop: 10,
                marginRight: 10,
              },
            ]}
          >
            <Image
              source={icons.sharesocialoutline}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                tintColor: "white",
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: "absolute",
            zIndex: 1,
            paddingTop: 50,
            left: 6,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setPicture("");
              navigation.goBack();
            }}
            style={[
              {
                backgroundColor: "#00000050",
                padding: CONTAINER_PADDING,
                borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
                width: CONTAINER_WIDTH,
                marginTop: 10,
                marginRight: 10,
              },
            ]}
          >
            <Image
              source={icons.closecircleoutline}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                tintColor: "white",
              }}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={picture}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    );
  }

  async function toggleRecord() {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const response = await cameraRef.current?.recordAsync();
      setVideoMedia(response?.uri);
      setVideo(response?.uri);
    }
  }
  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    setPicture(response?.uri);
    setPhotoUri(response?.uri);
  }

  function BottomRowTools({ setCameraMode, cameraMode }) {
    const CONTAINER_PADDING = 5;
    const CONTAINER_WIDTH = 34;
    const ICON_SIZE = 25;
    return (
      <View style={[styles.bottomContainer, styles.directionRowItemsCenter]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Medialibrary")}
          style={[
            {
              backgroundColor: "#00000050",
              padding: CONTAINER_PADDING,
              borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
              width: CONTAINER_WIDTH,
              //marginTop: 35,
              // marginRight: 10,
            },
          ]}
        >
          <Image
            source={icons.folderoutline}
            style={{ width: 25, height: 25, tintColor: "white" }}
          />
        </TouchableOpacity>

        <View style={styles.directionRowItemsCenter}>
          <TouchableOpacity onPress={() => setCameraMode("picture")}>
            <Text
              style={{
                fontWeight: cameraMode === "picture" ? "bold" : "100",
                color: "white",
              }}
            >
              Snap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCameraMode("video")}>
            <Text
              style={{
                fontWeight: cameraMode === "video" ? "bold" : "100",
                color: "white",
              }}
            >
              Video
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            {
              backgroundColor: "#00000050",
              padding: CONTAINER_PADDING,
              borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
              width: CONTAINER_WIDTH,
              //marginTop: 35,
              // marginRight: 10,
            },
          ]}
        >
          <Image
            source={icons.searchsharp}
            style={{ width: 24, height: 24, tintColor: "white" }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }

  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermissions();
    if (!cameraStatus.granted) {
      Alert.alert("Error", "Camera permissions is required");
      return false;
    }
    const microphoneStatus = await requestMicrophonePermission();
    if (!microphoneStatus.granted) {
      Alert.alert("Error", "Microphone permission is required");
      return false;
    }
    const mediaLibraryStatus = await requestMediaLibraryPermisson();
    if (!mediaLibraryStatus.granted) {
      Alert.alert("Error", "Media Library permission is required");
      return false;
    }

    return true;
  }
  async function handleContinue() {
    const allPermissions = await requestAllPermissions();
    if (!allPermissions) {
      Alert.alert(
        "To continue using this app please provide permissions in settings"
      );
    }
  }

  useEffect(() => {
    handleContinue();
  }, []);

  async function handleOpenQRCode() {
    setIsBrowsing(true);
    const browserResult = await WebBrowser.openBrowserAsync(qrCodeDetected, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
    });
    if (browserResult.type === "cancel") {
      setIsBrowsing(false);
    }
  }

  function handleBarcodeScanned(scanningResult) {
    if (scanningResult.data) {
      console.log(scanningResult.data);
      setQrCodeDetected(scanningResult.data);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setQrCodeDetected("");
    }, 1000);
  }

  if (picture) return <PictureView picture={picture} setPicture={setPicture} />;
  // if (video) return <videoViewComponent video={video} setVideo={setVideo} />;
  if (isBrowsing) return <></>;

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        mode={cameraMode}
        zoom={cameraZoom}
        flash={cameraFlash}
        enableTorch={cameraTorch}
        facing={cameraFacing}
        style={{ flex: 1 }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <CameraTools
              cameraZoom={cameraZoom}
              cameraFlash={cameraFlash}
              cameraTorch={cameraTorch}
              setCameraZoom={setCameraZoom}
              setCameraFacing={setCameraFacing}
              setCameraTorch={setCameraTorch}
              setCameraFlash={setCameraFlash}
            />
            <MainRowActions
              cameraMode={cameraMode}
              handleTakePicture={
                cameraMode === "picture" ? handleTakePicture : toggleRecord
              }
              isRecording={isRecording}
            />
            <BottomRowTools
              setCameraMode={setCameraMode}
              cameraMode={cameraMode}
            />
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  directionRowItemsCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "space-between",
    position: "absolute",
    alignSelf: "center",
    bottom: 6,
  },
  mainRowContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 45,
    height: 100,
  },
});
