import { Image, View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES, images, FONTS } from '../constants';

const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={images.onBoardingImage} style={styles.background} />
      <View style={styles.content}>
        <View style={{ gap: SIZES.base }}>
          <Text style={{ ...FONTS.body1, color: COLORS.white }}>Welcome to Tunnel.</Text>
          <Text style={{ ...FONTS.body2, color: COLORS.white }}>Luxury experiences,</Text>
          <Text style={{ ...FONTS.body2, color: COLORS.white }}>accessible.</Text>
        </View>
        <View style={{ gap: 16 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[styles.buttonWrap, { backgroundColor: COLORS.white }]}
          >
            <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={styles.buttonWrap}
          >
            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 60,
    paddingLeft: 22,
    paddingRight: 22,
    gap: 25,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  background: {
    position: 'absolute',
    zIndex: -1,
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  buttonWrap: {
    width: '100%',
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#ffffff',
    borderWidth: 1,
  },
});
export default Welcome;
