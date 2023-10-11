import { StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS } from '../../../constants';
import RoundTrip from './RoundTrip';
import OneWay from './OneWay';

const InputData = ({ navigation }) => {
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
      activeColor={'white'}
      inactiveColor={'gray'}
      indicatorStyle={{ backgroundColor: COLORS.lightWhite }}
      style={styles.tabBar}
      labelStyle={{ textTransform: 'capitalize' }}
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
        style={{ marginLeft: 30, marginRight: 30 }}
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
  }
});
export default InputData;