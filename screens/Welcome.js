import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES, images, FONTS } from '../constants';

const OnBoarding = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.onBoardingImage}
        style={{ flex: 1, resizeMode: 'cover' }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 60, paddingLeft: 20, paddingRight: 20 }}>
          <View>
            <Text style={{ ...FONTS.body1, color: COLORS.white }}>Welcome to Tunnel.</Text>
            <Text
              style={{
                color: COLORS.white,
                marginTop: SIZES.base,
                ...FONTS.body3,
              }}>
              Luxury experiences,
            </Text>
            <Text
              style={{
                color: COLORS.white,
                marginTop: SIZES.base,
                ...FONTS.body3,
              }}>
              accessible.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={[
              styles.shadow,
              {
                marginTop: SIZES.padding * 2,
                width: '100%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
              },
            ]}>
            <LinearGradient
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
              }}
              colors={['#ffffff', '#ffffff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <Text style={{ color: COLORS.black, ...FONTS.h3 }}>Login</Text>
            </LinearGradient>
            <LinearGradient
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                borderColor: '#ffffff',
                borderWidth: 1,
              }}
              colors={['transparent', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default OnBoarding;
