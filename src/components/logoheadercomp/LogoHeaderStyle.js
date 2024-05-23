import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
export const logoHeaderStyle = StyleSheet.create({
    container: {
        width: width,
        flexDirection: "row",
        backgroundColor: "#5B84C4",
        height: 45,
        justifyContent: "center", // Center the image horizontally
        alignItems: "center",
    },
    image: {
        height: 75,
        resizeMode: "contain",
    },
});
