import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { categoryCardStyle } from "./CategoryCardStyle";

//toDo make sure description doesnt get out of box
const CategoryCardComp = ({ item, onPress }) => {
    return (
        <View style={categoryCardStyle.cardContainer}>
            <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                <View style={categoryCardStyle.textContainer}>
                    <Text style={categoryCardStyle.title}>{item.name}</Text>
                    <Text style={categoryCardStyle.text}>
                        {item.description}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CategoryCardComp;
