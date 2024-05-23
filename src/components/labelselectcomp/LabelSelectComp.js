import React from "react";
import { View } from "react-native";
import LabelComp from "../labelcomp/LabelComp";
import { labelSelectStyle } from "./LabelSelectStyle";
import SelectComp from "../selectcomp/SelectComp";

const LabelSelectComp = ({ label, value, onChange, options, isMulti }) => {
    return (
        <View style={labelSelectStyle.container}>
            <LabelComp text={label} />
            <SelectComp
                value={value}
                onChange={onChange}
                options={options}
                isMulti={isMulti}
            />
        </View>
    );
};

export default LabelSelectComp;
