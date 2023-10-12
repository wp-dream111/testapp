import React from 'react';
import { useSelector } from 'react-redux';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, icons } from '../constants';
import { Home, Flights } from '../screens';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const bookingState = useSelector(state => state.booking);

  return (
    <Tab.Navigator
      tabBar={({ state, descriptors, navigation }) => bookingState.isDetail ? null : (
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
              >
                {options.tabBarIcon({ focused: isFocused, color: COLORS.lightWhite })}
                {options.tabBarLabel({ focused: isFocused, children: route.name, color: COLORS.lightGray })}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: [
          {
            height: '12%',
            backgroundColor: COLORS.darkGray,
          },
          null
        ],
        tabBarLabel: ({ focused, children, color }) => (
          <Text style={{ ...styles.tabBarLabel, color: focused ? COLORS.white : color }}>{children}</Text>
        ),
        tabBarIcon: ({ focused, color }) => {
          const tintColor = focused ? COLORS.white : color;
          switch (route.name) {
            case 'Home':
              return (
                <View style={styles.iconWrap}>
                  <Image
                    source={icons.orange_dot}
                    resizeMode="contain"
                    style={{ opacity: focused ? 1 : 0 }}
                  />
                  <Image
                    source={icons.tunnel}
                    resizeMode="contain"
                    style={{ tintColor: tintColor, width: 30, height: 30 }}
                  />
                </View>
              );
            case 'Hotels':
              return (
                <View style={styles.iconWrap}>
                  <Image
                    source={icons.orange_dot}
                    resizeMode="contain"
                    style={{ opacity: focused ? 1 : 0 }}
                  />
                  <Image
                    source={icons.hotel}
                    resizeMode="contain"
                    style={{ tintColor: tintColor, width: 30, height: 31 }}
                  />
                </View>
              );
            case 'Flights':
              return (
                <View style={styles.iconWrap}>
                  <Image
                    source={icons.orange_dot}
                    resizeMode="contain"
                    style={{ opacity: focused ? 1 : 0 }}
                  />
                  <Image
                    source={icons.flights}
                    resizeMode="contain"
                    style={{ tintColor: tintColor, width: 25, height: 32 }}
                  />
                </View>
              );
            case 'Account':
              return (
                <View style={styles.iconWrap}>
                  <Image
                    source={icons.orange_dot}
                    resizeMode="contain"
                    style={{ opacity: focused ? 1 : 0 }}
                  />
                  <Image
                    source={icons.account}
                    resizeMode="contain"
                    style={{ tintColor: tintColor, width: 29, height: 29 }}
                  />
                </View>
              );
          }
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Hotels" component={Home} />
      <Tab.Screen name="Flights" component={Flights} />
      <Tab.Screen name="Account" component={Home} />
    </Tab.Navigator >
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.darkGray,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
  },
  tabBarLabel: {
    fontSize: 10,
    textAlign: 'center',
    paddingTop: 4,
  },
  iconWrap: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  }
})

export default Tabs;
