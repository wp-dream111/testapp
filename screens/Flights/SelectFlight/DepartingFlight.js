import { Animated, Image, PanResponder,ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, SIZES, images, icons } from '../../../constants';

const RadioButton = ({ selected, onSelect }) => {
  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onSelect}>
      {selected ? <Image source={icons.circle_done} style={{ height: 16, width: 16 }} /> : <View style={[styles.radio]} />}
    </TouchableOpacity>
  );
};

const DepartingFlight = ({ flight, handleSelectDepartingFlight, handleCancel }) => {
  const [isSelectOption, setIsSelectOption] = useState(false);
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
        <Text style={styles.title}>Departing Flight Details</Text>
        <Animated.View style={{ transform: [{ translateY }] }}>
          <ScrollView style={styles.card}>
            <Image source={images[flight.logo]} />
            <View style={[styles.row, { paddingTop: 36 }]}>
              <View style={{ gap: 6 }}>
                <Text style={styles.label}>Airline</Text>
                <View style={styles.airline}>
                  <Image source={icons[flight.icon]} />
                  <Text style={styles.cardText}>{flight.airline}</Text>
                </View>
              </View>
              <View style={{ gap: 6 }}>
                <Text style={[styles.label, { textAlign: 'right' }]}>Date</Text>
                <Text style={styles.cardText}>9/23/23</Text>
              </View>
            </View>
            <View style={[styles.row, { paddingTop: 16, paddingBottom: 16 }]}>
              <View style={{ gap: 6 }}>
                <Text style={styles.label}>Destination</Text>
                <Text style={styles.cardText}>{flight.destination}</Text>
              </View>
              <View style={{ gap: 6 }}>
                <Text style={[styles.label, { textAlign: 'right' }]}>Time</Text>
                <Text style={styles.cardText}>{flight.time}</Text>
              </View>
            </View>
            <View style={{ borderColor: COLORS.white, borderLeftWidth: 0, borderRightWidth: 0, borderWidth: 1 }}>
              <View style={[styles.row, { paddingTop: 16 }]}>
                <View style={{ gap: 6 }}>
                  <Text style={styles.label}>Current Cabin</Text>
                  <Text style={styles.cardText}>Economy</Text>
                </View>
                <View style={{ gap: 6 }}>
                  <Text style={[styles.label, { textAlign: 'right' }]}>Travelers</Text>
                  <Text style={styles.cardText}>2 Adults</Text>
                </View>
              </View>
              <View style={[styles.row, { alignItems: 'flex-end', paddingTop: 16, paddingBottom: 16 }]}>
                <View style={{ gap: 6 }}>
                  <Text style={styles.label}>Check-In Luggages</Text>
                  <Text style={styles.cardText}>3 Checkins</Text>
                </View>
                <Text style={styles.priceText}>{flight.price}</Text>
              </View>
            </View>
            <View style={[styles.optionCard, { borderColor: isSelectOption ? COLORS.black : COLORS.lightWhite }]}>
              <Image source={images.golden_flower} />
              <View>
                <Text style={{ color: COLORS.black, ...FONTS.body4 }}>Peace of Mind Cancellation - $65</Text>
                <Text style={{ color: COLORS.black, marginVertical: 2, fontSize: SIZES.radius }}>•  Cancel up to 24 hours before depature</Text>
                <Text style={{ color: COLORS.black, marginVertical: 2, fontSize: SIZES.radius }}>•  Guarantee a refund of $1320</Text>
                <Text style={{ color: COLORS.black, marginVertical: 2, fontSize: SIZES.radius }}>•  No questions asked</Text>
              </View>
              <RadioButton
                selected={isSelectOption}
                onSelect={() => setIsSelectOption(!isSelectOption)}
              />
            </View>
            <TouchableOpacity style={styles.selectButton} onPress={() => handleSelectDepartingFlight(isSelectOption)}>
              <Text style={styles.buttonText}>Select Return Flight</Text>
            </TouchableOpacity>
          </ScrollView>
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
  title: {
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
  },
  text: {
    color: COLORS.white,
    ...FONTS.body5,
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
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 16,
  }
});
export default DepartingFlight;
