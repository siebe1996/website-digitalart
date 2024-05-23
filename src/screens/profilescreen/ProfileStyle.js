import { StyleSheet } from "react-native";

export const profileStyle = StyleSheet.create({
    container: {
        padding: 20,
        height: "100vh",
        paddingBottom: 80,
        backgroundColor: "#EBD8C5",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        width: 150, // Set a fixed width for the circular image container
        height: 150, // Set a fixed height for the circular image container
        borderRadius: 75, // Make it a circle by setting borderRadius to half of the width and height
        overflow: "hidden", // Clip the image to the circular shape
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 50,
    },
});
