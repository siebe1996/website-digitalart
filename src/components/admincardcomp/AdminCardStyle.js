import { StyleSheet } from "react-native";

export const adminCardStyle = StyleSheet.create({
    cardContainer: {
        flexDirection: "row", // Use flexDirection to align items horizontally
        alignItems: "center", // Center items vertically
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
    imageContainer: {
        marginRight: 16,
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    textContainer: {
        flex: 1, // Allow the text container to take the remaining space
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
        color: "white",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        color: "white",
    },
});
