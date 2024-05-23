import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import LoginStackNavigator from "./LoginStackNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";

export default function NavigationWrapper({ linking }) {
    const Stack = createStackNavigator();
    const { state } = useAuth();
    console.log("user token in navigator:", state.userToken); // Add this line to check the state
    console.log("user in navigator:", state.user);

    return (
        <NavigationContainer linking={linking}>
            {state.userToken ? <DrawerNavigator /> : <LoginStackNavigator />}
        </NavigationContainer>
    );
}
