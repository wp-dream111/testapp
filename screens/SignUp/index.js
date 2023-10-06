import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmailPassword from './EmailPassword';
import Name from './Name';
import Phone from './Phone';
import Loading from './Loading';

const Tab = createBottomTabNavigator();

const SignUp = ({ navigation }) => {
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
      <Tab.Screen name="CreateLoading" component={Loading} />
    </Tab.Navigator>
  );
};

export default SignUp;
