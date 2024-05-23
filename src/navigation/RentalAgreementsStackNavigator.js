import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import RentalAgreementsScreen from "../screens/rentalagreementsscreen/RentalAgreementsScreen";
import AddRentalAgreementScreen from "../screens/addrentalagreementscreen/AddRentalAgreementScreen";
import EditRentalAgreementScreen from "../screens/editrentalagreementscreen/EditRentalAgreementScreen";
import defaultScreenOptions from "./config/screenOptions";
import { useAuth } from "../contexts/AuthContext";

const Stack = createStackNavigator();

const RentalAgreementsStackNavigator = () => {
    const { state } = useAuth();
    const navigation = useNavigation();

    return (
        <Stack.Navigator
            initialRouteName="RentalAgreements"
            screenOptions={defaultScreenOptions}
        >
            <Stack.Screen
                options={{
                    headerTitle: state.userRoles.includes("Admin")
                        ? "RentalAgreements"
                        : "Your RentalAgreements",
                }}
                name="RentalAgreements"
                component={RentalAgreementsScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Add Rental Agreement",
                }}
                name="AddRentalAgreement"
                component={AddRentalAgreementScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Edit Rental Agreement",
                }}
                name="EditRentalAgreement"
                component={EditRentalAgreementScreen}
            />
        </Stack.Navigator>
    );
};

export default RentalAgreementsStackNavigator;
