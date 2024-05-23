import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { expositionsStyle } from "./ExpositionsStyle";
import {
    fetchExhibitorExpositionsMine,
    patchExhibitorExposition,
    fetchExhibitorExpositionsMineActiveIds,
} from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ExpositionCardComp from "../../components/expositioncardcomp/ExpositionCardComp";
import PlayPauseComp from "../../components/playpausecomp/PlayPauseComp";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const ExpositionsScreen = () => {
    const { state } = useAuth();
    const navigation = useNavigation();
    const [expositions, setExpositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reservedExpositions, setReservedExpositions] = useState([]);

    useFocusEffect(
        useCallback(() => {
            getExpositionsMine();
            getExhibitorExpositionsReserved();
        }, [])
    );

    const navigateToAddExpositionScreen = () => {
        navigation.navigate("AddExposition", {});
    };

    const navigateToEditExpositionScreen = (item) => {
        navigation.navigate("EditExposition", { exposition: item });
    };
    const navigateToViewExpositionScreen = (item) => {
        navigation.navigate("Display", { id: item.id });
    };

    const handleToggle = async (item) => {
        setLoading(true);
        const patchData = {
            Active: !item.active,
        };
        const jsonPatchData = JSON.stringify(patchData);
        try {
            await patchExhibitorExposition(
                state.userToken,
                item.id,
                jsonPatchData
            );
        } catch (error) {
            console.error("Error patching exposition:", error);
        }
        setLoading(false);
        getExpositionsMine();
    };

    const getExpositionsMine = async () => {
        try {
            const expositionsFetched = await fetchExhibitorExpositionsMine(
                state.userToken
            );
            console.log("expositions fetched:", expositionsFetched);
            setExpositions(expositionsFetched);
            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    const getExhibitorExpositionsReserved = async () => {
        try {
            const fetched = await fetchExhibitorExpositionsMineActiveIds(
                state.userToken
            );
            setReservedExpositions(fetched);
            console.log("fetched", fetched);
            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    return (
        <ScrollView style={expositionsStyle.container}>
            <ContentViewComp>
                <View style={expositionsStyle.button}>
                    <ButtonComp
                        onPress={() => navigateToAddExpositionScreen()}
                        text="add exposition"
                    />
                </View>
                <View style={expositionsStyle.listContainer}>
                    <Text style={expositionsStyle.title}>Expositions</Text>
                    {expositions && expositions.length > 0 ? (
                        expositions.map((item) => (
                            <View key={item.id}>
                                {console.log("item", item)}
                                <ExpositionCardComp
                                    item={item}
                                    onPress={() =>
                                        navigateToEditExpositionScreen(item)
                                    }
                                    showExtraButtons={reservedExpositions.includes(
                                        item.id
                                    )}
                                    onPressView={() =>
                                        navigateToViewExpositionScreen(item)
                                    }
                                    isPlaying={item.active}
                                    onPressStartStop={() => handleToggle(item)}
                                />
                            </View>
                        ))
                    ) : (
                        <Text>No data available</Text>
                    )}
                </View>
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </ContentViewComp>
        </ScrollView>
    );
};

export default ExpositionsScreen;
