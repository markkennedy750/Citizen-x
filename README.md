primary color = background: #0E9C67;
#f5fcf2

background: #B7FF9D33;
background: #0E9C67;

https://expo.dev/artifacts/eas/cpAsme6S1ocfaDPLXLbSyf.apk
https://github.com/markkennedy750/CX-app

[privacy policy](https://citizenx-dashboard-sbqx.onrender.com/privacy)

https://github.com/axios/axios/issues/6195

const response = await axios.post(url, formData ,
{headers: {
'Accept': 'application/json',
'Content-Type': 'multipart/form-data',
}}
);

> > npx expo start -c

> > npx expo start -c --no-dev --minify

> > git remote -v

> > git add .

> > git commit -m "Your commit message here"

> > git push origin main

> > npm install expo@latest

> > npx expo install --fix
> > https://github.com/react-native-clipboard/clipboard?tab=readme-ov-file#readme > > https://ashishnoob.medium.com/docker-basic-cheatsheet-011b8ccf78fc
> > ////////////////////////////////////////////////////////////////////////////////////
> > nogton
> > wheeli
> > ////////////////////////////////////////////////////////////////////////////////////

npx expo install expo-font
npx expo install expo-splash-screen
////////////////////////////////////////////////////////////////////////////////////

const mediaAccess = async () => {
try {
setImageLoading(true);
const { status } = await MediaLibrary.requestPermissionsAsync();
if (status !== "granted") {
Alert.alert(
"Sorry, we need media library permissions to access your photos."
);
setImageLoading(false);
return;
}

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error accessing media library: ", error);
      Alert.alert("Error", "There was an error accessing your media library.");
    } finally {
      setImageLoading(false);
    }

};

"feed_urls":["./media/feed/AGROSQUARE-removebg-preview.png,https://citizenx.s3.eu-north-1.amazonaws.com/images/AGROSQUARE-removebg-preview.png"] ,

feed_urls[2]

/////////////////////////////////////////////////////////////////////////////////////////
<FormInput
label="Password"
secureTextEntry={!showPass}
placeholder="!12$ogiQ0L"
autoCompleteType="password"
containerStyle={{
              marginTop: SIZES.radius,
            }}
onChange={(value) => {
utils.validatePassword(value, setPasswordError);
setPassword(value);
}}
errorMsg={passwordError}
appendComponent={
<TouchableOpacity
style={{
                  width: 40,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
onPress={() => setShowPass(!showPass)} >
<Image
source={showPass ? icons.eye_close : icons.eye}
style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.gray,
                  }}
/>
</TouchableOpacity>
}
/>
/////////////////////////////////////////////////////////////////////////////////////////
async function getBase64(uri) {
const response = await fetch(uri);
const blob = await response.blob();
return new Promise((resolve, reject) => {
const reader = new FileReader();
reader.onloadend = () => resolve(reader.result);
reader.onerror = reject;
reader.readAsDataURL(blob);
});
}
////////////////////////////////////////////////////////////////////////////////////////
export const createReport = createAsyncThunk(
"auth/createReport",
async (
{
token,
insidentType,
textInput,
date,
selectedState,
selectedLocalGov,
albums,
address,
selectedId,
isEnabled,
storedRecording,
photoUri,
videoMedia,
location,
causeOfAccident,
checkboxValue,
airportName,
time,
country,
ambassedor,
stateEmbassey,
hospitalName,
hospitaleAddress,
departmentNameHead,
productName,
autageLength,
roadName,
schoolName,
schoolHead,
terminal,
queueTime,
airline,
categ,
},
{ rejectWithValue }
) => {
try {
const formData = new FormData();

      formData.append("date_of_incidence", currentDate);

      if (insidentType) {
        formData.append("sub_report_type", insidentType);
      }
      if (categ) {
        formData.append("category", categ);
      }
      formData.append("description", textInput);
      if (date) {
        formData.append("date_of_incidence", date);
      }
      if (selectedState) {
        formData.append("state_name", selectedState);
        formData.append("lga_name", selectedLocalGov);
      }
      if (address) {
        formData.append("landmark", address);
      }
      if (selectedId) {
        formData.append("rating", selectedId);
      }
      if (isEnabled) {
        formData.append("is_anonymous", isEnabled);
      }
      if (location) {
        if (location.latitude) {
          formData.append("latitude", location.latitude);
        }
        if (location.longitude) {
          formData.append("longitude", location.longitude);
        }
      }
      if (causeOfAccident) {
        formData.append("accident_cause", causeOfAccident);
      }

      //console.log("Form Data", formData);
      const response = await axios.post(
        CREATE_REPORT,
        {
          sub_report_type: insidentType,
          category: categ,
          description: textInput,
          date_of_incidence: currentDate,
          state_name: selectedState,
          lga_name: selectedLocalGov,
          landmark: address,
          rating: selectedId,
          is_anonymous: isEnabled,
          latitude: location.latitude,
          longitude: location.longitude,
          accident_cause: causeOfAccident,
          is_response: checkboxValue,
          airport_name: airportName,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("report created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.log("report error:", error.response.data);
      return rejectWithValue(error.response.data);
    }

}
);
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
web:

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
//////////////////////////////////////////////////////////////////////////////////////////////
import { ScrollView, RefreshControl, Text, View, StyleSheet } from 'react-native';

const [refreshing, setRefreshing] = useState(false);

const onRefresh = useCallback(() => {
setRefreshing(true);

    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // 2 seconds

}, []);

<FlatList
data={data}
renderItem={({ item }) => <Text>{item.key}</Text>}
keyExtractor={(item, index) => index.toString()}
refreshControl={
<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
}
/>
/////////////////////////////////////////////////////////////////////////////////////////////
Expo has guided us to use react-native-background-geolocation if we want to track user's locations in the background.

/////////////////////////////////////////////////////////////////////////////////////////////

import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { COLORS, icons } from "../constants";

const AudioRecordScreen = ({ route, navigation }) => {
const { setStoredRecording } = route.params;
const [recording, setRecording] = useState();
const [permissionResponse, requestPermission] = Audio.usePermissions();

//Audio Recording
async function startRecording() {
try {
if (permissionResponse.status !== "granted") {
console.log("Requesting permission..");
await requestPermission();
}
await Audio.setAudioModeAsync({
allowsRecordingIOS: true,
playsInSilentModeIOS: true,
});

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }

}

async function stopRecording() {
console.log("Stopping recording..");
setRecording(undefined);
await recording.stopAndUnloadAsync();
await Audio.setAudioModeAsync({
allowsRecordingIOS: false,
});
const uri = recording.getURI();
setStoredRecording(uri);
console.log("Recording stopped and stored at", uri);
console.log(recording);
}
return (
<View style={styles.container}>
<TouchableOpacity
style={[
styles.parentButtonConatiner,
recording ? styles.parentrecordingStop : styles.parentrecordStart,
]}
onPress={() => {
recording ? stopRecording() : startRecording();
}} >
<View
style={[
styles.buttonContainer,
recording ? styles.buttonStop : styles.buttonStart,
]} >
{recording ? (
<View style={{ alignItems: "center", justifyContent: "center" }}>
<Image
source={icons.microphone_slash}
style={{ width: 75, height: 75, tintColor: "white" }}
/>
<Text style={styles.text}>Recording...</Text>
<Text style={styles.text}>Click to stop</Text>
</View>
) : (
<View style={{ alignItems: "center", justifyContent: "center" }}>
<Image
source={icons.microphoneicon}
style={{ width: 75, height: 75, tintColor: "white" }}
/>
<Text style={styles.text}>Start Record</Text>
</View>
)}
</View>
</TouchableOpacity>
</View>
);
};

export default AudioRecordScreen;

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "black",
alignItems: "center",
justifyContent: "center",
},
parentButtonConatiner: {
backgroundColor: "white",
width: 170,
height: 170,
alignItems: "center",
justifyContent: "center",
borderRadius: 100,
},
buttonContainer: {
width: 150,
height: 150,
borderRadius: 100,
alignItems: "center",
justifyContent: "center",
},
parentrecordStart: {
backgroundColor: COLORS.white2,
},
parentrecordingStop: {
backgroundColor: "#28a7c9",
},
buttonStart: {
backgroundColor: COLORS.primary,
},
buttonStop: {
backgroundColor: "#f72346",
},
text: {
fontSize: 16,
fontWeight: "700",
color: COLORS.white,
},
});

/////////////////////////////////////////////////////////////////////////////////////////////

Build expo application

1. > > npm install -g eas-cli
2. > > eas login
3. > > eas whoami
4. > > eas build:configure
5. "preview":{
   "ios":{
   "simulator":true
   },
   "android":{
   "buildType":"apk"
   }
   }
6. > > npx expo-doctor@latest

7. > > eas build -p android --profile preview

8. > > eas build -p android

Android developer

1. > > npx expo prebuild

2. > > eas build

3. > > eas build --platform android

Build apk for android
https://expo.dev/accounts/kennedy757/projects/citixenx/builds/c203e047-fda1-46c6-9482-e2ef6547a69b

/////////////////////////////////////////////////////////////////////////////////////////////

Step 1: Prepare Your App
Update App Version: Make sure you increment the version number in your app.json or app.config.js.

json
Copy code
{
"expo": {
"version": "1.0.0", // Update this
...
}
}
Build Your App: Run the following command in your project directory to create a standalone APK or AAB file:

bash
Copy code
eas build --platform android
Make sure you have eas-cli installed. If not, install it using:
bash
Copy code
npm install -g eas-cli
Choose the Build Type: When prompted, select "AAB" (Android App Bundle) for the Play Store.

Step 2: Create Your App on Google Play Console
Log in to Google Play Console: Go to Google Play Console and log in with your developer account.

Create a New App:

Click on “Create app”.
Fill in the required fields (app name, default language, app type).
Choose “Yes” for “Is this app a game?” if applicable.
Click “Create”.
Step 3: Fill Out App Information
Store Listing:

Provide a title, short description, and full description.
Upload app screenshots and a feature graphic.
Set the app's category (application type).
Content Rating:

Fill out the questionnaire to get a content rating.
Pricing and Distribution:

Decide if your app will be free or paid.
Set the countries where your app will be available.
Step 4: Upload Your AAB File
Go to the "App Releases" section:

Select “Production” and then “Create Release”.
Upload Your AAB File:

Drag and drop your AAB file or browse to upload.
Review Release:

Ensure that there are no issues in the release summary.
Step 5: Complete the App Information
Privacy Policy: Provide a link to your privacy policy if required.

App Icon: Ensure your app icon is uploaded in the appropriate format and size.

Step 6: Rollout Your Release
Review Everything: Make sure all required fields are filled out.

Start the Rollout: Click on “Review” and then “Start rollout to production”. Confirm the rollout.

Step 7: Wait for Approval
After submitting, your app will go through a review process by Google. This may take a few hours to a few days.
Step 8: Monitor Your App
Once approved, your app will be live on the Play Store! You can monitor installs, ratings, and reviews in the Google Play Console.
Additional Tips
Testing: Before publishing, consider using the internal test track to get feedback.
Analytics: Implement Google Analytics or Firebase Analytics to monitor user engagement and app performance.
Updates: For future updates, repeat the build and release process, making sure to increment your version number.
