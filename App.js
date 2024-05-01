import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
} from "./screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Crime" component={Crime} />
        <Stack.Screen name="FakeProduct" component={FakeProduct} />
        <Stack.Screen name="Election" component={Election} />
        <Stack.Screen name="MakeReport" component={MakeReport} />
        <Stack.Screen name="Roads" component={Roads} />
        <Stack.Screen name="SignUpMethod" component={SignUpMethod} />
        <Stack.Screen name="GuideLine" component={ReportGuideline} />
        <Stack.Screen name="InitialSignUp" component={InitialSignUp} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="MainScreen" component={Home} />
        <Stack.Screen name="ForgotPassword" component={ForgetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
