import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, SafeAreaView, Animated } from 'react-native';
import React, { useState } from 'react';
import { COLORS, images, SIZES, icons, FONTS } from '../constants';

const AnimatedButton = ({ onPress, text, translateY }) => {
  return (
    <Animated.View style={[styles.animatedButton, { transform: [{ translateY }] }]}>
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{text}</Text>
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
      <Image source={images.homeround} style={{ position: 'absolute', zIndex: -1, resizeMode: 'stretch', width: '100%', height: '100%' }} />
      <View style={styles.title}>
        <Text style={styles.text}>Good evening, Martin</Text>
        <Text style={styles.text}>0 points</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 25, paddingLeft: 23, paddingRight: 23 }}>
        {showButtons && (
          <>
            <AnimatedButton
              onPress={() => navigation.navigate("Flights")}
              text="View Flights"
              translateY={animation}
            />
            <AnimatedButton
              onPress={() => navigation.navigate("Hotels")}
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
              borderWidth: showButtons ? 1 : 0,
              borderColor: COLORS.white,
            },
          ]}>
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: showButtons ? 'transparent' : '#fff'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: showButtons ? COLORS.white : COLORS.black, ...FONTS.body4, height: 37, verticalAlign: 'middle' }}>Book an Experience </Text>
              <Image
                source={icons.arrow}
                resizeMode="contain"
                style={{ position: 'absolute', marginLeft: '50%', transform: showButtons ? [{ scaleY: -1 }] : [{ scaleY: 1 }], tintColor: showButtons ? COLORS.white : COLORS.black }} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
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
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    paddingTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  text: {
    ...FONTS.body3,
    color: COLORS.white,
  },
  buttonText: {
    color: 'black',
    fontSize: SIZES.body4,
  },
  animatedButton: {
    alignItems: 'center',
  }
});
export default Home;