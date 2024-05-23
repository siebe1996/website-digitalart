import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { APP_TITLE } from "../constants";
import HeaderComp from "../components/headercomp/HeaderComp";
import ExpositionsScreen from "../screens/expositionsscreen/ExpositionsScreen";
import AddExpositionScreen from "../screens/addexpositionscreen/AddExpositionScreen";
import EditExpositionScreen from "../screens/editexpositionscreen/EditExpositionScreen";
import ProjectorDisplayScreen from "../screens/projectordisplayscreen/ProjectorDisplayScreen";
import defaultScreenOptions from "./config/screenOptions";

const Stack = createStackNavigator();

const ExpositionsStackNavigator = () => {
    const navigation = useNavigation();

    return (
        <Stack.Navigator
            initialRouteName="Expositions"
            screenOptions={defaultScreenOptions}
        >
            <Stack.Screen
                options={{
                    headerTitle: "Expositions",
                }}
                name="Expositions"
                component={ExpositionsScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Add Exposition",
                }}
                name="AddExposition"
                component={AddExpositionScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Edit Exposition",
                }}
                name="EditExposition"
                component={EditExpositionScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Display"
                component={ProjectorDisplayScreen}
            />
        </Stack.Navigator>
    );
};

export default ExpositionsStackNavigator;
