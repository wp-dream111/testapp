import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-date-picker'
import { COLORS, SIZES, FONTS, icons } from '../../../constants';
import { bookingActions } from '../../../redux/booking.slice';
import { authActions } from '../../../redux/auth.slice';

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
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setOrigin(bookingState.origin);
  }, [bookingState.origin]);

  useEffect(() => {
    setDestination(bookingState.destination);
  }, [bookingState.destination]);

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
    dispatch(authActions.setLoadingTitle('Pulling available flights...'));
    dispatch(bookingActions.setOrigin(origin));
    dispatch(bookingActions.setDestination(destination));
    dispatch(bookingActions.setDepartureDate(departureDate.getTime()));
    dispatch(bookingActions.setReturnDate(returnDate.getTime()));
    navigation.navigate("FlightLoading");
    setTimeout(() => {
      navigation.navigate("SelectFlight");
    }, 2000);
  }

  const formatDate = (date) => {
    let month = date.getMonth();
    switch (month) {
      case 0: month = 'January'; break;
      case 1: month = 'February'; break;
      case 2: month = 'March'; break;
      case 3: month = 'April'; break;
      case 4: month = 'May'; break;
      case 5: month = 'June'; break;
      case 6: month = 'July'; break;
      case 7: month = 'August'; break;
      case 8: month = 'September'; break;
      case 9: month = 'October'; break;
      case 10: month = 'November'; break;
      case 11: month = 'December'; break;
      default: break;
    }

    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  }

  const InputNumber = ({ type, value }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor={COLORS.gray}
        style={styles.minusIcon}
        onPress={() => handleDecrement(type)}
      >
        <Text style={styles.minusIconText}>-</Text>
      </TouchableHighlight>
      <TextInput
        style={styles.textInput}
        keyboardType='numeric'
        value={value}
        onChangeText={(text) => handleChangeNumber(text, type)}
      />
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor={COLORS.gray}
        style={styles.plusIcon}
        onPress={() => handleIncrement(type)}
      >
        <Text style={styles.plusIconText}>+</Text>
      </TouchableHighlight>
    </View>
  )

  const SelectDropdown = ({ setSelected, value }) => (
    <SelectList
      setSelected={setSelected}
      data={airports}
      defaultOption={airports.find(port => port.key === value)}
      save="key"
      boxStyles={styles.dropdown}
      inputStyles={{ color: value ? COLORS.white : COLORS.lighterGray, fontSize: SIZES.body5 }}
      placeholder='Destination'
      searchPlaceholder=''
      dropdownStyles={{ backgroundColor: COLORS.gray }}
      dropdownTextStyles={{ color: COLORS.white, fontSize: SIZES.body5 }}
      arrowicon={<Image source={icons.arrow_down} style={styles.smallIcon} />}
      closeicon={<Image source={icons.close} style={styles.middeleIcon} />}
      searchicon={<Image source={icons.search} style={styles.middeleIcon} />}
    />
  )

  return (
    <ScrollView style={styles.container}>
      <View style={{ gap: 15, paddingTop: 25 }}>
        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>From</Text>
        <SelectDropdown setSelected={handleOriginChange} value={origin} />
      </View>
      <View style={{ gap: 15, paddingTop: 25 }}>
        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>To</Text>
        <SelectDropdown setSelected={handleDestinationChange} value={destination} />
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
                <Text style={{ color: COLORS.white, fontSize: SIZES.body5 }}>{formatDate(departureDate)}</Text>
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
                <Text style={{ color: COLORS.white, fontSize: SIZES.body5 }}>{formatDate(returnDate)}</Text>
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
            <InputNumber type={'adult'} value={numberOfAdults} />
          </View>
          {hiddenDetailButton ? (
            <View>
              <View style={{ flexDirection: 'row', paddingTop: 26, gap: 15 }}>
                <View style={{ flex: 1, gap: 15 }}>
                  <Text style={{ color: COLORS.white }}>Children</Text>
                  <InputNumber type={'children'} value={numberOfChildrens} />
                </View>
                <View style={{ flex: 1, gap: 15 }}>
                  <Text style={{ color: COLORS.white }}>Pets</Text>
                  <InputNumber type={'pet'} value={numberOfPets} />
                </View>
              </View>
              <View style={{ paddingTop: 26, gap: 15 }}>
                <Text style={{ color: COLORS.white }}>Check-In Luggage</Text>
                <InputNumber type={'luggage'} value={numberOfLuggage} />
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
  dropdown: {
    backgroundColor: COLORS.gray,
    borderColor: COLORS.gray,
    height: 37,
    paddingBottom: 0,
    paddingTop: 0,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.gray,
    textAlign: 'center',
    color: COLORS.white,
    borderRadius: SIZES.radius,
    height: 37,
  },
  plusIcon: {
    borderRadius: SIZES.radius,
    position: 'absolute',
    right: 0,
    zIndex: 1,
    height: '100%',
    width: 50,
  },
  plusIconText: {
    color: COLORS.white,
    fontSize: SIZES.body2,
    textAlign: 'center',
    paddingTop: 5,
  },
  minusIcon: {
    borderRadius: SIZES.radius,
    position: 'absolute',
    left: 0,
    zIndex: 1,
    height: '100%',
    width: 50,
  },
  minusIconText: {
    color: COLORS.white,
    fontSize: SIZES.body1,
    textAlign: 'center',
    marginTop: -4,
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
