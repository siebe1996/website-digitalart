import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ProjectorsScreen from "../screens/projectorsscreen/ProjectorsScreen";
import AddProjectorScreen from "../screens/addprojectorscreen/AddProjectorScreen";
import EditProjectorScreen from "../screens/editprojectorscreen/EditProjectorScreen";
import { APP_TITLE } from "../constants";
import HeaderComp from "../components/headercomp/HeaderComp";
import defaultScreenOptions from "./config/screenOptions";

const Stack = createStackNavigator();

const ProjectorsStackNavigator = () => {
    const navigation = useNavigation();

    return (
        <Stack.Navigator
            initialRouteName="Projectors"
            screenOptions={defaultScreenOptions}
        >
            <Stack.Screen
                options={{
                    headerTitle: "Projectors",
                }}
                name="Projectors"
                component={ProjectorsScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Add Projector",
                }}
                name="AddProjector"
                component={AddProjectorScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Edit Projector",
                }}
                name="EditProjector"
                component={EditProjectorScreen}
            />
        </Stack.Navigator>
    );
};

export default ProjectorsStackNavigator;
