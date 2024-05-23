import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import LabelTextInputComp from "../../components/labeltextinputcomp/LabelTextInputComp";
import LabelComp from "../../components/labelcomp/LabelComp";
import { editExpositionStyle } from "./EditExpositionStyle";
import {
    putExhibitorExposition,
    fetchCategories,
    fetchExhibitorRentalAgreementsMineAvailableWithCurrent,
} from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import InvalidTextComp from "../../components/invalidtextcomp/InvalidTextComp";
import Select from "react-select";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";
import LabelSelectComp from "../../components/labelselectcomp/LabelSelectComp";

const EditExpositionScreen = ({ route }) => {
    const { state } = useAuth();
    console.log("route:", route);
    const { exposition } = route.params;
    console.log("exposition:", exposition);
    const [name, setName] = useState(exposition.name);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [rentalAgreements, setRentalAgreements] = useState([]);
    const [selectedRentalAgreements, setSelectedRentalAgreements] = useState(
        []
    );
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCategories();
        getExhibitorRentalAgreementsMineAvailable();
    }, []);

    const getCategories = async () => {
        try {
            const response = await fetchCategories(state.userToken);
            console.log("categories:", response);
            const formattedOptions = response.map((item) => ({
                value: item.id,
                label: item.name,
            }));
            setCategories(formattedOptions);
            const initialSelectedCategories = formattedOptions.filter((item) =>
                exposition.categoryIds.includes(item.value)
            );
            console.log(
                "initialSelectedCategories:",
                initialSelectedCategories
            );
            setSelectedCategories(initialSelectedCategories);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    const getExhibitorRentalAgreementsMineAvailable = async () => {
        try {
            const rentalAgreementsFetched =
                await fetchExhibitorRentalAgreementsMineAvailableWithCurrent(
                    state.userToken,
                    exposition.id
                );
            const formattedOptions = rentalAgreementsFetched.map((item) => ({
                value: item.projector.id,
                label: `${item.place.name} ${item.projector.brand} ${item.projector.model}`,
            }));
            console.log("formattedOptionsRentalAgreements:", formattedOptions);
            setRentalAgreements(formattedOptions);
            const initialSelectedRentalAgreements = formattedOptions.filter(
                (item) => exposition.projectorIds.includes(item.value)
            );
            console.log(
                "initialSelectedRentalAgreements:",
                initialSelectedRentalAgreements
            );
            setSelectedRentalAgreements(initialSelectedRentalAgreements);
            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    const onChangeSelectCategories = (selectedItems) => {
        const selectedValues = selectedItems
            ? selectedItems.map((item) => item.value)
            : [];
        setSelectedCategories(selectedValues);
    };

    const onChangeSelectRentalAgreements = (selectedItems) => {
        const selectedValues = selectedItems
            ? selectedItems.map((item) => item.value)
            : [];
        setSelectedRentalAgreements(selectedValues);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = "Name is required";
        }

        if (selectedRentalAgreements < 1) {
            newErrors.rentalAgreement = "At least one Projector is required";
        }

        if (selectedCategories.size < 1) {
            newErrors.categories = "At least one category must be selected";
        }

        return newErrors;
    };

    const save = async () => {
        setLoading(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const expositionData = {
                name: name,
                projectorIds: selectedRentalAgreements,
                categoryIds: selectedCategories,
            };
            const jsonExpositionData = JSON.stringify(expositionData);
            console.log("jsonExpositionData", jsonExpositionData);
            try {
                await putExhibitorExposition(
                    state.userToken,
                    exposition.id,
                    jsonExpositionData
                );
                navigation.navigate("Expositions");
            } catch (error) {
                console.error("Error posting the new Exposition:", error);
            }
        } else {
            setErrors(validationErrors);
        }
        setLoading(false);
    };

    return (
        <ScrollView style={editExpositionStyle.container}>
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
                    <LabelSelectComp
                        label={"Select Projectors: *"}
                        value={selectedRentalAgreements}
                        onChange={onChangeSelectRentalAgreements}
                        options={rentalAgreements}
                        isMulti
                    />
                    {errors.rentalAgreement && (
                        <InvalidTextComp text={errors.rentalAgreement} />
                    )}
                </View>
                <View>
                    <LabelSelectComp
                        label={"Select Categories: *"}
                        value={selectedCategories}
                        onChange={onChangeSelectCategories}
                        options={categories}
                        isMulti
                    />
                    {errors.projector && (
                        <InvalidTextComp text={errors.categories} />
                    )}
                </View>
                <ButtonComp onPress={save} text="Edit" disabled={loading} />

                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </ContentViewComp>
        </ScrollView>
    );
};

export default EditExpositionScreen;
