import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Animated,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, images, SIZES, icons, FONTS } from '../constants';

const AnimatedButton = ({ onPress, text, translateY }) => {
  return (
    <Animated.View style={[styles.animatedButton, { transform: [{ translateY }] }]}>
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Text style={[styles.buttonText, { ...FONTS.h3 }]}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Home = ({ navigation }) => {
  const [animation] = useState(new Animated.Value(0));
  const [showButtons, setShowButtons] = useState(false);

  const handleButtonPress = () => {
    if (showButtons) {
      Animated.timing(animation, {
        toValue: 50,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setShowButtons(false);
      });
    } else {
      setShowButtons(true);
      Animated.timing(animation, {
        toValue: -10,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.homeround}
        style={{ flex: 1, resizeMode: 'cover', height: '100%' }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 60, paddingLeft: 20, paddingRight: 20 }}>
          {showButtons && (
            <>
              <AnimatedButton
                onPress={() => { }}
                text="View Flights"
                translateY={animation}
              />
              <AnimatedButton
                onPress={() => { }}
                text="View Hotels"
                translateY={animation}
              />
            </>
          )}
          <TouchableOpacity
            onPress={handleButtonPress}
            style={[
              {
                width: '100%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.white,
              },
            ]}>
            <LinearGradient
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              colors={showButtons ? ['transparent', 'transparent'] : ['#ffffff', '#ffffff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: showButtons ? COLORS.white : COLORS.black, ...FONTS.h3 }}>Book an Experience </Text>
                <Image
                  source={icons.arrow}
                  resizeMode="contain"
                  style={{ position: 'absolute', marginLeft: '50%', transform: showButtons ? [{ scaleY: -1 }] : [{ scaleY: 1 }], tintColor: showButtons ? COLORS.white : COLORS.black }} />
              </View>
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
    backgroundColor: COLORS.black,
    zIndex: 1,
  },
  buttonContainer: {
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: SIZES.radius,
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  animatedButton: {
    alignItems: 'center',
  }
});
export default Home;