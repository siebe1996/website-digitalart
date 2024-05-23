import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import LabelTextInputComp from "../../components/labeltextinputcomp/LabelTextInputComp";
import { addCategoryStyle } from "./AddCategoryStyle";
import { postAdminCategory } from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import InvalidTextComp from "../../components/invalidtextcomp/InvalidTextComp";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const AddCategoryScreen = () => {
    const { state } = useAuth();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {});

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!description.trim()) {
            newErrors.description = "Description is required";
        }

        return newErrors;
    };

    const save = async () => {
        setLoading(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const categoryData = {
                name: name,
                description: description,
            };
            const jsonCategoryData = JSON.stringify(categoryData);
            try {
                await postAdminCategory(state.userToken, jsonCategoryData);
                navigation.navigate("Categories");
            } catch (error) {
                console.error("Error posting the new Category:", error);
            }
        } else {
            setErrors(validationErrors);
        }
        setLoading(false);
    };

    return (
        <ScrollView style={addCategoryStyle.container}>
            <ContentViewComp>
                <View>
                    <LabelTextInputComp
                        label="Name:"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder="Name"
                    />
                    {errors.name && <InvalidTextComp text={errors.name} />}
                </View>
                <View>
                    <LabelTextInputComp
                        label="Description:"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder="Description"
                        multiline={4}
                    />
                    {errors.description && (
                        <InvalidTextComp text={errors.description} />
                    )}
                </View>
                <ButtonComp onPress={save} text="Submit" disabled={loading} />

                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </ContentViewComp>
        </ScrollView>
    );
};

export default AddCategoryScreen;
