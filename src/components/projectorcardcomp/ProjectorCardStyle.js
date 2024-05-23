import { StyleSheet } from "react-native";

export const projectorCardStyle = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 16,
        backgroundColor: "#FFB375",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        color: "white",
        borderColor: "#5B84C4",
        borderWidth: 2,
        width: "100%",
        overflow: "hidden",
    },
    textContainer: {
        textContainer: { flex: 1, paddingHorizontal: 10 },
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#11224D",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#11224D",
    },
    textBad: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        color: "red",
    },
    extraButtonsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});
