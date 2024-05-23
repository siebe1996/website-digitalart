import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { adminsStyle } from "./AdminsStyle";
import { fetchAdmins } from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AdminCardComp from "../../components/admincardcomp/AdminCardComp";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const AdminsScreen = () => {
    const { state } = useAuth();
    const navigation = useNavigation();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            getAdmins();
        }, [])
    );

    const navigateToAddAdminScreen = () => {
        navigation.navigate("AddAdmin", {});
    };

    const getAdmins = async () => {
        try {
            const adminsFetched = await fetchAdmins(state.userToken);
            setAdmins(adminsFetched);
            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    return (
        <ScrollView style={adminsStyle.container}>
            <ContentViewComp>
                <View style={adminsStyle.button}>
                    <ButtonComp
                        onPress={() => navigateToAddAdminScreen()}
                        text="add admin"
                    />
                </View>
                <View style={adminsStyle.listContainer}>
                    {admins && admins.length > 0 ? (
                        admins.map((item) => (
                            <AdminCardComp
                                key={item.id}
                                item={item}
                                onPress={() => {}}
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

export default AdminsScreen;
