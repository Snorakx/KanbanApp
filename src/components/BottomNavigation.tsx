import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import TodoListScreen from '../screens/TodoList';
import InProgressList from '../screens/InProgressList';
import DoneList from '../screens/DoneList';



const Tab = createBottomTabNavigator();

const BottomTabs: FC = () => {

    return (
        <Tab.Navigator
            initialRouteName="TodoList"
            tabBarOptions={{
                activeTintColor: 'grey',
                inactiveTintColor: 'white',
                labelStyle: {
                    fontSize: 12,
                },
                style: {
                    backgroundColor: 'black',
                },
            }}

        >

            <Tab.Screen
                name="TodoList"
                component={TodoListScreen}
                options={{
                    tabBarLabel: 'Todo',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-text-outline" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="InProgressList"
                component={InProgressList}
                options={{
                    tabBarLabel: 'InProgress',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="arrow-right-circle" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="DoneList"
                component={DoneList}
                options={{
                    tabBarLabel: 'Done',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="check-outline" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;