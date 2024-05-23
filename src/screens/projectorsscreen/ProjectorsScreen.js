import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { projectorsStyle } from "./ProjectorsStyle";
import {
    fetchAdminProjectors,
    fetchAdminProjectorsReserved,
    patchAdminProjector,
} from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ProjectorCardComp from "../../components/projectorcardcomp/ProjectorCardComp";
import PlayPauseComp from "../../components/playpausecomp/PlayPauseComp";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const ProjectorsScreen = () => {
    const { state } = useAuth();
    const navigation = useNavigation();
    const [projectors, setProjectors] = useState([]);
    const [reservedProjectorsIds, setReservedProjectorsIds] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            getProjectors();
            getAdminProjectorsReserved();
        }, [])
    );

    const navigateToAddProjectorScreen = () => {
        navigation.navigate("AddProjector", {});
    };

    const navigateToEditProjectorScreen = (item) => {
        navigation.navigate("EditProjector", { projector: item });
    };

    const handleToggle = async (item) => {
        setLoading(true);
        const patchData = {
            Available: !item.available,
        };
        const jsonPatchData = JSON.stringify(patchData);
        try {
            await patchAdminProjector(state.userToken, item.id, jsonPatchData);
        } catch (error) {
            console.error("Error patching projector:", error);
        }
        setLoading(false);
        getProjectors();
    };

    const getProjectors = async () => {
        try {
            const projectorsFetched = await fetchAdminProjectors(
                state.userToken
            );
            setProjectors(projectorsFetched);
            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    const getAdminProjectorsReserved = async () => {
        try {
            const projectorsFetched = await fetchAdminProjectorsReserved(
                state.userToken
            );
            setReservedProjectorsIds(projectorsFetched);
            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    return (
        <ScrollView style={projectorsStyle.container}>
            <ContentViewComp>
                <View style={projectorsStyle.button}>
                    <ButtonComp
                        onPress={() => navigateToAddProjectorScreen()}
                        text="Add Projector"
                    />
                </View>
                <View style={projectorsStyle.listContainer}>
                    {projectors && projectors.length > 0 ? (
                        projectors.map((item) => (
                            <View key={item.id}>
                                <ProjectorCardComp
                                    item={item}
                                    onPress={() =>
                                        navigateToEditProjectorScreen(item)
                                    }
                                    showExtraButtons={
                                        !reservedProjectorsIds.includes(item.id)
                                    }
                                    isPlaying={item.available}
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

export default ProjectorsScreen;
