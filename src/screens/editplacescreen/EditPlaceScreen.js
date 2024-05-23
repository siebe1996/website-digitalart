import React, { useState, useEffect } from "react";
import { View, ScrollView, Button, ActivityIndicator } from "react-native";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import LabelTextInputComp from "../../components/labeltextinputcomp/LabelTextInputComp";
import { editPlaceStyle } from "./EditPlaceStyle";
import { useAuth } from "../../contexts/AuthContext";
import {
    putExhibitorPlace,
    fetchAddressInfo,
    fetchAutoCompleteMaps,
} from "../../services/ApiService";
import { useNavigation } from "@react-navigation/native";
import InvalidTextComp from "../../components/invalidtextcomp/InvalidTextComp";
import AddressButtonComp from "../../components/addressbuttoncomp/AddressButtonComp";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const EditPlaceScreen = ({ route }) => {
    const { state } = useAuth();
    const { place } = route.params;
    const [name, setName] = useState(place.name);
    const [description, setDescription] = useState(place.description);
    const [address, setAddress] = useState(place.address);
    const [country, setCountry] = useState(place.country);
    const [city, setCity] = useState(place.city);
    const [province, setProvince] = useState(place.province);
    const [postalCode, setPostalCode] = useState(place.postalCode);
    const [street, setStreet] = useState(place.street);
    const [errors, setErrors] = useState({});
    const [predictions, setPredictions] = useState([]);
    const [latitude, setLatitude] = useState(place.latitude);
    const [longitude, setLongitude] = useState(place.longitude);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [shouldFetch, setShouldFetch] = useState(false);

    useEffect(() => {
        //convertValues();
        getAutoCompleteMaps();
    }, [address, shouldFetch]);

    const getAutoCompleteMaps = async () => {
        try {
            if (shouldFetch && address.length > 0) {
                const result = await fetchAutoCompleteMaps(address);
                const formattedAddresses = result.map(
                    (item) => item.description
                );
                console.log("formattedAddresses", formattedAddresses);
                setPredictions(formattedAddresses);
            } else {
                setPredictions([]);
            }
        } catch (error) {
            console.error("Error fetching predictions:", error.message);
        }
    };

    const handleSearch = async (selectedPrediction) => {
        setAddress(selectedPrediction);
        setShouldFetch(false);
        setPredictions([]);
        const resultFetch = await fetchAddressInfo(selectedPrediction);
        const result = resultFetch[0];
        setLatitude(result.geometry.location.lat());
        setLongitude(result.geometry.location.lng());
        const city =
            result.address_components.find((component) =>
                component.types.includes("locality")
            )?.long_name || "";
        const province =
            result.address_components.find((component) =>
                component.types.includes("administrative_area_level_1")
            )?.short_name || "";
        const postalCode =
            result.address_components.find((component) =>
                component.types.includes("postal_code")
            )?.long_name || "";
        const countryComponent = result.address_components.find((component) =>
            component.types.includes("country")
        );
        const country = countryComponent ? countryComponent.short_name : "";
        const streetNumberComponent = result.address_components.find(
            (component) => component.types.includes("street_number")
        );
        const routeComponent = result.address_components.find((component) =>
            component.types.includes("route")
        );
        const street =
            (routeComponent ? routeComponent.long_name : "") +
            " " +
            (streetNumberComponent ? streetNumberComponent.long_name : "");

        setCountry(country);
        setCity(city);
        setPostalCode(postalCode);
        setProvince(province);
        setStreet(street);
        setPredictions([]);
    };

    const handleAddressChange = (text) => {
        setAddress(text);
        setShouldFetch(true);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!address.trim() && !latitude && !selectedPrediction) {
            newErrors.address = "Address is required";
        }

        if (!name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!description.trim()) {
            newErrors.email = "Description is required";
        }

        return newErrors;
    };

    const save = async () => {
        setLoading(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const placeData = {
                name: name,
                description: description,
                country: country,
                city: city,
                postalCode: postalCode,
                province: province,
                street: street,
                address: address,
                latitude: latitude,
                longitude: longitude,
            };
            const jsonPlaceData = JSON.stringify(placeData);
            try {
                await putExhibitorPlace(
                    state.userToken,
                    place.id,
                    jsonPlaceData
                );
                navigation.navigate("YourPlaces");
            } catch (error) {
                console.error("Error patching the Place:", error);
            }
        } else {
            setErrors(validationErrors);
        }
        setLoading(false);
    };

    return (
        <ScrollView style={editPlaceStyle.container}>
            <ContentViewComp>
                <View>
                    <LabelTextInputComp
                        label="Name:"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder="The greatest place"
                    />
                    {errors.name && <InvalidTextComp text={errors.name} />}
                </View>
                <View>
                    <LabelTextInputComp
                        label="Description:"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder="It really is the greatest place"
                        multiline={4}
                    />
                    {errors.description && (
                        <InvalidTextComp text={errors.description} />
                    )}
                </View>
                <View>
                    <LabelTextInputComp
                        label="Address:"
                        value={address}
                        onChangeText={handleAddressChange}
                        placeholder="homestreet 1 homecity"
                    />
                    {predictions.length > 0 && (
                        <View>
                            {predictions.map((item, index) => (
                                <AddressButtonComp
                                    key={index}
                                    title={item}
                                    onPress={() => handleSearch(item)}
                                />
                            ))}
                        </View>
                    )}
                    {errors.address && (
                        <InvalidTextComp text={errors.address} />
                    )}
                </View>

                <ButtonComp
                    onPress={() => {
                        save();
                    }}
                    text="Edit"
                    disabled={loading}
                />
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </ContentViewComp>
        </ScrollView>
    );
};

export default EditPlaceScreen;
