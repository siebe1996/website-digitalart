import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import NavigationWrapper from "./src/navigation/NavigationWrapper";
import * as Linking from "expo-linking";
const prefix = Linking.createURL("/");

export default function App() {
    const linking = {
        //prefixes: [prefix],
        config,
    };
    const parseWithLogging = (id) => {
        console.log("Parsed ID:", id);
        return id;
    };
    const logConfigUsage = () => {
        console.log("Linking configuration is being used");
        return true;
    };

    const config = {
        logConfigUsage: logConfigUsage(),
        screens: {
            Home: "home",
            PlacesStack: {
                path: "",
                screens: {
                    YourPlaces: { path: "places" },
                    AddPlace: "places/add",
                    EditPlace: {
                        path: "places/edit/:id",
                        parse: {
                            id: (id) => `${id}`,
                        },
                    },
                },
            },
            RentalAgreementStack: {
                RentalAgreements: "rental-agreements",
                AddRentalAgreement: "rental-agreements/add",
                EditRentalAgreement: {
                    path: "rental-agreements/edit/:id",
                    parse: {
                        id: (id) => `${id}`,
                    },
                },
            },
            ExpositionsStack: {
                screens: {
                    Expositions: "expositions",
                    AddExposition: "expositions/add",
                    EditExposition: {
                        path: "expositions/edit/:id",
                        parse: {
                            id: (id) => `${id}`,
                        },
                    },
                    Display: {
                        path: "display/:id",
                        parse: {
                            parseWithLogging,
                        },
                    },
                },
            },
            CategoriesStack: {
                Categories: "categories",
                AddCategory: "categories/add",
                EditCategory: {
                    path: "categories/edit/:id",
                    parse: {
                        id: (id) => `${id}`,
                    },
                },
            },
            AdminsStack: {
                Admins: "admins",
                AddAdmin: "admins/add",
            },
            ProjectorsStack: {
                Projectors: "projectors",
                AddProjector: "projectors/add",
                EditProjector: {
                    path: "projectors/edit/:id",
                    parse: {
                        id: (id) => `${id}`,
                    },
                },
            },
            Profile: "account",
        },
    };
    return (
        <AuthProvider style={styles.container}>
            <NavigationWrapper linking={linking} />
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: "100vh",
        paddingBottom: 80,
        backgroundColor: "#EBD8C5",
        color: "#11224D",
    },
    safeAreaContainer: {
        flex: 1,
    },
});
