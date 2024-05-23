import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { playPauseStyle } from "./PlayPauseStyle";

const PlayPauseComp = ({ isPlaying, onToggle }) => {
    return (
        <TouchableOpacity style={playPauseStyle.button} onPress={onToggle}>
            <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={30}
                color={"#11224D"}
            />
        </TouchableOpacity>
    );
};

export default PlayPauseComp;
