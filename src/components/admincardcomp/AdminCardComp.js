import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { adminCardStyle } from "./AdminCardStyle";

const AdminCardComp = ({ item, onPress }) => {
    return (
        <View style={adminCardStyle.cardContainer}>
            <TouchableOpacity onPress={onPress}>
                <View style={adminCardStyle.imageContainer}>
                    <Image
                        source={
                            item.imageData
                                ? {
                                      uri:
                                          "data:" +
                                          item.mimeTypeImageData +
                                          ";base64," +
                                          item.imageData,
                                  }
                                : require("../../data/images/anonymous-person.jpg")
                        }
                        style={adminCardStyle.image}
                    />
                </View>
                <View style={adminCardStyle.textContainer}>
                    <Text style={adminCardStyle.title}>
                        {item.firstName} {item.lastName}
                    </Text>
                    <Text style={adminCardStyle.text}>{item.email}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default AdminCardComp;
