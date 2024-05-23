import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { placesStyle } from "./PlacesStyle";
import {
    fetchExhibitorPlacesMine,
    fetchPlaces,
} from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import PlaceCardComp from "../../components/placecardcomp/PlaceCardComp";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const PlacesScreen = () => {
    const { state } = useAuth();
    const userRole = state.userRoles.includes("Admin") ? "Admin" : "Exhibitor";
    const navigation = useNavigation();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    //toDo make it so admins see all places but cannot add a place
    useFocusEffect(
        useCallback(() => {
            if (userRole === "Admin") {
                getPlaces();
            } else {
                getExhibitorPlacesMine();
            }
        }, [])
    );

    const navigateToAddPlaceScreen = () => {
        navigation.navigate("AddPlace", {});
    };

    const navigateToEditPlaceScreen = (item) => {
        navigation.navigate("EditPlace", { place: item });
    };

    const getExhibitorPlacesMine = async () => {
        try {
            const placesFetched = await fetchExhibitorPlacesMine(
                state.userToken
            );
            console.log("placesFetched", placesFetched);
            setPlaces(placesFetched);
            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    const getPlaces = async () => {
        try {
            const placesFetched = await fetchPlaces(state.userToken);
            setPlaces(placesFetched);
            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    return (
        <ScrollView style={placesStyle.container}>
            <ContentViewComp>
                {userRole === "Exhibitor" && (
                    <ButtonComp
                        onPress={() => navigateToAddPlaceScreen()}
                        text="Add Place"
                    />
                )}
                <View style={placesStyle.listContainer}>
                    {places && places.length > 0 ? (
                        places.map((item) => (
                            <PlaceCardComp
                                key={item.id}
                                item={item}
                                onPress={() => navigateToEditPlaceScreen(item)}
                            />
                        ))
                    ) : (
                        <Text>No data available</Text>
                    )}
                </View>
            </ContentViewComp>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </ScrollView>
    );
};

export default PlacesScreen;
