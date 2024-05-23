import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import LabelTextInputComp from "../../components/labeltextinputcomp/LabelTextInputComp";
import {
    fetchAdminPlacesExhibitor,
    fetchAdminAvailableExhibitorProjectorsSearchWithCurrent,
    putAdminRentalAgreements,
} from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import InvalidTextComp from "../../components/invalidtextcomp/InvalidTextComp";
import Select from "react-select";
import LabelComp from "../../components/labelcomp/LabelComp";
import { editRentalAgreementStyle } from "./EditRentalAgreementStyle";
import "react-datepicker/dist/react-datepicker.css";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";
import LabelDatePickerComp from "../../components/labeldatepickercomp/LabelDatePickerComp";
import LabelSelectComp from "../../components/labelselectcomp/LabelSelectComp";

//toDo logic flaw with projectors
const EditRentalAgreementScreen = ({ route }) => {
    const { state } = useAuth();
    const { rentalagreement } = route.params;
    const [errors, setErrors] = useState({});
    const initialStartDate = new Date(rentalagreement.startDate);
    const initialEndDate = new Date(rentalagreement.endDate);
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);
    const [projectors, setProjectors] = useState([]);
    const [selectedProjector, setSelectedProjector] = useState(null);
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    console.log("rentalAgreement", rentalagreement);
    /*useEffect(() => {
        const fetchInitialData = async () => {
            await getAdminAvailableProjectorsSearchWithCurrent(
                initialStartDate,
                initialEndDate
            );
            await getAdminPlacesExhibitor();
            setLoading(false);
        };
        fetchInitialData();
    }, [initialEndDate]);*/

    useEffect(() => {
        getAdminAvailableProjectorsSearchWithCurrent(
            initialStartDate,
            initialEndDate
        );
        getAdminPlacesExhibitor();
    }, []);

    const getAdminAvailableProjectorsSearchWithCurrent = async (start, end) => {
        try {
            const projectorsFetched =
                await fetchAdminAvailableExhibitorProjectorsSearchWithCurrent(
                    state.userToken,
                    rentalagreement.id,
                    start,
                    end
                );
            const formattedOptions = projectorsFetched.map((item) => ({
                value: item.id,
                label: `${item.brand} ${item.model}`,
            }));
            console.log("formatted projectors:", formattedOptions);
            setProjectors(formattedOptions);
            const selectedProjector = formattedOptions.find(
                (option) => option.value === rentalagreement.projector.id
            );
            if (selectedProjector) {
                setSelectedProjector(selectedProjector);
            } else {
                setSelectedProjector(null);
            }
        } catch (error) {
            console.error("Error fetching projectors: " + error.message);
        }
    };

    const getAdminPlacesExhibitor = async () => {
        try {
            const placesFetched = await fetchAdminPlacesExhibitor(
                state.userToken,
                rentalagreement.id
            );
            const formattedOptions = placesFetched.map((item) => ({
                value: item.id,
                label: item.name,
            }));
            setPlaces(formattedOptions);
            const selectedPlace = formattedOptions.find(
                (option) => option.value === rentalagreement.place.id
            );
            setSelectedPlace(selectedPlace);
        } catch (error) {
            console.error("Error fetching places: " + error.message);
        }
    };

    const onChangeDates = (dates) => {
        console.log("dates: ", dates);
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (start && end) {
            getAdminAvailableProjectorsSearchWithCurrent(start, end);
        }
    };

    const onChangeSelectProjector = (selectedProjector) => {
        setSelectedProjector(selectedProjector);
    };

    const onChangeSelectPlace = (selectedPlace) => {
        setSelectedPlace(selectedPlace);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!selectedProjector) {
            newErrors.projector = "Select a projector";
        }
        if (!selectedPlace) {
            newErrors.date = "Select a Place";
        }
        return newErrors;
    };

    const save = async () => {
        setLoading(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const rentalData = {
                placeId: selectedPlace.value,
                projectorId: selectedProjector.value,
                startDate: startDate,
                endDate: endDate,
            };
            const jsonRentalData = JSON.stringify(rentalData);
            try {
                await putAdminRentalAgreements(
                    state.userToken,
                    rentalagreement.id,
                    jsonRentalData
                );
                navigation.navigate("RentalAgreements");
            } catch (error) {
                console.error("Error posting the new Rental Agreement:", error);
            }
        } else {
            setErrors(validationErrors);
        }
        setLoading(false);
    };

    return (
        <ScrollView style={editRentalAgreementStyle.container}>
            <ContentViewComp>
                <View>
                    <LabelDatePickerComp
                        label={"Select Duration: *"}
                        selected={startDate}
                        onChange={onChangeDates}
                        startDate={startDate}
                        endDate={endDate}
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
                <ButtonComp text="Edit" disabled={loading} onPress={save} />

                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </ContentViewComp>
        </ScrollView>
    );
};

export default EditRentalAgreementScreen;
