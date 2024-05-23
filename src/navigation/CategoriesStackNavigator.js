import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import CategoriesScreen from "../screens/categoriesscreen/CategoriesScreen";
import AddCategoryScreen from "../screens/addcategoryscreen/AddCategoryScreen";
import EditCategoryScreen from "../screens/editcategoryscreen/EditCategoryScreen";
import { APP_TITLE } from "../constants";
import HeaderComp from "../components/headercomp/HeaderComp";
import defaultScreenOptions from "./config/screenOptions";

const Stack = createStackNavigator();

const CategoriesStackNavigator = () => {
    const navigation = useNavigation();

    return (
        <Stack.Navigator
            initialRouteName="Categories"
            screenOptions={defaultScreenOptions}
        >
            <Stack.Screen
                options={{
                    headerTitle: "Categories",
                }}
                name="Categories"
                component={CategoriesScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Add Category",
                }}
                name="AddCategory"
                component={AddCategoryScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Edit Category",
                }}
                name="EditCategory"
                component={EditCategoryScreen}
            />
        </Stack.Navigator>
    );
};

export default CategoriesStackNavigator;
