import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyUserContext } from "../utils/MyContexts";
import { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import Login from "../screens/user/Login";
import BookDetail from "../screens/book/BookDetail";
import Register from "../screens/user/Register";
import EditBook from "../screens/librarian/EditBook";
import Message from "../screens/message/Message";
import EditInfo from "../screens/user/EditInfo";

const AppNavigation = () => {
    const Stack = createNativeStackNavigator();
    const [user,] = useContext(MyUserContext);

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    {user !== null ? (
                        <Stack.Screen
                            name="TabNavigation"
                            component={TabNavigation}
                            options={{ headerShown: false }}
                        />
                    ) : (
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ headerShown: false }}
                        />
                    )}
                    <Stack.Screen
                        name="BookDetail"
                        component={BookDetail}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="EditBook"
                        component={EditBook}
                        options={{ headerShown: false }}
                    />
                    {/* <Stack.Screen
                        name="Message"
                        component={Message}
                        options={{ headerShown: false }}
                    /> */}
                    <Stack.Screen
                        name="EditInfo"
                        component={EditInfo}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default AppNavigation;