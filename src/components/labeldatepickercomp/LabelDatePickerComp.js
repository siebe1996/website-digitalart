import React from "react";
import { View } from "react-native";
import LabelComp from "../labelcomp/LabelComp";
import { labelDatePickerStyle } from "./LabelDatePickerStyle";
import DatePickerComp from "../datepickercomp/DatePickerComp";

const LabelDatePickerComp = ({
    label,
    selected,
    onChange,
    startDate,
    endDate,
    minDate,
    maxDate,
    selectsRange = false,
    inline = false,
}) => {
    return (
        <View style={labelDatePickerStyle.container}>
            <LabelComp text={label} />
            <DatePickerComp
                selected={selected}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
                maxDate={maxDate}
                selectsRange={selectsRange}
                inline={inline}
            />
        </View>
    );
};

export default LabelDatePickerComp;
