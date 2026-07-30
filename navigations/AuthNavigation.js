import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/book/Home";
import Register from "../screens/user/Register";
import Login from "../screens/user/Login";

const AuthNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}