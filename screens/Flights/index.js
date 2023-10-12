import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InputData from './InputData';
import SelectFlight from './SelectFlight';
import Loading from '../Loading';

const Tab = createBottomTabNavigator();

const Flights = () => {
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
      <Tab.Screen name="FlightLoading" component={Loading} />
    </Tab.Navigator>
  );
};

export default Flights;
