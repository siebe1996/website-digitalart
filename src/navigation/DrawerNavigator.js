import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/homescreen/HomeScreen";
import { useAuth } from "../contexts/AuthContext";
import PlacesStackNavigator from "./PlacesStackNavigator";
import ProjectorsStackNavigator from "./ProjectorsStackNavigator";
import CategoriesStackNavigator from "./CategoriesStackNavigator";
import AdminsStackNavigator from "./AdminsStackNavigator";
import RentalAgreementsStackNavigator from "./RentalAgreementsStackNavigator";
import ExpositionsStackNavigator from "./ExpositionsStackNavigator";
import ProfileScreen from "../screens/profilescreen/ProfileScreen";
import { Image, TouchableOpacity, View } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const CustomDrawerIcon = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={{ paddingLeft: 15 }}
            onPress={() => navigation.toggleDrawer()}
        >
            <Ionicons name="menu" size={30} color="#FFB375" />
        </TouchableOpacity>
    );
};

const getHeaderShown = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    const hideHeaderRoutes = ["Display"]; // Add all routes where you want to hide the header

    if (hideHeaderRoutes.includes(routeName)) {
        return false;
    }
    return true;
};

const DrawerNavigator = () => {
    const { state } = useAuth();
    console.log("state", state);
    const userRole = state.userRoles.includes("Admin") ? "Admin" : "Exhibitor";

    return (
        <Drawer.Navigator
            screenOptions={({ navigation, route }) => ({
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
                headerLeft: () => <CustomDrawerIcon navigation={navigation} />,
                drawerStyle: {
                    backgroundColor: "#EBD8C5",
                },
                drawerActiveBackgroundColor: "#5B84C4",
                drawerActiveTintColor: "white",
                drawerInactiveTintColor: "#11224D",
                headerShown: getHeaderShown(route),
            })}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen
                name="PlacesStack"
                component={PlacesStackNavigator}
                options={{
                    drawerLabel: "Places",
                }}
            />
            <Drawer.Screen
                name="RentalAgreementStack"
                component={RentalAgreementsStackNavigator}
                options={{
                    drawerLabel: "Rental Agreements",
                }}
            />
            {userRole === "Exhibitor" && (
                <Drawer.Screen
                    name="ExpositionsStack"
                    component={ExpositionsStackNavigator}
                    options={{
                        drawerLabel: "Expositions",
                    }}
                />
            )}
            {userRole === "Admin" && (
                <>
                    <Drawer.Screen
                        name="CategoriesStack"
                        component={CategoriesStackNavigator}
                        options={{
                            drawerLabel: "Categories",
                        }}
                    />
                    <Drawer.Screen
                        name="AdminsStack"
                        component={AdminsStackNavigator}
                        options={{
                            drawerLabel: "Admins",
                        }}
                    />
                    <Drawer.Screen
                        name="ProjectorsStack"
                        component={ProjectorsStackNavigator}
                        options={{
                            drawerLabel: "Projectors",
                        }}
                    />
                </>
            )}
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    drawerLabel: "Account",
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
