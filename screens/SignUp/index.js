import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmailPassword from './EmailPassword';
import Name from './Name';
import Phone from './Phone';

const Tab = createBottomTabNavigator();

const SignUp = () => {
  return (
    <Tab.Navigator
      tabBar={() => null}
      screenOptions={() => ({
        headerShown: false,
      })}
      initialRouteName='EmailPassword'
    >
      <Tab.Screen name="EmailPassword" component={EmailPassword} />
      <Tab.Screen name="Name" component={Name} />
      <Tab.Screen name="Phone" component={Phone} />
    </Tab.Navigator>
  );
};

export default SignUp;
