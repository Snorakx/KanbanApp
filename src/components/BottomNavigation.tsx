import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import HomeScreen from "../screens/Home";
import FormTodo from "../screens/FormTodo";

const Tab = createBottomTabNavigator();

const BottomTabs: FC = () => {
  return (
    <Tab.Navigator initialRouteName="HomeScreen" tabBarOptions={{}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarVisible: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Form"
        component={FormTodo}
        options={{
          tabBarVisible: false,
          tabBarLabel: "Form",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
