import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InputData from './InputData';
import SelectFlight from './SelectFlight';

const Tab = createBottomTabNavigator();

const Flights = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBar={() => null}
      screenOptions={() => ({
        headerShown: false,
      })}
      initialRouteName='InputData'
    >
      <Tab.Screen name="InputData" component={InputData} />
      <Tab.Screen name="SelectFlight" component={SelectFlight} />
    </Tab.Navigator>
  );
};

export default Flights;
