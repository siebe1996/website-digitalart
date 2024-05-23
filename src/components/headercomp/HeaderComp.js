import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { headerStyle } from "./HeaderStyle";
import { Ionicons } from "@expo/vector-icons";

const HeaderComp = ({ title, subtitle, navigation }) => {
    return (
        <View style={headerStyle.container}>
            <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={headerStyle.menu}
            >
                <Ionicons name="menu" size={30} color="#000" />
            </TouchableOpacity>
            <View style={headerStyle.titlesContainer}>
                <Text style={headerStyle.title}>{title}</Text>
                {subtitle && (
                    <Text style={headerStyle.subtitle}>{subtitle}</Text>
                )}
            </View>
        </View>
    );
};

export default HeaderComp;
