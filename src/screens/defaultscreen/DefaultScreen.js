import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
const DefaultScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.box}>
                <Text>Item 1</Text>
            </View>
            <View style={styles.box}>
                <Text>Item 2</Text>
            </View>
            <View style={styles.box}>
                <Text>Item 3</Text>
            </View>
            <View style={styles.box}>
                <Text>Item 3</Text>
            </View>
            <View style={styles.box}>
                <Text>Item 3</Text>
            </View>
            <View style={styles.box}>
                <Text>Item 3</Text>
            </View>
            <View style={styles.box}>
                <Text>Item 3</Text>
            </View>
            <View style={styles.box}>
                <Text>Item 3</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100vh", // Adjust based on the height you want for the scrollable area
        padding: 20,
        paddingBottom: 60,
    },
    box: {
        height: 150, // Each box has a height of 150 pixels
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: "#ddd", // Light gray background for each box
    },
});

export default DefaultScreen;
