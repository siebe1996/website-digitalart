import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { categoriesStyle } from "./CategoriesStyle";
import { fetchCategories } from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import CategoryCardComp from "../../components/categorycardcomp/CategoryCardComp";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const CategoriesScreen = () => {
    const { state } = useAuth();
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            getCategories();
        }, [])
    );

    const navigateToAddCategoryScreen = () => {
        navigation.navigate("AddCategory", {});
    };

    const navigateToEditCategoryScreen = (item) => {
        navigation.navigate("EditCategory", { category: item });
    };

    const getCategories = async () => {
        try {
            const categoriesFetched = await fetchCategories(state.userToken);
            setCategories(categoriesFetched);
            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    return (
        <ScrollView style={categoriesStyle.container}>
            <ContentViewComp>
                <View style={categoriesStyle.button}>
                    <ButtonComp
                        onPress={() => navigateToAddCategoryScreen()}
                        text="add category"
                    />
                </View>
                <View style={categoriesStyle.listContainer}>
                    {categories && categories.length > 0 ? (
                        categories.map((item) => (
                            <CategoryCardComp
                                key={item.id}
                                item={item}
                                onPress={() =>
                                    navigateToEditCategoryScreen(item)
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

export default CategoriesScreen;
