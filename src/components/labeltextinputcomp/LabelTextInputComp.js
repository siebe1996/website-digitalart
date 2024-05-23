import React from "react";
import { View } from "react-native";
import LabelComp from "../labelcomp/LabelComp";
import TextInputComp from "../textinputcomp/TextInputComp";
import { labelTextInputStyle } from "./LabelTextInputStyle";

const LabelTextInputComp = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    secureTextEntry = false,
    keyProp,
    multiline = false,
    numberOfLines = 1,
}) => {
    return (
        <View style={labelTextInputStyle.container}>
            <LabelComp text={label} />
            <TextInputComp
                key={keyProp}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                multiline={multiline}
                numberOfLines={numberOfLines}
            />
        </View>
    );
};

export default LabelTextInputComp;
