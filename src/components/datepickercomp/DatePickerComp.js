import React, { forwardRef } from "react";
import { View, TextInput } from "react-native";
import { datePickerStyle } from "./DatePickerStyle";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const DatePickerComp = ({
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
        <View>
            <DatePicker
                selected={selected}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
                maxDate={maxDate}
                selectsRange={selectsRange}
                inline={inline}
                dateFormat="dd/MM/yyyy"
                customInput={<TextInput style={datePickerStyle.textInput} />}
            />
        </View>
    );
};

export default DatePickerComp;
