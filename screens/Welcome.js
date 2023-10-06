import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { COLORS, SIZES, images, FONTS } from '../constants';

const Welcome = ({ navigation }) => {
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
                ...FONTS.body2,
              }}>
              Luxury experiences,
            </Text>
            <Text
              style={{
                color: COLORS.white,
                marginTop: SIZES.base,
                ...FONTS.body2,
              }}>
              accessible.
            </Text>
          </View>
          <View style={{ gap: 16, paddingTop: 25 }}>
            <TouchableOpacity
              onPress={() => { }}
              style={[
                styles.shadow,
                {
                  width: '100%',
                  height: 43,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                },
              ]}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  backgroundColor: COLORS.white,
                }}
              >
                <Text style={{ color: COLORS.black, ...FONTS.h3 }}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={[
                styles.shadow,
                {
                  width: '100%',
                  height: 43,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                },
              ]}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  borderColor: '#ffffff',
                  borderWidth: 1,
                }}
              >
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>
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
export default Welcome;
