import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { APP_TITLE } from "../constants";
import HeaderComp from "../components/headercomp/HeaderComp";
import AdminsScreen from "../screens/adminsscreen/AdminsScreen";
import AddAdminScreen from "../screens/addadminscreen/AddAdminScreen";
import defaultScreenOptions from "./config/screenOptions";

const Stack = createStackNavigator();

const AdminsStackNavigator = () => {
    const navigation = useNavigation();

    return (
        <Stack.Navigator
            initialRouteName="Admins"
            screenOptions={defaultScreenOptions}
        >
            <Stack.Screen
                options={{
                    headerTitle: "Admins",
                }}
                name="Admins"
                component={AdminsScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Add Admin",
                }}
                name="AddAdmin"
                component={AddAdminScreen}
            />
        </Stack.Navigator>
    );
};

export default AdminsStackNavigator;
