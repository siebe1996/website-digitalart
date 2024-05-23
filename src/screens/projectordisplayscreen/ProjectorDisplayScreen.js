import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as signalR from "@microsoft/signalr";
import { BACKEND_URL } from "../../constants";
import { useRoute } from "@react-navigation/native";
import { projectorDisplayStyle } from "./ProjectorDisplayStyle";

const ProjectorDisplayScreen = () => {
    const [artpieces, setArtpieces] = useState([]);
    const route = useRoute();
    const expositionId = route.params?.id;
    const [currentArtpiece, setCurrentArtpiece] = useState(null);
    console.log("route", route);
    console.log("expositionId", expositionId);

    useEffect(() => {
        console.log("api call:" + `${BACKEND_URL}projectorhub`);
        if (!expositionId) {
            console.error("Exposition ID is missing");
            return;
        }

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${BACKEND_URL}expositionhub`, {
                withCredentials: true, // Ensure credentials are included
            }) // Adjust this URL to where your backend is hosted
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection
            .start()
            .then(() => {
                console.log("Connected to SignalR Hub");
                return connection.invoke(
                    "JoinExpositionGroup",
                    expositionId.toString()
                );
            })
            .then(() => {
                console.log(`Joined group for exposition: ${expositionId}`);
            })
            .catch((err) => console.error("SignalR Connection Error: ", err));

        connection.on("DisplayArtpieces", (receivedArtpieces) => {
            setArtpieces(receivedArtpieces);
            setCurrentArtpiece(receivedArtpieces[0]);
        });

        connection.on("StopDisplay", () => {
            setArtpieces([]);
            setCurrentArtpiece(null);
            console.log("Stop displaying artpieces");
        });

        // Cleanup on dismount
        return () => {
            connection
                .invoke("LeaveExpositionGroup", expositionId.toString())
                .catch((err) => console.error("Leave Group Error: ", err));
            connection
                .stop()
                .catch((err) =>
                    console.error("Error stopping connection: ", err)
                );
        };
    }, [expositionId]);

    useEffect(() => {
        if (artpieces.length === 0) return;

        const intervalId = setInterval(() => {
            setCurrentArtpiece((prevArtpiece) => {
                if (!prevArtpiece) {
                    return artpieces[0];
                }
                const currentIndex = artpieces.findIndex(
                    (ap) => ap.id === prevArtpiece.id
                );
                const nextIndex = (currentIndex + 1) % artpieces.length;
                console.log(
                    `Changing artpiece from ${currentIndex} to ${nextIndex}`
                );
                return artpieces[nextIndex];
            });
            console.log("currentArtpiece", currentArtpiece);
        }, 5000); // Change the interval time as needed

        return () => clearInterval(intervalId);
    }, [artpieces]);
    console.log("artpieces", artpieces);

    return (
        <View style={projectorDisplayStyle.container}>
            {artpieces && artpieces.length > 0 ? (
                currentArtpiece ? (
                    <View style={projectorDisplayStyle.artpieceContainer}>
                        <Image
                            source={{
                                uri: `data:${currentArtpiece.mimeTypeImageData};base64,${currentArtpiece.imageData}`,
                            }}
                            style={projectorDisplayStyle.artpieceImage}
                        />
                    </View>
                ) : (
                    <Text>No artpieces to display</Text>
                )
            ) : (
                <Text>No artpieces to display</Text>
            )}
        </View>
    );
};

export default ProjectorDisplayScreen;
