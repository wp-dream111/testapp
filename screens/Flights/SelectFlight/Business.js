import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES, icons } from '../../../constants';

const Business = ({ handleSelectFlight }) => {
  const bookingState = useSelector(state => state.booking);
  const [opacity, setOpacity] = useState(0.5);
  const flights = [
    { time: '5:00 PM - 7:40 AM', type: '1 stop', location: 'SFO - LIS', airline: 'Iberia', icon: 'iberia_airline', logo: 'iberia', included: 'Personal Item, Carry-On', price: '$2,312' },
    { time: '10:00 PM - 9:40 AM', type: 'Nonstop', location: 'SFO - LIS', airline: 'TAP Air Portugal', icon: 'tap_airline', logo: 'tap', included: 'Personal Item, Carry-On', price: '$2,312' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 250);
  }, []);

  return (
    <View style={{ opacity: opacity }}>
      <Text style={styles.text}>These fares include more legroom, priority boarding, free snacks and beverages.</Text>
      {flights.map((flight, idx) => (
        <TouchableOpacity key={idx} activeOpacity={0.8} onPress={handleSelectFlight}>
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ gap: 6 }}>
                <Text style={styles.label}>Time</Text>
                <Text style={styles.cardText}>{flight.time}, {flight.type}</Text>
              </View>
              <View style={{ gap: 6 }}>
                <Text style={[styles.label, { textAlign: 'right' }]}>Location</Text>
                <Text style={styles.cardText}>{bookingState.origin} - {bookingState.destination}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ gap: 6 }}>
                <Text style={styles.label}>Airline</Text>
                <View style={styles.airline}>
                  <Image source={icons[flight.icon]} />
                  <Text style={styles.cardText}>{flight.airline}</Text>
                </View>
              </View>
              <View style={{ gap: 6 }}>
                <Text style={[styles.label, { textAlign: 'right' }]}>Included</Text>
                <Text style={styles.cardText}>{flight.included}</Text>
              </View>
            </View>
            <Text style={styles.priceText}>{flight.price}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
  card: {
    backgroundColor: COLORS.white,
    paddingTop: 9,
    paddingRight: 11,
    paddingBottom: 16,
    paddingLeft: 13,
    gap: 13,
    marginTop: 15,
    borderRadius: 5,
  },
  airline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  }
});

export default Business;