import { StyleSheet } from "react-native";

export const projectorDisplayStyle = StyleSheet.create({
    container: {
        height: "100vh",
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },

    artpieceContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    artpieceImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});
