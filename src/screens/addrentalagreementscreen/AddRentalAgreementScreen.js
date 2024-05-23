import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import LabelTextInputComp from "../../components/labeltextinputcomp/LabelTextInputComp";
import {
    fetchExhibitorPlacesMine,
    fetchAvailableExhibitorProjectorsSearch,
    postExhibitorRentalAgreements,
} from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import InvalidTextComp from "../../components/invalidtextcomp/InvalidTextComp";
import LabelComp from "../../components/labelcomp/LabelComp";
import { addRentalAgreementStyle } from "./AddRentalAgreementStyle";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";
import LabelDatePickerComp from "../../components/labeldatepickercomp/LabelDatePickerComp";
import LabelSelectComp from "../../components/labelselectcomp/LabelSelectComp";

//toDo make sure datepicker doesnt send get before valid SERVERCRASH
//toDo check why textcomp is so big
const AddRentalAgreementScreen = () => {
    const { state } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;
    const [errors, setErrors] = useState({});
    const nowDate = new Date();
    const [startDate, setStartDate] = useState(nowDate);
    const [endDate, setEndDate] = useState(null);
    const [projectors, setProjectors] = useState([]);
    const [selectedProjector, setSelectedProjector] = useState(null);
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const onChangeDates = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const onChangeSelectProjector = (selectedProjector) => {
        setSelectedProjector(selectedProjector);
    };

    const onChangeSelectPlace = (selectedPlace) => {
        setSelectedPlace(selectedPlace);
    };

    const handleNextStep = async () => {
        let validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            if (currentStep < totalSteps) {
                if (currentStep == 1) {
                    getAvailableProjectorsSearch();
                    getPlacesMine();
                }
                setCurrentStep(currentStep + 1);
            } else {
                save();
            }
        } else {
            setErrors(validationErrors);
            console.log("errors", validationErrors);
        }
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

    const validateForm2 = () => {
        const newErrors = {};
        if (!selectedProjector) {
            newErrors.projector = "Select a projector";
        }
        if (!selectedPlace) {
            newErrors.date = "Select a Place";
        }
        return newErrors;
    };

    const validateForm1 = () => {
        const newErrors = {};
        if (!startDate) {
            newErrors.date = "Start date is required.";
        }
        if (!endDate) {
            newErrors.date = "End date is required.";
        }
        if (new Date(startDate) <= nowDate) {
            newErrors.date = "Start date must be in the future.";
        }
        if (new Date(endDate) <= new Date(startDate)) {
            newErrors.date = "The end date must be later than the start date.";
        }
        return newErrors;
    };

    const getAvailableProjectorsSearch = async () => {
        try {
            const projectorsFetched =
                await fetchAvailableExhibitorProjectorsSearch(
                    state.userToken,
                    startDate,
                    endDate
                );
            const formattedOptions = projectorsFetched.map((item) => ({
                value: item.id,
                label: `${item.brand} ${item.model}`,
            }));
            setProjectors(formattedOptions);
            setSelectedProjector(formattedOptions[0]?.value);
        } catch (error) {
            console.error("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const getPlacesMine = async () => {
        try {
            const placesFetched = await fetchExhibitorPlacesMine(
                state.userToken
            );
            const formattedOptions = placesFetched.map((item) => ({
                value: item.id, // Adjust 'id' according to your data properties
                label: item.name, // Adjust 'name' according to your data properties
            }));
            setPlaces(formattedOptions);
            setSelectedPlace(formattedOptions[0]?.value);
            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    const save = async () => {
        setLoading(true);
        console.log("selectedPlace", selectedPlace);
        console.log("selectedProjector", selectedProjector);
        const rentalData = {
            placeId: selectedPlace.value,
            projectorId: selectedProjector.value,
            startDate: startDate,
            endDate: endDate,
        };
        const jsonRentalData = JSON.stringify(rentalData);
        try {
            await postExhibitorRentalAgreements(
                state.userToken,
                jsonRentalData
            );
            navigation.navigate("RentalAgreements");
        } catch (error) {
            console.error("Error posting the new Rental Agreement:", error);
        }
        setLoading(false);
    };

    return (
        <ScrollView style={addRentalAgreementStyle.container}>
            <ContentViewComp>
                {currentStep == 1 && (
                    <View>
                        <LabelDatePickerComp
                            label={"Select Duration: *"}
                            selected={startDate}
                            onChange={onChangeDates}
                            startDate={startDate}
                            endDate={endDate}
                            minDate={nowDate}
                            selectsRange
                            inline
                        />
                        {errors.datepicker && (
                            <InvalidTextComp text={errors.datepicker} />
                        )}
                    </View>
                )}
                {currentStep == 2 && (
                    <View>
                        <LabelDatePickerComp
                            label={"Selected Duration"}
                            selected={startDate}
                            startDate={startDate}
                            endDate={endDate}
                            minDate={nowDate}
                            selectsRange
                            inline
                        />
                        <View>
                            <LabelSelectComp
                                label={"Select Projector: *"}
                                value={selectedProjector}
                                onChange={onChangeSelectProjector}
                                options={projectors}
                            />
                            {errors.projector && (
                                <InvalidTextComp text={errors.projector} />
                            )}
                        </View>
                        <View>
                            <LabelSelectComp
                                label={"Select Location: *"}
                                value={selectedPlace}
                                onChange={onChangeSelectPlace}
                                options={places}
                            />
                            {errors.place && (
                                <InvalidTextComp text={errors.place} />
                            )}
                        </View>
                    </View>
                )}
                {currentStep == 3 && (
                    <ContentViewComp>
                        <Text style={addRentalAgreementStyle.title}>
                            Rental Agreement
                        </Text>
                        <View
                            style={addRentalAgreementStyle.paragraphContainer}
                        >
                            <Text style={addRentalAgreementStyle.text}>
                                This Rental Agreement ("Agreement") is entered
                                into between ArtSy(nc), hereinafter referred to
                                as the "Provider," and the undersigned
                                individual or entity, hereinafter referred to as
                                the "Renter," for the rental of a projector (the
                                "Equipment") as described below:
                            </Text>
                        </View>
                        <View
                            style={addRentalAgreementStyle.paragraphContainer}
                        >
                            <Text style={addRentalAgreementStyle.subTitle}>
                                1. Rental Period:
                            </Text>
                            <Text style={addRentalAgreementStyle.text}>
                                The rental period shall begin on{" "}
                                {startDate.toDateString()} and end on{" "}
                                {endDate.toDateString()}, unless otherwise
                                agreed upon in writing by both parties.
                            </Text>
                        </View>
                        <View
                            style={addRentalAgreementStyle.paragraphContainer}
                        >
                            <Text style={addRentalAgreementStyle.subTitle}>
                                2. Rental Fees:
                            </Text>
                            <Text style={addRentalAgreementStyle.text}>
                                The Renter agrees to pay the Provider the
                                agreed-upon rental fee of [amount] for the
                                specified rental period. Payment shall be made
                                in full prior to the commencement of the rental
                                period
                            </Text>
                        </View>
                        <View
                            style={addRentalAgreementStyle.paragraphContainer}
                        >
                            <Text style={addRentalAgreementStyle.subTitle}>
                                3. Use of Equipment:
                            </Text>
                            <Text style={addRentalAgreementStyle.text}>
                                The Equipment shall be used solely for the
                                purpose of projecting digital art. The Renter
                                agrees not to use the Equipment for any unlawful
                                or unauthorized purpose, nor to modify, alter,
                                or tamper with the Equipment in any way.
                            </Text>
                        </View>
                        <View
                            style={addRentalAgreementStyle.paragraphContainer}
                        >
                            <Text style={addRentalAgreementStyle.subTitle}>
                                4. Care and Maintenance:
                            </Text>
                            <Text style={addRentalAgreementStyle.text}>
                                The Renter agrees to exercise reasonable care in
                                the use and handling of the Equipment and to
                                return it to the Provider in the same condition
                                as received, ordinary wear and tear excepted.
                                Any damage to the Equipment beyond ordinary wear
                                and tear shall be the responsibility of the
                                Renter and may result in additional charges.
                            </Text>
                        </View>
                        <View
                            style={addRentalAgreementStyle.paragraphContainer}
                        >
                            <Text style={addRentalAgreementStyle.subTitle}>
                                5. Liability:
                            </Text>
                            <Text style={addRentalAgreementStyle.text}>
                                The Renter assumes all risk and liability for
                                the use of the Equipment and agrees to indemnify
                                and hold harmless the Provider from any and all
                                claims, damages, losses, or expenses arising out
                                of or related to the Renter's use of the
                                Equipment.
                            </Text>
                        </View>
                        <View
                            style={addRentalAgreementStyle.paragraphContainer}
                        >
                            <Text style={addRentalAgreementStyle.subTitle}>
                                6. Cancellation Policy:
                            </Text>
                            <Text style={addRentalAgreementStyle.text}>
                                Any cancellations or changes to the rental
                                agreement must be made in writing and agreed
                                upon by both parties at least 3 days prior to
                                the start of the rental period. Failure to
                                provide adequate notice may result in forfeiture
                                of the rental fee.
                            </Text>
                        </View>
                        <View
                            style={addRentalAgreementStyle.paragraphContainer}
                        >
                            <Text style={addRentalAgreementStyle.text}>
                                By Agreeing below, the parties acknowledge that
                                they have read and understood the terms and
                                conditions of this Agreement and agree to be
                                bound by them.
                            </Text>
                        </View>
                    </ContentViewComp>
                )}
                <ButtonComp
                    text={currentStep < totalSteps ? "Next" : "I Agree"}
                    disabled={loading}
                    onPress={handleNextStep}
                />

                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </ContentViewComp>
        </ScrollView>
    );
};

export default AddRentalAgreementScreen;
