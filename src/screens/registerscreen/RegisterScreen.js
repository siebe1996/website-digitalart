import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    TextInput,
    ScrollView,
} from "react-native";
import { registerStyle } from "./RegisterStyle";
import TitleComp from "../../components/titlecomp/TitleComp";
import LabelTextInputComp from "../../components/labeltextinputcomp/LabelTextInputComp";
import InvalidTextComp from "../../components/invalidtextcomp/InvalidTextComp";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import LabelComp from "../../components/labelcomp/LabelComp";
import {
    fetchAddressInfo,
    fetchAutoCompleteMaps,
} from "../../services/ApiService";
import { returnResultImagePicker } from "../../services/HelperFunctions";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import "react-datepicker/dist/react-datepicker.css";
import { useFocusEffect } from "@react-navigation/native";
import TitleBoxComp from "../../components/titleboxcomp/TitleBoxComp";
import DatePickerComp from "../../components/datepickercomp/DatePickerComp";
import LabelDatePickerComp from "../../components/labeldatepickercomp/LabelDatePickerComp";
import AddressButtonComp from "../../components/addressbuttoncomp/AddressButtonComp";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const RegisterScreen = () => {
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 2;
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

    useEffect(() => {}, []);

    const navigation = useNavigation();
    const { signUp } = useContext(AuthContext);

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
        console.log("resultfetched:", resultFetch);
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
        console.log("date", date);
        if (date) {
            setDate(date);
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
        return regex.test(password);
    };

    const validateForm1 = () => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = "Email is required";
        }
        if (!validateEmail(email)) {
            newErrors.email = "Give valid email";
        }
        if (!password1.trim() || password1 !== password2) {
            setPassword1("");
            setPassword2("");
            newErrors.password = "Password is not same";
        }
        if (!validatePassword(password1)) {
            setPassword1("");
            setPassword2("");
            newErrors.password =
                "Password needs capital, number, special sign and longer then 6 chars";
        }
        return newErrors;
    };

    const validateForm2 = () => {
        const newErrors = {};
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

    const validateForm = () => {
        let validationErrors = {};
        if (currentStep == 1) {
            validationErrors = validateForm1();
        } else if (currentStep == 2) {
            validationErrors = validateForm2();
        }
        return validationErrors;
    };

    const handleNextStep = async () => {
        let validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            } else {
                handleRegister();
            }
        } else {
            setErrors(validationErrors);
            console.log("errors", validationErrors);
        }
    };

    const handleRegister = async () => {
        console.log("register gets pressed");
        setLoading(true);

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
        let registerSuccess = true;
        try {
            console.log("jsonUserData", jsonUserData);
            registerSuccess = await signUp(jsonUserData);
        } catch (error) {
            console.error("Error posting user:", error);
        }
        if (registerSuccess) {
            setLoading(false);
            console.log("register successful");
        } else {
            const newErrors = {};
            newErrors.wrong = "Something went wrong";
            setErrors(newErrors);
            setLoading(false);
            console.error("Register failed");
        }
    };

    const handleLoginPress = () => {
        navigation.navigate("Login");
    };

    return (
        <ScrollView style={registerStyle.container}>
            {currentStep == 1 && (
                <View>
                    <TitleBoxComp text="Welcome To ArtSy(nc)" />
                    <ContentViewComp>
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
                    </ContentViewComp>
                </View>
            )}
            {currentStep == 2 && (
                <View>
                    <View style={registerStyle.touchableOpacityContainer}>
                        <TouchableOpacity onPress={() => openImagePicker()}>
                            <View style={registerStyle.imageContainer}>
                                <Image
                                    source={
                                        selectedImage
                                            ? { uri: selectedImage.uri }
                                            : require("../../data/images/anonymous-person.jpg")
                                    }
                                    style={registerStyle.image}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ContentViewComp>
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
                                    {console.log("predictions", predictions)}
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
                        <View style={registerStyle.birthdayContainer}>
                            <LabelDatePickerComp
                                label="Birthday: *"
                                selected={date}
                                maxDate={new Date()}
                                onChange={(date) => handleDateChange(date)}
                            />

                            {errors.date && (
                                <InvalidTextComp text={errors.date} />
                            )}
                        </View>
                    </ContentViewComp>
                </View>
            )}
            <ContentViewComp>
                <ButtonComp
                    text={currentStep < totalSteps ? "Next" : "Register"}
                    disabled={loading}
                    onPress={handleNextStep}
                />
                <View style={registerStyle.loginContainer}>
                    <Text>
                        Already have an account? Login{" "}
                        <Text
                            style={registerStyle.login}
                            onPress={handleLoginPress}
                        >
                            here
                        </Text>
                    </Text>
                </View>
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                {errors.wrong && <InvalidTextComp text={errors.wrong} />}
            </ContentViewComp>
        </ScrollView>
    );
};

export default RegisterScreen;
