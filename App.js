import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './screens/user/Login';
import Register from './screens/user/Register';
import TabNavigation from './navigations/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookDetail from './screens/book/BookDetail';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      {/* <Login/> */}
      {/* <Register/> */}
      <NavigationContainer>
        {/* <TabNavigation /> */}

        <Stack.Navigator>
          <Stack.Screen
            name="TabNavigation"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookDetail"
            component={BookDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
