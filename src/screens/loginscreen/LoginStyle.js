import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
    container: {
        backgroundColor: "#EBD8C5",
        padding: 20,
        height: "100vh",
        paddingBottom: 80,
    },
    contentContainer: {
        maxWidth: 500,
        minWidth: 300,
        alignSelf: "center",
    },
    register: {
        textDecorationLine: "underline",
    },
    registerContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});
