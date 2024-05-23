import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { projectorCardStyle } from "./ProjectorCardStyle";
import PlayPauseComp from "../playpausecomp/PlayPauseComp";

const ProjectorCardComp = ({
    item,
    onPress,
    showExtraButtons,
    isPlaying,
    onPressStartStop,
}) => {
    return (
        <View style={projectorCardStyle.cardContainer}>
            <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                <View style={projectorCardStyle.textContainer}>
                    <Text style={projectorCardStyle.title}>
                        {item.brand} {item.model}
                    </Text>
                    <Text style={projectorCardStyle.text}>
                        {item.serialNumber}
                    </Text>
                    {item.expositionId && (
                        <Text style={projectorCardStyle.text}>
                            Exposition ID: {item.expositionId}
                        </Text>
                    )}
                    {item.damages && (
                        <Text style={projectorCardStyle.textBad}>
                            Damages: {item.damages}
                        </Text>
                    )}
                    {item.remarks && (
                        <Text style={projectorCardStyle.textBad}>
                            Remarks: {item.remarks}
                        </Text>
                    )}
                    <Text style={projectorCardStyle.text}>
                        {item.available ? "Available" : "Not Available"}
                    </Text>
                </View>
            </TouchableOpacity>
            {showExtraButtons && (
                <View style={projectorCardStyle.extraButtonsContainer}>
                    <PlayPauseComp
                        isPlaying={isPlaying}
                        onToggle={onPressStartStop}
                    />
                </View>
            )}
        </View>
    );
};

export default ProjectorCardComp;
