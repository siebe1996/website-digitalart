import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { expositionCardStyle } from "./ExpositionCardStyle";
import { Ionicons } from "@expo/vector-icons";
import PlayPauseComp from "../playpausecomp/PlayPauseComp";

const ExpositionCardComp = ({
    item,
    onPress,
    showExtraButtons,
    onPressStartStop,
    onPressView,
    isPlaying,
}) => {
    return (
        <View style={expositionCardStyle.cardContainer}>
            <TouchableOpacity onPress={onPress}>
                <View style={expositionCardStyle.textContainer}>
                    <Text style={expositionCardStyle.title}>{item.name}</Text>
                </View>
            </TouchableOpacity>
            {showExtraButtons && (
                <View style={expositionCardStyle.extraButtonsContainer}>
                    <PlayPauseComp
                        isPlaying={isPlaying}
                        onToggle={onPressStartStop}
                    />
                    <TouchableOpacity onPress={onPressView}>
                        <Ionicons name={"eye"} size={30} color={"#11224D"} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default ExpositionCardComp;
