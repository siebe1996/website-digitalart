import { StyleSheet } from "react-native";

export const registerStyle = StyleSheet.create({
    container: {
        height: "100vh",
        padding: 20,
        paddingBottom: 80,
        backgroundColor: "#EBD8C5",
    },
    contentContainer: {
        maxWidth: 500,
        minWidth: 300,
        alignSelf: "center",
    },
    birthdayContainer: {
        paddingBottom: 16,
    },
    loginContainer: {
        marginBottom: 32,
    },
    touchableOpacityContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        width: 100, // Set a fixed width for the circular image container
        height: 100, // Set a fixed height for the circular image container
        borderRadius: 50, // Make it a circle by setting borderRadius to half of the width and height
        overflow: "hidden", // Clip the image to the circular shape
    },
    image: {
        width: "100%",
        height: "100%",
    },
    login: {
        textDecorationLine: "underline",
    },
    loginContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        width: "100%",
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 3,
        backgroundColor: "orange",
        fontSize: 16,
    },
});
