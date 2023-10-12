import { Text, TouchableOpacity, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS, FONTS, SIZES } from '../../../constants';
import RoundTrip from './RoundTrip';
import OneWay from './OneWay';

const SelectFlight = ({ navigation }) => {
  const RoundComp = () => <RoundTrip navigation={navigation} />;

  const renderScene = SceneMap({
    round_trip: RoundComp,
    one_way: OneWay,
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'round_trip', title: 'Round Trip' },
    { key: 'one_way', title: 'One-Way' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      inactiveColor={COLORS.lighterGray}
      indicatorStyle={{ backgroundColor: COLORS.white, height: 1, marginBottom: -1 }}
      style={styles.tabBar}
      renderTabBarItem={({ key }) => {
        const labelText = routes.find(item => item.key === key).title;

        return (
          <TouchableOpacity activeOpacity={1} onPress={() => setIndex(routes.findIndex(item => item.key === key))}>
            <Text style={{ ...styles.labelText, color: key === routes[index].key ? COLORS.white : COLORS.lighterGray }}>{labelText}</Text>
          </TouchableOpacity>
        )
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
  tabBar: {
    backgroundColor: COLORS.darkGray,
    borderBottomColor: COLORS.lighterGray,
    borderBottomWidth: 1,
    elevation: 0,
    marginLeft: 30,
    marginRight: 30,
  },
  labelText: {
    width: (SIZES.width - 60) / 2,
    textTransform: 'capitalize',
    ...FONTS.body3,
    fontWeight: '300',
    verticalAlign: 'middle',
    paddingTop: 25,
    paddingBottom: 13,
  },
});
export default SelectFlight;