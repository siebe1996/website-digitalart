import React from "react";
import { View, Text, ScrollView } from "react-native";
import { homeStyle } from "./HomeStyle";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";
import TitleBoxComp from "../../components/titleboxcomp/TitleBoxComp";

const HomeScreen = () => {
    return (
        <ScrollView style={homeStyle.container}>
            <ContentViewComp>
                <TitleBoxComp
                    text={"Artistic Equality by Connecting Creativity"}
                />
            </ContentViewComp>
        </ScrollView>
    );
};

export default HomeScreen;
