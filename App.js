import "react-native-gesture-handler";
//import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import SignUp from "./screens/Authentication/SignUp";
import EmailSuccess from "./screens/Authentication/EmailSuccess";
import SignIn from "./screens/Authentication/SignIn";
import Interest from "./screens/Authentication/Interest";
import ReportSuccess from "./screens/ReportContainer/ReportSuccess";
import SignUpMethod from "./screens/Authentication/SignUpMethod";
import ReportGuideline from "./screens/ReportContainer/ReportGuideline";
import InitialSignUp from "./screens/InitialSignUp";
import Otp from "./screens/Authentication/Otp";
import Home from "./screens/MainTabNavigator";
import ForgetPassword from "./screens/Authentication/ForgotPassword";
import SignUpSuccess from "./screens/Authentication/SignUpSuccess";
import UserName from "./screens/Authentication/UserName";
import ProfilePics from "./screens/Authentication/ProfilePics";
import FeedDetail from "./screens/FeedDetail";
import EditProfile from "./screens/EditProfile";
import Coin from "./screens/Coin";
import HotspotSearch from "./screens/HotspotSearch";
import SearchScreen from "./screens/SearchScreen";
import CameraScreen from "./screens/CameraScreen";
import Medialibrary from "./screens/Media-library";
import ImageScreen from "./screens/ImageScreen";
import Settings from "./screens/Settings";
import Theme from "./screens/Theme";
import DataSaver from "./screens/DataSaver";
import NotifcationSetting from "./screens/NotifcationSetting";
import AudioRecordScreen from "./screens/AudioRecordScreen";
import Crime from "./screens/ReportContainer/Crime";
import FakeProduct from "./screens/ReportContainer/FakeProduct";
import Election from "./screens/ReportContainer/Election";
import MakeReport from "./screens/ReportContainer/MakeReport";
import Roads from "./screens/ReportContainer/Roads";
import Accidents from "./screens/ReportContainer/Accidents";
import Power from "./screens/ReportContainer/Power";
import PortableWater from "./screens/ReportContainer/PortableWater";
import Petrol from "./screens/ReportContainer/Petrol";
import Airport from "./screens/ReportContainer/Airport";
import Transport from "./screens/ReportContainer/Transport";
import Embassies from "./screens/ReportContainer/Embassies";
import Corruption from "./screens/ReportContainer/Corruption";
import Employment from "./screens/ReportContainer/Employment";
import SocialWelfare from "./screens/ReportContainer/SocialWelfare";
import TradeCommerce from "./screens/ReportContainer/TradeCommerce";
import HealthCare from "./screens/ReportContainer/HealthCare";
import Technology from "./screens/ReportContainer/Technology";
import Environment from "./screens/ReportContainer/Environment";
import School from "./screens/ReportContainer/School";
import Hospital from "./screens/ReportContainer/Hospital";
import CommunityDev from "./screens/ReportContainer/CommunityDev";
import NonAuthFeed from "./screens/NonAuthFeed";
import ApiFeedDetail from "./screens/ApiFeedDetails";
import SingleImage from "./screens/SingleImage";
import TermsAndConditions from "./screens/TermsAndConditions";
import AnonymousFeed from "./screens/AnonymousFeed";

//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
            name="AnonymousFeed"
            component={AnonymousFeed}
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="EmailSuccess"
            component={EmailSuccess}
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
            name="TermsAndConditions"
            component={TermsAndConditions}
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
          <Stack.Screen
            name="NonAuthFeed"
            component={NonAuthFeed}
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen name="ImageScreen" component={ImageScreen} />
          <Stack.Screen name="SingleImage" component={SingleImage} />
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
          <Stack.Screen name="ApiFeedDetail" component={ApiFeedDetail} />

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
