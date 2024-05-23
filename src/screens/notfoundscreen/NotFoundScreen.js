import React from "react";
import { View, Text, ScrollView } from "react-native";
import { notFoundStyle } from "./HomeStyle";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const HomeScreen = () => {
    return (
        <View style={notFoundStyle.container}>
            <ContentViewComp>
                <Text>404</Text>
            </ContentViewComp>
        </View>
    );
};

export default HomeScreen;
