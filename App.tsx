import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
//Screens
import { Welcome, DestinationDetail } from './screens';
//tabs
import Tabs from './navigation/tabs';
import { SIZES, COLORS, icons } from './constants';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName={'Welcome'}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DestinationDetail"
          component={DestinationDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerLeft: ({ onPress }) => (
              <TouchableOpacity
                style={{ marginLeft: SIZES.padding }}
                onPress={onPress}>
                <Image
                  source={icons.back}
                  resizeMode="contain"
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: SIZES.padding }}
                onPress={() => console.log('Menu')}>
                <Image
                  source={icons.menu}
                  resizeMode="contain"
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return <App />;
};
