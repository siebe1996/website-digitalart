import React from "react";
import { View, Image } from "react-native";
import { logoHeaderStyle } from "./LogoHeaderStyle";

const LogoHeaderComp = () => {
    return (
        <View style={logoHeaderStyle.container}>
            <Image
                source={require("../../data/images/logo.png")}
                style={logoHeaderStyle.image}
            />
        </View>
    );
};

export default LogoHeaderComp;
