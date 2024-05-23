import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import PlacesScreen from "../screens/placesscreen/PlacesScreen";
import AddPlaceScreen from "../screens/addplacescreen/AddPlaceScreen";
import EditPlaceScreen from "../screens/editplacescreen/EditPlaceScreen";
import { Ionicons } from "@expo/vector-icons";
import defaultScreenOptions from "./config/screenOptions";
import { useAuth } from "../contexts/AuthContext";

const Stack = createStackNavigator();

const PlacesStackNavigator = () => {
    const { state } = useAuth();
    const navigation = useNavigation();
    return (
        <Stack.Navigator
            initialRouteName="YourPlaces"
            screenOptions={defaultScreenOptions}
        >
            <Stack.Screen
                options={{
                    headerTitle: state.userRoles.includes("Admin")
                        ? "Places"
                        : "Your Places",
                }}
                name="YourPlaces"
                component={PlacesScreen}
            />
            <Stack.Screen
                options={{ headerTitle: "Add Place" }}
                name="AddPlace"
                component={AddPlaceScreen}
            />
            <Stack.Screen
                options={{ headerTitle: "Edit Place" }}
                name="EditPlace"
                component={EditPlaceScreen}
            />
        </Stack.Navigator>
    );
};

export default PlacesStackNavigator;
