import React, { useState, useEffect } from "react";
import { View, ScrollView, Button, ActivityIndicator } from "react-native";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import LabelTextInputComp from "../../components/labeltextinputcomp/LabelTextInputComp";
import { addProjectorStyle } from "./AddProjectorStyle";
import { postProjector } from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import InvalidTextComp from "../../components/invalidtextcomp/InvalidTextComp";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const AddProjectorScreen = () => {
    const { state } = useAuth();
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [damages, setDamages] = useState("");
    const [remarks, setRemarks] = useState("");
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {});

    const validateForm = () => {
        const newErrors = {};
        if (!brand.trim()) {
            newErrors.brand = "Brand is required";
        }

        if (!model.trim()) {
            newErrors.model = "Model is required";
        }

        if (!serialNumber.trim()) {
            newErrors.serialNumber = "Serial Number is required";
        }

        return newErrors;
    };

    const save = async () => {
        setLoading(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const projectorData = {
                brand: brand,
                model: model,
                serialNumber: serialNumber,
                damages: damages,
                remarks: remarks,
            };
            const jsonProjectorData = JSON.stringify(projectorData);
            try {
                await postProjector(state.userToken, jsonProjectorData);
                navigation.navigate("Projectors");
            } catch (error) {
                console.error("Error posting the new Projector:", error);
            }
        } else {
            setErrors(validationErrors);
        }
        setLoading(false);
    };

    return (
        <ScrollView style={addProjectorStyle.container}>
            <ContentViewComp>
                <View>
                    <LabelTextInputComp
                        label="Brand:"
                        value={brand}
                        onChangeText={(text) => setBrand(text)}
                        placeholder="Brand name"
                    />
                    {errors.brand && <InvalidTextComp text={errors.brand} />}
                </View>
                <View>
                    <LabelTextInputComp
                        label="Model:"
                        value={model}
                        onChangeText={(text) => setModel(text)}
                        placeholder="Model number"
                    />
                    {errors.model && <InvalidTextComp text={errors.model} />}
                </View>
                <View>
                    <LabelTextInputComp
                        label="Serial Number:"
                        value={serialNumber}
                        onChangeText={(text) => setSerialNumber(text)}
                        placeholder="Serial number"
                    />
                    {errors.serialNumber && (
                        <InvalidTextComp text={errors.serialNumber} />
                    )}
                </View>
                <View>
                    <LabelTextInputComp
                        label="Damages:"
                        value={damages}
                        onChangeText={(text) => setDamages(text)}
                        placeholder="Damages"
                        multiline
                        numberOfLines={4}
                    />
                    {errors.damages && (
                        <InvalidTextComp text={errors.damages} />
                    )}
                </View>
                <View>
                    <LabelTextInputComp
                        label="Remarks:"
                        value={remarks}
                        onChangeText={(text) => setRemarks(text)}
                        placeholder="Remarks"
                        multiline
                        numberOfLines={4}
                    />
                    {errors.remarks && (
                        <InvalidTextComp text={errors.remarks} />
                    )}
                </View>
                <ButtonComp onPress={save} text="Submit" disabled={loading} />

                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </ContentViewComp>
        </ScrollView>
    );
};

export default AddProjectorScreen;
