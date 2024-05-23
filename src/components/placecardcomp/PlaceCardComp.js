import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { placeCardStyle } from "./PlaceCardStyle";

//toDo make sure description doesnt get out of box
const PlaceCardComp = ({ item, onPress }) => {
    return (
        <View style={placeCardStyle.cardContainer}>
            <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                <View style={placeCardStyle.textContainer}>
                    <Text style={placeCardStyle.nameText}>{item.name}</Text>
                    <Text style={placeCardStyle.text}>{item.description}</Text>
                    <Text style={placeCardStyle.text}>{item.address}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default PlaceCardComp;
