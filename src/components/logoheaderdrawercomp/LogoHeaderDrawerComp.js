import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { logoHeaderDrawerStyle } from "./LogoHeaderDrawerStyle";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LogoHeaderDrawerComp = () => {
    const navigation = useNavigation();
    return (
        <View style={logoHeaderDrawerStyle.container}>
            <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={logoHeaderDrawerStyle.menuButton}
            >
                <Ionicons name="menu" size={24} color="#FFB375" />
            </TouchableOpacity>
            <Image
                source={require("../../data/images/logo.png")}
                style={logoHeaderDrawerStyle.image}
            />
        </View>
    );
};

export default LogoHeaderDrawerComp;
