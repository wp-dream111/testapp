import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
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
      <Image source={images.onBoardingImage} style={styles.background} />
      <View style={styles.title}>
        <Text style={styles.text}>Good evening, Martin</Text>
        <Text style={styles.text}>0 <Text style={{ ...styles.text, color: COLORS.lightWhite }}>points</Text></Text>
      </View>
      <View style={styles.animatedButtons}>
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
        <TouchableOpacity onPress={handleButtonPress} style={{ ...styles.buttonWrap, backgroundColor: showButtons ? 'transparent' : '#fff' }}>
          <Text style={{ ...styles.buttonText, color: showButtons ? COLORS.white : COLORS.black }}>Book an Experience </Text>
          <Image
            source={icons.arrow}
            resizeMode="contain"
            style={{ ...styles.icon, transform: showButtons ? [{ scaleY: -1 }] : [{ scaleY: 1 }], tintColor: showButtons ? COLORS.white : COLORS.black }}
          />
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
    paddingTop: 0,
    paddingBottom: 0,
    height: 37,
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
    color: COLORS.black,
    fontSize: SIZES.body4,
    verticalAlign: 'middle',
  },
  animatedButton: {
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    zIndex: -1,
    resizeMode: 'stretch',
    width: SIZES.width,
    height: SIZES.height,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    opacity: 0.5,
    bottom: 0,
  },
  animatedButtons: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 25,
    paddingLeft: 23,
    paddingRight: 23,
  },
  buttonWrap: {
    width: '100%',
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  icon: {
    position: 'absolute',
    right: 11,
  }
});
export default Home;