primary color = background: #0E9C67;
#f5fcf2

background: #B7FF9D33;
background: #0E9C67;

> > npx expo start -c

> > git remote -v

> > git add .
> > git commit -m "Your commit message here"

> > git push origin main

https://github.com/react-native-clipboard/clipboard?tab=readme-ov-file#readme
https://ashishnoob.medium.com/docker-basic-cheatsheet-011b8ccf78fc

////////////////////////////////////////////////////////////////////////////////////

<Modal
animationType="slide"
transparent={false}
visible={isOpen}
onRequestClose={() => dispatch(closeModal())}
// style={{
        //   justifyContent: "center",
        //   alignItems: "center",
        //   borderWidth: 1,
        //   borderRadius: 25,
        // }}

> </Modal>

navigation.navigate('Signup', { username });

const SignupScreen = ({ route }) => {
const { username } = route.params;

For the feed section

Share
import { AntDesign } from '@expo/vector-icons';
<AntDesign name="sharealt" size={24} color="black" />

/////////////////////////////////////////////////////////////////////////////////////
Like button
import { Octicons } from '@expo/vector-icons';
<Octicons name="thumbsup" size={24} color="black" />

FollowUp
import { MaterialCommunityIcons } from '@expo/vector-icons';
<MaterialCommunityIcons name="swap-horizontal-variant" size={24} color="black" />

BookMark
import { Feather } from '@expo/vector-icons';
<Feather name="bookmark" size={24} color="black" />

seen
import { Feather } from '@expo/vector-icons';
<Feather name="eye" size={24} color="black" />

share
import { AntDesign } from '@expo/vector-icons';

/////////////////////////////////////////////////////////////////////////////////////////
likeButton
import { AntDesign } from '@expo/vector-icons';
<AntDesign name="like2" size={24} color="black" />
<AntDesign name="like1" size={24} color="black" />
/////////////////////////////////////////////////////////////////////////////////////////
checked success
import { AntDesign } from '@expo/vector-icons';
<AntDesign name="checkcircle" size={24} color="black" />
cloud Upload
import { AntDesign } from '@expo/vector-icons';
<AntDesign name="clouduploado" size={24} color="black" />
Search
import { AntDesign } from '@expo/vector-icons';
<AntDesign name="search1" size={24} color="black" />
import { Entypo } from '@expo/vector-icons';
<Entypo name="bookmark" size={24} color="black" />
seen button
import { Entypo } from '@expo/vector-icons';
<Entypo name="eye" size={24} color="black" />
take an image
import { Entypo } from '@expo/vector-icons';
<Entypo name="image" size={24} color="black" />
record voice
import { Entypo } from '@expo/vector-icons';
<Entypo name="mic" size={24} color="black" />
Share
import { Entypo } from '@expo/vector-icons';
<Entypo name="share" size={24} color="black" />

No internet connection
import { Entypo } from '@expo/vector-icons';
<Entypo name="signal" size={24} color="black" />

comment
import { FontAwesome } from '@expo/vector-icons';
<FontAwesome name="comments-o" size={24} color="black" />
////////////////////////////////////////////////////////////////////////////////////////
BULLETED TEXT
/////////////////////////////////////////////////////////////////////////////
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BulletedList = () => {
return (
<View style={styles.container}>
<Text style={styles.bullet}>•</Text>
<Text style={styles.item}>First item</Text>
<Text style={styles.bullet}>•</Text>
<Text style={styles.item}>Second item</Text>
<Text style={styles.bullet}>•</Text>
<Text style={styles.item}>Third item</Text>
</View>
);
};

const styles = StyleSheet.create({
container: {
marginLeft: 20, // Adjust the left margin for indentation
},
bullet: {
fontSize: 20,
marginRight: 5, // Adjust the right margin for spacing between bullet and text
},
item: {
fontSize: 16,
marginBottom: 5, // Adjust margin bottom for spacing between items
},
});

export default BulletedList;

DATE PICKER
//////////////////////////////////////////////////////////////////////////////////////////////
expo install @react-native-community/datetimepicker

import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerComponent = () => {
const [date, setDate] = useState(new Date());
const [showDatePicker, setShowDatePicker] = useState(false);

const onChange = (event, selectedDate) => {
const currentDate = selectedDate || date;
setShowDatePicker(Platform.OS === 'ios');
setDate(currentDate);
};

const showMode = () => {
setShowDatePicker(true);
};

const showDatePickerComponent = showDatePicker && (
<DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode="date"
      display="default"
      onChange={onChange}
    />
);

return (
<View>
<Button onPress={showMode} title="Show Date Picker" />
{showDatePickerComponent}
</View>
);
};

export default DatePickerComponent;

DROP DOWN LIST
//////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { View, Picker } from 'react-native';

const DropdownComponent = () => {
const [selectedValue, setSelectedValue] = useState('java');

return (
<View>
<Picker
selectedValue={selectedValue}
style={{ height: 50, width: 150 }}
onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} >
<Picker.Item label="Java" value="java" />
<Picker.Item label="JavaScript" value="js" />
<Picker.Item label="Python" value="python" />
<Picker.Item label="C#" value="csharp" />
</Picker>
</View>
);
};

export default DropdownComponent;

ACCESSING THE DEVICE CAMERA
///////////////////////////////////////////////////////////////////////////////////////////
expo install expo-camera

import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';

const CameraComponent = () => {
const [hasPermission, setHasPermission] = useState(null);
const [cameraRef, setCameraRef] = useState(null);
const [photoUri, setPhotoUri] = useState(null);

useEffect(() => {
(async () => {
const { status } = await Camera.requestPermissionsAsync();
setHasPermission(status === 'granted');
})();
}, []);

const takePicture = async () => {
if (cameraRef) {
const { uri } = await cameraRef.takePictureAsync();
setPhotoUri(uri);
}
};

if (hasPermission === null) {
return <View />;
}
if (hasPermission === false) {
return <Text>No access to camera</Text>;
}

return (
<View style={{ flex: 1 }}>
<Camera
style={{ flex: 1 }}
type={Camera.Constants.Type.back}
ref={(ref) => setCameraRef(ref)} >
<View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
<Button title="Take Picture" onPress={takePicture} />
</View>
</Camera>
{photoUri && <Image source={{ uri: photoUri }} style={{ width: 200, height: 200 }} />}
</View>
);
};

export default CameraComponent;

We import the Camera component from expo-camera.
We use the useState hook to manage the camera reference (cameraRef), the photo URI (photoUri), and camera permission (hasPermission).
We use the useEffect hook to request camera permissions when the component mounts.
The takePicture function is called when the user presses the "Take Picture" button. It captures a photo using the camera reference (cameraRef.takePictureAsync()) and updates the photoUri state with the URI of the captured image.
Depending on the camera permission status (hasPermission), we render either the camera view or a message indicating no access to the camera.
If a photo has been taken (photoUri is not null), we render the captured image.

TO access the device camera or select a picture from the device's media library
/////////////////////////////////////////////////////////////////////////////////////////////
expo install expo-image-picker

import React, { useState } from 'react';
import { View, Button, Image, Platform } from 'react-native';
import \* as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = () => {
const [selectedImage, setSelectedImage] = useState(null);

const handleSelectImage = async () => {
try {
const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
if (!permissionResult.granted) {
alert('Permission to access media library is required!');
return;
}

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        setSelectedImage(pickerResult.uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }

};

const handleTakePicture = async () => {
try {
const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
if (!permissionResult.granted) {
alert('Permission to access camera is required!');
return;
}

      const pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        setSelectedImage(pickerResult.uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }

};

return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
{selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
<Button title="Select Image" onPress={handleSelectImage} />
{Platform.OS === 'ios' && <Button title="Take Picture" onPress={handleTakePicture} />}
</View>
);
};

export default ImagePickerComponent;

to access Device recording capacity
/////////////////////////////////////////////////////////////////////////////////////////////
expo install expo-av

1. Request Permissions: In order to access the device's recording capabilities, you need to request permission from the user. You can do this using Expo's Permissions module.

import { Permissions } from 'expo';

const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
if (status !== 'granted') {
console.error('Permission to record audio was denied');
return;
}

2. Set Up Recording: Use Expo's Audio.Recording API to set up recording functionality.

import { Audio } from 'expo';

const recording = new Audio.Recording();

3. Start Recording: Begin recording audio.

try {
await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
await recording.startAsync();
// Recording is now started and stored in the `recording` object
} catch (error) {
console.error('Failed to start recording', error);
}

4. Stop Recording: Stop the recording when you're finished.

try {
await recording.stopAndUnloadAsync();
const uri = recording.getURI();
// Store the URI in your React state
} catch (error) {
console.error('Failed to stop recording', error);
}

5. Store Audio URI in State: Use React's useState hook to store the URI of the recorded audio.

const [audioURI, setAudioURI] = useState(null);

// Inside stop recording block
setAudioURI(uri);

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
