import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Keyboard,
    ScrollView,
} from "react-native";
import { addAdminStyle } from "./AddAdminStyle";
import TitleComp from "../../components/titlecomp/TitleComp";
import LabelTextInputComp from "../../components/labeltextinputcomp/LabelTextInputComp";
import InvalidTextComp from "../../components/invalidtextcomp/InvalidTextComp";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import LabelComp from "../../components/labelcomp/LabelComp";
import {
    fetchAddressInfo,
    fetchAutoCompleteMaps,
    postAdmin,
} from "../../services/ApiService";
import { returnResultImagePicker } from "../../services/HelperFunctions";
import DatePicker from "react-datepicker";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import "react-datepicker/dist/react-datepicker.css";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";
import LabelDatePickerComp from "../../components/labeldatepickercomp/LabelDatePickerComp";
import AddressButtonComp from "../../components/addressbuttoncomp/AddressButtonComp";

const AddAdminScreen = () => {
    const { state } = useAuth();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [date, setDate] = useState(new Date());
    const [address, setAddress] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("");
    const [predictions, setPredictions] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [shouldFetch, setShouldFetch] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        getAutoCompleteMaps();
    }, [address, shouldFetch]);

    const getAutoCompleteMaps = async () => {
        try {
            if (shouldFetch && address.length > 0) {
                const result = await fetchAutoCompleteMaps(address);
                console.log("Predictions result fetch", result);
                const formattedAddresses = result.map(
                    (item) => item.description
                );
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
    };

    const handleAddressChange = (text) => {
        setAddress(text);
        setShouldFetch(true);
    };

    const openImagePicker = async () => {
        try {
            const result = await returnResultImagePicker();
            setSelectedImage(result);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDateChange = (date) => {
        if (date) {
            setDate(date);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!password1.trim() || password1 != password2) {
            setPassword1("");
            setPassword2("");
            newErrors.password = "Password is wrong";
        }

        if (!firstName.trim()) {
            newErrors.firstName = "First name is required";
        }
        if (!lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }
        if (!address.trim()) {
            newErrors.address = "Address is required";
        }
        //toDo check if province etc is filled in
        if (new Date(date) > new Date()) {
            newErrors.date = "The date must be your real birthday";
        }
        return newErrors;
    };

    const handleRegister = async () => {
        console.log("register gets pressed");
        setLoading(true);
        let validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const userData = {
                firstName: firstName,
                lastName: lastName,
                imageData: selectedImage.base64,
                mimeTypeImageData: selectedImage.mimeType,
                dateOfBirth: date,
                email: email,
                country: country,
                city: city,
                postalCode: postalCode,
                province: province,
                address: address,
                street: street,
                password: password1,
            };
            const jsonUserData = JSON.stringify(userData);
            console.log("jsnUserData:", jsonUserData);
            try {
                await postAdmin(state.userToken, jsonUserData);
                navigation.navigate("Admins");
            } catch (error) {
                console.error("Error posting user:", error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <ScrollView style={addAdminStyle.container}>
            <ContentViewComp>
                <View>
                    <View style={addAdminStyle.touchableOpacityContainer}>
                        <TouchableOpacity onPress={() => openImagePicker()}>
                            <View style={addAdminStyle.imageContainer}>
                                <Image
                                    source={
                                        selectedImage
                                            ? { uri: selectedImage.uri }
                                            : require("../../data/images/anonymous-person.jpg")
                                    }
                                    style={addAdminStyle.image}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <LabelTextInputComp
                            label="Email: *"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder="johndoe@example.com"
                        />
                        {errors.email && (
                            <InvalidTextComp text={errors.email} />
                        )}
                    </View>
                    <View>
                        <LabelTextInputComp
                            label="Password: *"
                            value={password1}
                            onChangeText={(text) => setPassword1(text)}
                            placeholder="Password"
                            secureTextEntry={true}
                        />
                        <LabelTextInputComp
                            label="Confirm Password: *"
                            value={password2}
                            onChangeText={(text) => setPassword2(text)}
                            placeholder="Password"
                            secureTextEntry={true}
                        />
                        {errors.password && (
                            <InvalidTextComp text={errors.password} />
                        )}
                    </View>
                    <View>
                        <View>
                            <LabelTextInputComp
                                label="First Name: *"
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                                placeholder="John"
                            />
                            {errors.firstName && (
                                <InvalidTextComp text={errors.firstName} />
                            )}
                        </View>
                        <View>
                            <LabelTextInputComp
                                label="Last Name: *"
                                value={lastName}
                                onChangeText={(text) => setLastName(text)}
                                placeholder="Doe"
                            />
                            {errors.lastName && (
                                <InvalidTextComp text={errors.lastName} />
                            )}
                        </View>
                        <View>
                            <LabelTextInputComp
                                label="Address: *"
                                value={address}
                                onChangeText={handleAddressChange}
                                placeholder="homestreet 1 homecity"
                            />
                            {errors.address && (
                                <InvalidTextComp text={errors.address} />
                            )}
                        </View>
                        {predictions.length > 0 && (
                            <View>
                                {predictions.map((item, index) => (
                                    <AddressButtonComp
                                        key={index}
                                        text={item}
                                        onPress={() => handleSearch(item)}
                                    />
                                ))}
                            </View>
                        )}
                    </View>
                    <View style={addAdminStyle.birthdayContainer}>
                        <LabelDatePickerComp
                            label="Birthday: *"
                            selected={date}
                            maxDate={new Date()}
                            onChange={(date) => handleDateChange(date)}
                        />

                        {errors.date && <InvalidTextComp text={errors.date} />}
                    </View>
                </View>

                <ButtonComp
                    text={"Register"}
                    disabled={loading}
                    onPress={handleRegister}
                />
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </ContentViewComp>
        </ScrollView>
    );
};

export default AddAdminScreen;
