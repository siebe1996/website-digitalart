import React from "react";
import Select from "react-select";
import { selectStyle } from "./SelectStyle";

const SelectComp = ({ value, onChange, options, isMulti = false }) => (
    <Select
        value={value}
        onChange={onChange}
        options={options}
        isMulti={isMulti}
        menuPortalTarget={document.body} // Attach the menu to the body
        styles={{
            container: (styles) => {
                return {
                    ...styles,
                    color: "white",
                    fontFamily: "System",
                    borderColor: "#5B84C4",
                    backgroundColor: "#FFB375",
                    fontFamily: "System",
                    fontSize: "14px",
                };
            },
            control: (base) => ({
                ...base,
                height: "auto",
                minHeight: "40px",
                borderRadius: 5,
                borderColor: "#5B84C4",
                backgroundColor: "#FFB375",
                "&:hover": { borderColor: "#5B84C4" },
                boxShadow: "none",
                color: "white",
                fontFamily: "System",
                fontSize: "14px",
                flexWrap: "wrap",
            }),
            dropdownIndicator: (styles, { isFocused, isSelected }) => {
                return {
                    ...styles,
                    color: isFocused ? "#5B84C4" : "white",
                    fontFamily: "System",
                    borderColor: "#5B84C4",
                    backgroundColor: "#FFB375",
                    fontFamily: "System",
                    fontSize: "14px",
                };
            },
            valueContainer: (styles) => {
                return {
                    ...styles,
                    color: "white",
                    fontFamily: "System",
                    borderColor: "#5B84C4",
                    backgroundColor: "#FFB375",
                    fontFamily: "System",
                    fontSize: "14px",
                    flexWrap: "wrap",
                };
            },
            menu: (styles) => {
                return {
                    ...styles,
                    color: "white",
                    fontFamily: "System",
                    borderColor: "#5B84C4",
                    backgroundColor: "#FFB375",
                    fontSize: "14px",
                };
            },
            menuList: (styles) => {
                return {
                    ...styles,
                    color: "white",
                    fontFamily: "System",
                    borderColor: "#5B84C4",
                    backgroundColor: "#FFB375",
                    fontSize: "14px",
                };
            },
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                return {
                    ...styles,
                    backgroundColor: isDisabled ? "red" : "#FFB375",
                    color: "white",
                    fontSize: "14px",
                    fontFamily: "System",
                    borderColor: "#5B84C4",
                    cursor: isDisabled ? "not-allowed" : "default",
                };
            },
            menuPortal: (base) => ({
                ...base,
                zIndex: 9999, // Adjust the z-index if needed
            }),
            multiValue: (styles) => {
                return {
                    ...styles,
                    color: "white",
                    fontFamily: "System",
                    borderColor: "#5B84C4",
                    backgroundColor: "#FFB375",
                    fontFamily: "System",
                    fontSize: "14px",
                };
            },
            multiValueLabel: (styles) => {
                return {
                    ...styles,
                    color: "white",
                    fontFamily: "System",
                    borderColor: "#5B84C4",
                    backgroundColor: "#FFB375",
                    fontFamily: "System",
                    fontSize: "14px",
                };
            },
            noOptionsMessage: (styles) => {
                return {
                    ...styles,
                    color: "white",
                    fontFamily: "System",
                    borderColor: "#5B84C4",
                    backgroundColor: "#FFB375",
                    fontSize: "14px",
                };
            },
            placeholder: (base) => ({
                ...base,
                color: "white",
                fontFamily: "System",
                fontSize: "14px",
            }),
            singleValue: (base) => ({
                ...base,
                color: "white",
                fontFamily: "System",
                fontSize: "14px",
            }),
        }}
    />
);

export default SelectComp;
