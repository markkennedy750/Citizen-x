import "react-native-gesture-handler";
//import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home,
  OnboardingScreen,
  SplashScreen,
  WelcomeScreen,
  SignIn,
  ForgetPassword,
  SignUp,
  Otp,
  SignUpMethod,
  InitialSignUp,
  ReportGuideline,
  Crime,
  FakeProduct,
  MakeReport,
  Roads,
  Election,
  Accidents,
  Power,
  PortableWater,
  Petrol,
  Airport,
  Transport,
  Embassies,
  Corruption,
  Employment,
  SocialWelfare,
  TradeCommerce,
  HealthCare,
  Technology,
  Environment,
  School,
  Hospital,
  CommunityDev,
  Interest,
  ReportSuccess,
  SignUpSuccess,
  UserName,
  ProfilePics,
  FeedDetail,
  EditProfile,
  Coin,
  HotspotSearch,
  SearchScreen,
  CameraScreen,
  AudioRecordScreen,
  ImageScreen,
  Settings,
  Theme,
  NotifcationSetting,
  DataSaver,
  Medialibrary,
} from "./screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              animation: "fade",
            }}
          />

          <Stack.Screen
            name="Interest"
            component={Interest}
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="ReportSuccess"
            component={ReportSuccess}
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen name="SignUpMethod" component={SignUpMethod} />
          <Stack.Screen name="GuideLine" component={ReportGuideline} />
          <Stack.Screen name="InitialSignUp" component={InitialSignUp} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="MainScreen" component={Home} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgetPassword}
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="SignUpSuccess"
            component={SignUpSuccess}
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen name="UserName" component={UserName} />
          <Stack.Screen name="ProfilePics" component={ProfilePics} />
          <Stack.Screen name="FeedDetail" component={FeedDetail} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Coin" component={Coin} />
          <Stack.Screen name="HotspotSearch" component={HotspotSearch} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen
            name="CameraScreen"
            component={CameraScreen}
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="Medialibrary"
            component={Medialibrary}
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen name="ImageScreen" component={ImageScreen} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Theme" component={Theme} />
          <Stack.Screen name="DataSaver" component={DataSaver} />
          <Stack.Screen
            name="NotifcationSetting"
            component={NotifcationSetting}
          />
          <Stack.Screen
            name="AudioRecordScreen"
            component={AudioRecordScreen}
          />

          {/**Report start */}

          <Stack.Screen name="Crime" component={Crime} />
          <Stack.Screen name="FakeProduct" component={FakeProduct} />
          <Stack.Screen name="Election" component={Election} />
          <Stack.Screen name="MakeReport" component={MakeReport} />
          <Stack.Screen name="Roads" component={Roads} />
          <Stack.Screen name="Accidents" component={Accidents} />
          <Stack.Screen name="Power" component={Power} />
          <Stack.Screen name="PortableWater" component={PortableWater} />
          <Stack.Screen name="Petrol" component={Petrol} />
          <Stack.Screen name="Airport" component={Airport} />
          <Stack.Screen name="Transport" component={Transport} />
          <Stack.Screen name="Embassies" component={Embassies} />
          <Stack.Screen name="Corruption" component={Corruption} />
          <Stack.Screen name="Employment" component={Employment} />
          <Stack.Screen name="SocialWelfare" component={SocialWelfare} />
          <Stack.Screen name="TradeCommerce" component={TradeCommerce} />
          <Stack.Screen name="HealthCare" component={HealthCare} />
          <Stack.Screen name="Technology" component={Technology} />
          <Stack.Screen name="Environment" component={Environment} />
          <Stack.Screen name="School" component={School} />
          <Stack.Screen name="Hospital" component={Hospital} />
          <Stack.Screen name="CommunityDev" component={CommunityDev} />

          {/**Report end */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
