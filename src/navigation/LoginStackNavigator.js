import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Image } from "react-native-web";
import LoginScreen from "../screens/loginscreen/LoginScreen";
import RegisterScreen from "../screens/registerscreen/RegisterScreen";
import LogoHeaderComp from "../components/logoheadercomp/LogoHeaderComp";

const Stack = createStackNavigator();

const LoginStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerTitle: () => (
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={require("../data/images/logo.png")}
                    />
                ),
                headerStyle: {
                    height: 55,
                    backgroundColor: "#5B84C4",
                    borderColor: "#5B84C4",
                },
                headerTitleAlign: "center",
                headerLeft: null,
            }}
        >
            <Stack.Screen options={{}} name="Login" component={LoginScreen} />
            <Stack.Screen
                options={{}}
                name="Register"
                component={RegisterScreen}
            />
        </Stack.Navigator>
    );
};

export default LoginStackNavigator;
