import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { rentalAgreementCardStyle } from "./RentalAgreementCardStyle";

const RentalAgreementCardComp = ({ item, onPress }) => {
    return (
        <View style={rentalAgreementCardStyle.cardContainer}>
            <TouchableOpacity onPress={onPress}>
                <View style={rentalAgreementCardStyle.textContainer}>
                    <Text style={rentalAgreementCardStyle.title}>
                        {item.place.name}
                    </Text>
                    <Text style={rentalAgreementCardStyle.title}>
                        {item.projector.brand} {item.projector.model}
                    </Text>
                    <Text style={rentalAgreementCardStyle.text}>
                        {new Date(item.startDate).toDateString()} until{" "}
                        {new Date(item.endDate).toDateString()}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default RentalAgreementCardComp;
