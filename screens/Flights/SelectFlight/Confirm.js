import { Animated, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, FONTS, SIZES, images, icons } from '../../../constants';

const Confirm = ({ departingFlight, returningFlight, isSelectedCancel, handlePay, handleCancel }) => {
  const slideUpAnim = new Animated.Value(0);

  useEffect(() => {
    animateComponent();
  }, []);

  const animateComponent = () => {
    Animated.timing(slideUpAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const translateY = slideUpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dy > 5;
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 50) {
        swipeDownComponent();
        setTimeout(() => {
          handleCancel();
        }, 500);
      }
    },
  })

  const swipeDownComponent = () => {
    Animated.timing(slideUpAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: slideUpAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          },
        ],
      }}
    >
      <View style={styles.container} {...panResponder.panHandlers}>
        <Text style={styles.description}>Here is a summary of your flight details.</Text>
        <Animated.View style={{ transform: [{ translateY }] }}>
          <View style={styles.card}>
            <View style={styles.type}>
              <Text style={styles.typeText}>Depature</Text>
              {isSelectedCancel ? <Text style={styles.cancelBadge}><Image source={icons.circle_done} style={{ width: 8, height: 8 }} />  Peace of Mind</Text> : null}
            </View>
            <View style={styles.row}>
              <View style={{ gap: 6 }}>
                <Text style={styles.label}>Airline</Text>
                <View style={styles.airline}>
                  <Image source={icons[departingFlight.icon]} />
                  <Text style={styles.cardText}>{departingFlight.airline}</Text>
                </View>
              </View>
              <View style={{ gap: 6 }}>
                <Text style={[styles.label, { textAlign: 'right' }]}>Date</Text>
                <Text style={styles.cardText}>Wednesday, Sep 23</Text>
              </View>
            </View>
            <View style={[styles.row, { paddingBottom: 16 }]}>
              <View style={{ gap: 6 }}>
                <Text style={styles.label}>Destination</Text>
                <Text style={styles.cardText}>{departingFlight.destination}</Text>
              </View>
              <View style={{ gap: 6 }}>
                <Text style={[styles.label, { textAlign: 'right' }]}>Time</Text>
                <Text style={styles.cardText}>{departingFlight.time}</Text>
              </View>
            </View>
            <View style={{ paddingTop: 15, paddingBottom: 15, borderColor: COLORS.white, borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0 }}>
              <View style={styles.type}>
                <Text style={styles.typeText}>Return</Text>
                {isSelectedCancel ? <Text style={styles.cancelBadge}><Image source={icons.circle_done} style={{ height: 8, width: 8 }} />  Peace of Mind</Text> : null}
              </View>
              <View style={styles.row}>
                <View style={{ gap: 6 }}>
                  <Text style={styles.label}>Airline</Text>
                  <View style={styles.airline}>
                    <Image source={icons[returningFlight.icon]} />
                    <Text style={styles.cardText}>{returningFlight.airline}</Text>
                  </View>
                </View>
                <View style={{ gap: 6 }}>
                  <Text style={[styles.label, { textAlign: 'right' }]}>Date</Text>
                  <Text style={styles.cardText}>Thursday, Oct 5</Text>
                </View>
              </View>
            </View>
            <View style={[styles.row, { paddingBottom: 16 }]}>
              <View style={{ gap: 6 }}>
                <Text style={styles.label}>Destination</Text>
                <Text style={styles.cardText}>{returningFlight.destination}</Text>
              </View>
              <View style={{ gap: 6 }}>
                <Text style={[styles.label, { textAlign: 'right' }]}>Time</Text>
                <Text style={styles.cardText}>{returningFlight.time}</Text>
              </View>
            </View>
            <View style={[styles.optionCard]}>
              <Text style={styles.priceText}>Total - Round Trip</Text>
              <Text style={styles.priceText}>$2,653</Text>
            </View>
            <TouchableOpacity style={styles.selectButton} onPress={handlePay}>
              <Text style={styles.buttonText}>Continue with <Image source={images.apple_pay} /></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectButton} onPress={handlePay}>
              <Text style={styles.buttonText}>Pay with Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.selectButton, { backgroundColor: COLORS.primary }]} onPress={handlePay}>
              <Text style={styles.buttonText}>Use Points <Image source={images.chase} /></Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
    gap: 45,
  },
  description: {
    color: COLORS.white,
    ...FONTS.body4,
    paddingTop: 22,
    paddingLeft: 30,
    paddingRight: 30,
  },
  card: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderColor: '#f3f3f3',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 35,
    paddingLeft: 20,
    paddingRight: 20,
    height: SIZES.height - 185,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  text: {
    color: COLORS.white,
    ...FONTS.body5,
  },
  type: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeText: {
    color: COLORS.black,
    ...FONTS.body3,
  },
  cancelBadge: {
    height: 18,
    paddingTop: 3,
    paddingRight: 11,
    paddingLeft: 11,
    borderWidth: 0.5,
    borderColor: COLORS.sand,
    borderRadius: SIZES.body1,
    backgroundColor: COLORS.earlyDawn,
    fontSize: SIZES.base,
    color: COLORS.black,
  },
  cardText: {
    color: COLORS.black,
    ...FONTS.body5,
  },
  priceText: {
    color: COLORS.blueberry,
    fontSize: SIZES.font,
    textAlign: 'right',
  },
  label: {
    color: COLORS.lightWhite,
    fontSize: SIZES.radius,
  },
  airline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  selectButton: {
    backgroundColor: COLORS.black,
    height: 37,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  buttonText: {
    ...FONTS.body4,
    color: COLORS.white,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 16,
  },
  radio: {
    width: 14,
    height: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  selected: {
    backgroundColor: 'blue',
  },
  optionCard: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: COLORS.lighterWhite,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 16,
  }
});
export default Confirm;
