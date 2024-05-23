import React from "react";
import { View, Text } from "react-native";
import { invalidTextStyle } from "./InvalidTextStyle";

const InvalidTextComp = ({ text, style }) => {
    return (
        <View>
            <Text style={[invalidTextStyle.text, style]}>{text}</Text>
        </View>
    );
};

export default InvalidTextComp;
