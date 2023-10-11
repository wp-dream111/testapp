import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableHighlight, Button } from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-date-picker'
import { COLORS, SIZES, FONTS, icons } from '../../../constants';
import Loading from '../../SignUp/Loading';
import { bookingActions } from '../../../redux/booking.slice';

const RoundTrip = ({ navigation }) => {
  const airports = [
    { key: "MIA", value: "Miami, FL (MIA)" },
    { key: "MCO", value: "Orlando, FL (MCO)" },
    { key: "BOS", value: "Boston, MS (BOS)" },
    { key: "OAK", value: "Oakland, CA (OAK)" },
    { key: "SFO", value: "San Francisco, CA (SFO)" },
    { key: "PHX", value: "Phoenix, AZ (PHX)" },
    { key: "LHR", value: "London, UK (LHR)" },
    { key: "CDG", value: "Paris, France (CDG)" },
    { key: "FRA", value: "Frankfurt, Germany (FRA)" },
    { key: "BER", value: "Berlin, Germany (BER)" },
    { key: "MAD", value: "Mardrid, Spain (MAD)" },
  ];
  const dispatch = useDispatch();
  const bookingState = useSelector(state => state.booking);
  const [origin, setOrigin] = useState(bookingState.origin);
  const [destination, setDestination] = useState(bookingState.destination);
  const [showDetail, setShowDetail] = useState(false);
  const [hiddenDetailButton, setHiddenDetailButton] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date(bookingState.departureDate))
  const [departureOpen, setDepartureOpen] = useState(false)
  const [returnDate, setReturnDate] = useState(new Date(bookingState.returnDate))
  const [returnOpen, setReturnOpen] = useState(false)
  const [numberOfAdults, setNumberOfAdults] = useState('1');
  const [numberOfChildrens, setNumberOfChildrens] = useState('');
  const [numberOfPets, setNumberOfPets] = useState('');
  const [numberOfLuggage, setNumberOfLuggage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOriginChange = (value) => {
    setOrigin(value);
    if (destination) {
      setShowDetail(true);
    }
  }

  const handleDestinationChange = (value) => {
    setDestination(value);
    if (origin) {
      setShowDetail(true);
    }
  }

  const handleChangeDepartureDate = (date) => {
    setDepartureOpen(false)
    setDepartureDate(date)

    if (date < new Date()) {
      setErrorMessage('Invalid Date');
      setIsValid(false);
    } else {
      if (returnDate > date) {
        setIsValid(true);
        setErrorMessage('');
      } else {
        setIsValid(false);
        setErrorMessage('Invalid Date');
      }
    }
  }

  const handleChangeReturnDate = (date) => {
    setReturnOpen(false)
    setReturnDate(date)

    if (date < new Date()) {
      setErrorMessage('Invalid Date');
      setIsValid(false);
    } else {
      if (date > departureDate) {
        setIsValid(true);
        setErrorMessage('');
      } else {
        setIsValid(false);
        setErrorMessage('Invalid Date');
      }
    }
  }

  const handleDecrement = (type) => {
    switch (type) {
      case 'adult': numberOfAdults > 1 && setNumberOfAdults((numberOfAdults * 1 - 1).toString()); break;
      case 'children': numberOfChildrens > 1 && setNumberOfChildrens((numberOfChildrens * 1 - 1).toString()); break;
      case 'pet': numberOfPets > 1 && setNumberOfPets((numberOfPets * 1 - 1).toString()); break;
      case 'luggage': numberOfLuggage > 1 && setNumberOfLuggage((numberOfLuggage * 1 - 1).toString()); break;
      default: break;
    }
  }

  const handleIncrement = (type) => {
    switch (type) {
      case 'adult': setNumberOfAdults((numberOfAdults * 1 + 1).toString()); break;
      case 'children': setNumberOfChildrens((numberOfChildrens * 1 + 1).toString()); break;
      case 'pet': setNumberOfPets((numberOfPets * 1 + 1).toString()); break;
      case 'luggage': setNumberOfLuggage((numberOfLuggage * 1 + 1).toString()); break;
      default: break;
    }
  }

  const handleChangeNumber = (value, type) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue === '' || numericValue.charAt(0) !== '0') {
      switch (type) {
        case 'adult': setNumberOfAdults(numericValue); break;
        case 'children': setNumberOfChildrens(numericValue); break;
        case 'pet': setNumberOfPets(numericValue); break;
        case 'luggage': setNumberOfLuggage(numericValue); break;
        default: break;
      }
    }
  }

  const goToNext = () => {
    setIsLoading(true);
    dispatch(bookingActions.setOrigin(origin));
    dispatch(bookingActions.setDestination(destination));
    dispatch(bookingActions.setDepartureDate(departureDate.getTime()));
    dispatch(bookingActions.setReturnDate(returnDate.getTime()));
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("SelectFlight");
    }, 2000);
  }

  if (isLoading) {
    return <Loading title="Pulling available flights..." />;
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={{ gap: 15, paddingTop: 25 }}>
          <Text style={{ color: COLORS.white, ...FONTS.body4 }}>From</Text>
          <SelectList
            setSelected={handleOriginChange}
            data={airports}
            defaultOption={airports.find(port => port.key === origin)}
            save="key"
            boxStyles={{
              backgroundColor: COLORS.gray,
              borderColor: COLORS.gray,
            }}
            inputStyles={{
              color: origin ? COLORS.white : COLORS.lighterGray
            }}
            placeholder='Orgin'
            searchPlaceholder=''
            dropdownStyles={{
              backgroundColor: COLORS.gray,
            }}
            dropdownTextStyles={{
              color: COLORS.white,
            }}
            arrowicon={<Image source={icons.arrow_down} style={styles.smallIcon} />}
            closeicon={<Image source={icons.close} style={styles.middeleIcon} />}
            searchicon={<Image source={icons.search} style={styles.middeleIcon} />}
          />
        </View>
        <View style={{ gap: 15, paddingTop: 25 }}>
          <Text style={{ color: COLORS.white, ...FONTS.body4 }}>To</Text>
          <SelectList
            setSelected={handleDestinationChange}
            data={airports}
            defaultOption={airports.find(port => port.key === destination)}
            save="key"
            boxStyles={{
              backgroundColor: COLORS.gray,
              borderColor: COLORS.gray,
            }}
            inputStyles={{
              color: destination ? COLORS.white : COLORS.lighterGray
            }}
            placeholder='Destination'
            searchPlaceholder=''
            dropdownStyles={{
              backgroundColor: COLORS.gray,
            }}
            dropdownTextStyles={{
              color: COLORS.white
            }}
            arrowicon={<Image source={icons.arrow_down} style={styles.smallIcon} />}
            closeicon={<Image source={icons.close} style={styles.middeleIcon} />}
            searchicon={<Image source={icons.search} style={styles.middeleIcon} />}
          />
        </View>
        {showDetail ? (
          <View>
            <View style={{ flexDirection: 'row', gap: 28, paddingTop: 26 }}>
              <View style={{ flex: 1, gap: 15 }}>
                <Text style={{ color: COLORS.white }}>Depature</Text>
                <TouchableHighlight
                  style={styles.datePicker}
                  onPress={() => setDepartureOpen(true)}
                >
                  <Text style={{ color: COLORS.white }}>{departureDate.toDateString()}</Text>
                </TouchableHighlight>
                <DatePicker
                  modal
                  mode='date'
                  open={departureOpen}
                  date={departureDate}
                  onConfirm={handleChangeDepartureDate}
                  onCancel={() => setDepartureOpen(false)}
                />
              </View>
              <View style={{ flex: 1, gap: 15 }}>
                <Text style={{ color: COLORS.white }}>Return</Text>
                <TouchableHighlight
                  style={styles.datePicker}
                  onPress={() => setReturnOpen(true)}
                >
                  <Text style={{ color: COLORS.white }}>{returnDate.toDateString()}</Text>
                </TouchableHighlight>
                <DatePicker
                  modal
                  mode='date'
                  open={returnOpen}
                  date={returnDate}
                  onConfirm={handleChangeReturnDate}
                  onCancel={() => setReturnOpen(false)}
                />
              </View>
            </View>
            {errorMessage ? <Text style={{ color: COLORS.red }}>{errorMessage}</Text> : null}
            <View style={{ paddingTop: 26, gap: 15 }}>
              <Text style={{ color: COLORS.white }}>Adults</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableHighlight
                  activeOpacity={0.5}
                  underlayColor={COLORS.gray}
                  style={{ borderRadius: SIZES.radius, position: 'absolute', left: 0, zIndex: 1, height: '100%', width: 30 }}
                  onPress={() => handleDecrement('adult')}
                >
                  <Text style={{ color: COLORS.white, fontSize: SIZES.body1, textAlign: 'center' }}>-</Text>
                </TouchableHighlight>
                <TextInput
                  style={{ flex: 1, backgroundColor: COLORS.gray, textAlign: 'center', color: COLORS.white, borderRadius: SIZES.radius }}
                  keyboardType='numeric'
                  value={numberOfAdults}
                  onChangeText={(text) => handleChangeNumber(text, 'adult')}
                />
                <TouchableHighlight
                  activeOpacity={0.5}
                  underlayColor={COLORS.gray}
                  style={{ borderRadius: SIZES.radius, position: 'absolute', right: 0, zIndex: 1, height: '100%', width: 30 }}
                  onPress={() => handleIncrement('adult')}
                >
                  <Text style={{ color: COLORS.white, fontSize: SIZES.body2, textAlign: 'center', paddingTop: 10 }}>+</Text>
                </TouchableHighlight>
              </View>
            </View>
            {hiddenDetailButton ? (
              <View>
                <View style={{ flexDirection: 'row', paddingTop: 26, gap: 15 }}>
                  <View style={{ flex: 1, gap: 15 }}>
                    <Text style={{ color: COLORS.white }}>Children</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor={COLORS.gray}
                        style={{ borderRadius: SIZES.radius, position: 'absolute', left: 0, zIndex: 1, height: '100%', width: 30 }}
                        onPress={() => handleDecrement('children')}
                      >
                        <Text style={{ color: COLORS.white, fontSize: SIZES.body1, textAlign: 'center' }}>-</Text>
                      </TouchableHighlight>
                      <TextInput
                        style={{ width: '100%', backgroundColor: COLORS.gray, textAlign: 'center', color: COLORS.white, borderRadius: SIZES.radius }}
                        keyboardType='numeric'
                        value={numberOfChildrens}
                        onChangeText={(text) => handleChangeNumber(text, 'children')}
                      />
                      <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor={COLORS.gray}
                        style={{ borderRadius: SIZES.radius, position: 'absolute', right: 0, zIndex: 1, height: '100%', width: 30 }}
                        onPress={() => handleIncrement('children')}
                      >
                        <Text style={{ color: COLORS.white, fontSize: SIZES.body2, textAlign: 'center', paddingTop: 10 }}>+</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                  <View style={{ flex: 1, gap: 15 }}>
                    <Text style={{ color: COLORS.white }}>Pets</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor={COLORS.gray}
                        style={{ borderRadius: SIZES.radius, position: 'absolute', left: 0, zIndex: 1, height: '100%', width: 30 }}
                        onPress={() => handleDecrement('pet')}
                      >
                        <Text style={{ color: COLORS.white, fontSize: SIZES.body1, textAlign: 'center' }}>-</Text>
                      </TouchableHighlight>
                      <TextInput
                        style={{ flex: 1, backgroundColor: COLORS.gray, textAlign: 'center', color: COLORS.white, borderRadius: SIZES.radius }}
                        keyboardType='numeric'
                        value={numberOfPets}
                        onChangeText={(text) => handleChangeNumber(text, 'pet')}
                      />
                      <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor={COLORS.gray}
                        style={{ borderRadius: SIZES.radius, position: 'absolute', right: 0, zIndex: 1, height: '100%', width: 30 }}
                        onPress={() => handleIncrement('pet')}
                      >
                        <Text style={{ color: COLORS.white, fontSize: SIZES.body2, textAlign: 'center', paddingTop: 10 }}>+</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
                <View style={{ paddingTop: 26, gap: 15 }}>
                  <Text style={{ color: COLORS.white }}>Check-In Luggage</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableHighlight
                      activeOpacity={0.5}
                      underlayColor={COLORS.gray}
                      style={{ borderRadius: SIZES.radius, position: 'absolute', left: 0, zIndex: 1, height: '100%', width: 30 }}
                      onPress={() => handleDecrement('luggage')}
                    >
                      <Text style={{ color: COLORS.white, fontSize: SIZES.body1, textAlign: 'center' }}>-</Text>
                    </TouchableHighlight>
                    <TextInput
                      style={{ flex: 1, backgroundColor: COLORS.gray, textAlign: 'center', color: COLORS.white, borderRadius: SIZES.radius }}
                      keyboardType='numeric'
                      value={numberOfLuggage}
                      onChangeText={(text) => handleChangeNumber(text, 'luggage')}
                    />
                    <TouchableHighlight
                      activeOpacity={0.5}
                      underlayColor={COLORS.gray}
                      style={{ borderRadius: SIZES.radius, position: 'absolute', right: 0, zIndex: 1, height: '100%', width: 30 }}
                      onPress={() => handleIncrement('luggage')}
                    >
                      <Text style={{ color: COLORS.white, fontSize: SIZES.body2, textAlign: 'center', paddingTop: 10 }}>+</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            ) : (
              <View style={{ paddingTop: 26 }}>
                <TouchableHighlight onPress={() => setHiddenDetailButton(true)}>
                  <View style={styles.additionalButton}>
                    <Text style={{ color: COLORS.white, ...FONTS.body5 }}>Additional Travelers, Check In Luggage</Text>
                    <Image
                      source={icons.arrow_right}
                      resizeMode="contain"
                      style={{ tintColor: COLORS.white }}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            )}
            <View style={{ paddingTop: 26, paddingBottom: 26 }}>
              <TouchableHighlight disabled={!isValid} style={{ backgroundColor: isValid ? COLORS.white : COLORS.lightWhite, height: 37, borderRadius: SIZES.radius, justifyContent: 'center' }} onPress={goToNext}>
                <Text style={{ color: isValid ? COLORS.black : COLORS.lighterGray, ...FONTS.body4, textAlign: 'center' }}>Next</Text>
              </TouchableHighlight>
            </View>
          </View>
        ) : null}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
  shadow: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 5,
  },
  datePicker: {
    backgroundColor: COLORS.gray,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
  },
  additionalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingRight: 14,
    paddingBottom: 12,
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: SIZES.radius,
  },
  smallIcon: {
    height: SIZES.body5,
    width: SIZES.body5,
    tintColor: COLORS.lighterGray,
  },
  middeleIcon: {
    height: SIZES.body3,
    width: SIZES.body3,
    tintColor: COLORS.lighterGray,
  },
});
export default RoundTrip;
