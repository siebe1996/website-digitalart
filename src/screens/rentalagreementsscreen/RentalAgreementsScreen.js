import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { rentalAgreementsStyle } from "./RentalAgreementsStyle";
import {
    fetchExhibitorRentalAgreementsMine,
    fetchAdminRentalAgreements,
} from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import RentalAgreementCardComp from "../../components/rentalagreementcardcomp/RentalAgreementCardComp";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const RentalAgreementsScreen = () => {
    const { state } = useAuth();
    const userRole = state.userRoles.includes("Admin") ? "Admin" : "Exhibitor";
    const navigation = useNavigation();
    const [rentalAgreements, setRentalAgreements] = useState([]);
    const [loading, setLoading] = useState(true);
    //toDo make it so admins see all rentalAgreements but cannot add a rentalAgreement
    //toDo maybe add projector info
    useFocusEffect(useCallback(() => {}, []));

    useFocusEffect(
        useCallback(() => {
            if (userRole === "Admin") {
                getAdminRentalAgreements();
            } else {
                getRentalAgreementsMine();
            }
        }, [])
    );

    const navigateToAddRentalAgreementScreen = () => {
        navigation.navigate("AddRentalAgreement", {});
    };

    const navigateToEditRentalAgreementScreen = (item) => {
        if (userRole === "Admin") {
            navigation.navigate("EditRentalAgreement", {
                rentalagreement: item,
            });
        }
    };

    const getRentalAgreementsMine = async () => {
        try {
            const rentalAgreementsFetched =
                await fetchExhibitorRentalAgreementsMine(state.userToken);
            setRentalAgreements(rentalAgreementsFetched);
            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    const getAdminRentalAgreements = async () => {
        try {
            const rentalAgreementsFetched = await fetchAdminRentalAgreements(
                state.userToken
            );
            setRentalAgreements(rentalAgreementsFetched);
            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    return (
        <ScrollView style={rentalAgreementsStyle.container}>
            <ContentViewComp>
                {userRole === "Exhibitor" && (
                    <View style={rentalAgreementsStyle.button}>
                        <ButtonComp
                            onPress={() => navigateToAddRentalAgreementScreen()}
                            text="add rentalagreement"
                        />
                    </View>
                )}
                <View style={rentalAgreementsStyle.listContainer}>
                    {rentalAgreements && rentalAgreements.length > 0 ? (
                        rentalAgreements.map((item) => (
                            <RentalAgreementCardComp
                                key={`${item.id}`}
                                item={item}
                                onPress={() =>
                                    navigateToEditRentalAgreementScreen(item)
                                }
                            />
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

export default RentalAgreementsScreen;
