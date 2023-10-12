import { View, Animated, Easing, StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { COLORS, FONTS, images } from '../constants';

const Loading = () => {
  const authState = useSelector(state => state.auth);
  const spinValue = new Animated.Value(0);

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => spin());
  };

  useEffect(() => {
    spin();
  }, []);

  const spinMethod = spinValue.interpolate({
    inputRange: [0, 0.5],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>{authState.loadingTitle}</Text>
      </View>
      <Animated.Image
        source={images.loading}
        style={{ ...styles.image, transform: [{ rotateY: spinMethod }] }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 65,
  },
  text: {
    color: COLORS.white,
    marginBottom: 38,
    textAlign: 'center',
    ...FONTS.body4,
  },
});

export default Loading;
