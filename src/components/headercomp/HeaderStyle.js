import { StyleSheet } from "react-native";

export const headerStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#5B84C4",
    },
    menu: {
        marginRight: 20,
    },
    titlesContainer: {
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 12,
        color: "gray",
    },
});
