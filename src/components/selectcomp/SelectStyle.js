import { StyleSheet } from "react-native";

export const selectStyle = StyleSheet.create({
    control: (base) => ({
        ...base,
        height: "40px", // Adjust the height to match TextInput field
        minHeight: "40px",
        borderRadius: 5, // Match the border radius
        border: "#5B84C4", // Match the border color
        backgroundColor: "#FFB375", // Match the background color
        "&:hover": { borderColor: "#5B84C4" }, // Border color on hover
        boxShadow: "none", // Remove box-shadow
        color: "white",
        fontFamily: "System", // Standard React Native font
        fontSize: "14px", // Standard font size
    }),
    menuPortal: (base) => ({
        ...base,
        zIndex: 9999, // Adjust the z-index if needed
    }),
    placeholder: (base) => ({
        ...base,
        color: "white", // Placeholder text color
        fontFamily: "System", // Standard React Native font
        fontSize: "14px", // Standard font size
    }),
    singleValue: (base) => ({
        ...base,
        color: "white", // Single value text color
        fontFamily: "System", // Standard React Native font
        fontSize: "14px", // Standard font size
    }),
});
