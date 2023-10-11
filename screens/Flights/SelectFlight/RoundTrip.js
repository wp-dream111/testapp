import { FlatList, TextInput, Image, Modal, TouchableHighlight, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-native-date-picker'
import { COLORS, SIZES, FONTS, icons } from '../../../constants';
import Standard from './Standard';
import Business from './Business';
import First from './First';
import Premium from './Premium';
import DepartingFlight from './DepartingFlight';
import Confirm from './Confirm';
import { bookingActions } from '../../../redux/booking.slice';

const RoundTrip = ({ navigation }) => {
  const bookingState = useSelector(state => state.booking);
  const dispatch = useDispatch();

  const airports1 = ["MIA", "MCO", "BOS", "OAK", "SFO", "PHX", "LHR", "CDG", "FRA", "BER", "MAD", "SVQ"];
  const airports = [
    { key: 1, value: "MIA", name: "Miami, FL" },
    { key: 2, value: "MCO", name: "Orlando, FL" },
    { key: 3, value: "BOS", name: "Boston, MS" },
    { key: 4, value: "OAK", name: "Oakland, CA" },
    { key: 5, value: "SFO", name: "San Francisco, CA" },
    { key: 6, value: "PHX", name: "Phoenix, AZ" },
    { key: 7, value: "LHR", name: "London, UK" },
    { key: 8, value: "CDG", name: "Paris, France" },
    { key: 9, value: "FRA", name: "Frankfurt, Germany" },
    { key: 10, value: "BER", name: "Berlin, Germany" },
    { key: 11, value: "MAD", name: "Mardrid, Spain" },
    { key: 12, value: "SVQ", name: "Seville , Spain" },
  ];

  const [origin, setOrigin] = useState(bookingState.origin);
  const [destination, setDestination] = useState(bookingState.destination);
  const [bookingType, setBookingType] = useState('standard');
  const [selectedDepartingFlight, setSelectedDepartingFlight] = useState({});
  const [selectedReturningFlight, setSelectedReturningFlight] = useState({});
  const [isSelectDepartingFlight, setIsSelectDepartingFlight] = useState(false);
  const [isSelectReturningFlight, setIsSelectReturningFlight] = useState(false);
  const [flightType, setFlightType] = useState('departure');
  const [isSelectedCancel, setIsSelectedCancel] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date(bookingState.departureDate))
  const [departureOpen, setDepartureOpen] = useState(false)
  const [returnDate, setReturnDate] = useState(new Date(bookingState.returnDate))
  const [returnOpen, setReturnOpen] = useState(false)
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [originModalVisible, setOriginModalVisible] = useState(false);
  const [destinationModalVisible, setDestinationModalVisible] = useState(false);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [searchText, setSearchText] = useState('');

  const toggleOriginDropdown = () => {
    setShowOriginDropdown(!showOriginDropdown);
  };

  const toggleDestinationDropdown = () => {
    setShowDestinationDropdown(!showDestinationDropdown);
  };

  const handleOptionSelect = (option) => {
    setOrigin(option);
    dispatch(bookingActions.setOrigin(option));
    setShowOriginDropdown(false);
    setSearchText('');
    setOriginModalVisible(false);
  };

  const handleSelectDestination = (option) => {
    setDestination(option);
    dispatch(bookingActions.setDestination(option));
    setShowDestinationDropdown(false);
    setSearchText('');
    setDestinationModalVisible(false);
  };

  const filterOptions = () => {
    return airports1.filter(option =>
      option.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleChangeType = (value) => {
    setBookingType(value);
  }

  const handleSelectFlight = (data) => {
    dispatch(bookingActions.setIsDetail(true));
    if (flightType === 'departure') {
      setIsSelectDepartingFlight(true);
      setSelectedDepartingFlight(data);
    } else {
      setIsSelectReturningFlight(true);
      setSelectedReturningFlight(data);
    }
  }

  const handleSelectDepartingFlight = (flag) => {
    setIsSelectedCancel(flag);
    setIsSelectDepartingFlight(false);
    dispatch(bookingActions.setIsDetail(false));
    setFlightType('return');
  }

  const handlePay = () => {
    setIsSelectReturningFlight(false);
    setFlightType('departure');
    dispatch(bookingActions.setIsDetail(false));
  }
  
  const handleCancel = () => {
    setIsSelectDepartingFlight(false);
    setIsSelectReturningFlight(false);
    dispatch(bookingActions.setIsDetail(false));
  }

  return (
    <ScrollView style={styles.container}>
      {isSelectDepartingFlight ? (
        <DepartingFlight flight={selectedDepartingFlight} handleSelectDepartingFlight={handleSelectDepartingFlight} handleCancel={handleCancel} />
      ) : isSelectReturningFlight ? (
        <Confirm departingFlight={selectedDepartingFlight} returningFlight={selectedReturningFlight} isSelectedCancel={isSelectedCancel} handlePay={handlePay} handleCancel={handleCancel} />
      ) : (
        <>
          <View style={styles.firstPart}>
            <Text style={styles.detailText}>Details</Text>
            <View style={styles.details}>
              <TouchableOpacity onPress={() => setOriginModalVisible(true)}>
                <Text style={[styles.detailButton, { width: 50 }]}>{origin}</Text>
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={originModalVisible}
                onRequestClose={() => setOriginModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <TouchableHighlight
                    style={styles.option}
                    onPress={toggleOriginDropdown}
                  >
                    <Text style={{ color: COLORS.white }}>{origin} - <Text style={{ color: COLORS.lightGray, fontSize: 12 }}>{airports.find(port => port.value === origin)?.name}</Text></Text>
                  </TouchableHighlight>
                  {showOriginDropdown && (
                    <View style={styles.dropdownOptions}>
                      <TextInput
                        value={searchText}
                        onChangeText={setSearchText}
                        style={styles.searchInput}
                      />
                      <FlatList
                        data={filterOptions()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => handleOptionSelect(item)}
                            style={styles.item}
                          >
                            <Text style={{ color: COLORS.white, fontSize: 12 }}>{item} - <Text style={{ color: COLORS.lightGray, fontSize: 12 }}>{airports.find(port => port.value === item)?.name}</Text></Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  )}
                </View>
              </Modal>
              <Text style={{ color: COLORS.white, ...FONTS.body4 }}>to</Text>
              <TouchableOpacity onPress={() => setDestinationModalVisible(true)}>
                <Text style={[styles.detailButton, { width: 50 }]}>{destination}</Text>
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={destinationModalVisible}
                onRequestClose={() => setDestinationModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <TouchableHighlight
                    style={styles.option}
                    onPress={toggleDestinationDropdown}
                  >
                    <Text style={{ color: COLORS.white }}>{destination} - <Text style={{ color: COLORS.lightGray, fontSize: 12 }}>{airports.find(port => port.value === origin)?.name}</Text></Text>
                  </TouchableHighlight>
                  {showDestinationDropdown && (
                    <View style={styles.dropdownOptions}>
                      <TextInput
                        value={searchText}
                        onChangeText={setSearchText}
                        style={styles.searchInput}
                      />
                      <FlatList
                        data={filterOptions()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => handleSelectDestination(item)}
                            style={styles.item}
                          >
                            <Text style={{ color: COLORS.white, fontSize: 12 }}>{item} - <Text style={{ color: COLORS.lightGray, fontSize: 12 }}>{airports.find(port => port.value === item)?.name}</Text></Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  )}
                </View>
              </Modal>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => setDateModalVisible(true)}>
                <Text style={styles.detailButton}>
                  {`${departureDate.getMonth() + 1}/${departureDate.getDate()}/${departureDate.getFullYear() - 2000}`} - {`${returnDate.getMonth() + 1}/${returnDate.getDate()}/${returnDate.getFullYear() - 2000}`}
                </Text>
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={dateModalVisible}
                onRequestClose={() => setDateModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <TouchableHighlight
                    onPress={() => setDepartureOpen(true)}
                    style={styles.option}
                  >
                    <Text style={{ color: COLORS.white, textAlign: 'center' }}>{`${departureDate.getMonth() + 1}/${departureDate.getDate()}/${departureDate.getFullYear() - 2000}`} - {`${returnDate.getMonth() + 1}/${returnDate.getDate()}/${returnDate.getFullYear() - 2000}`}</Text>
                  </TouchableHighlight>
                </View>
                <DatePicker
                  modal
                  mode='date'
                  open={departureOpen}
                  date={departureDate}
                  title="Select Depature Date"
                  onConfirm={(date) => {
                    setDepartureOpen(false);
                    setDepartureDate(date);
                    setTimeout(() => {
                      setReturnOpen(true);
                    }, 500);
                  }}
                  onCancel={() => {
                    setDepartureOpen(false);
                    setDateModalVisible(false);
                  }}
                />
                <DatePicker
                  modal
                  mode='date'
                  title="Select Returning Date"
                  open={returnOpen}
                  date={returnDate}
                  onConfirm={(date) => {
                    setReturnOpen(false);
                    setReturnDate(date);
                    setDateModalVisible(false);
                  }}
                  onCancel={() => {
                    setReturnOpen(false);
                    setDateModalVisible(false);
                  }}
                />
              </Modal>
            </View>
          </View>
          <View style={styles.secondPart}>
            <View style={styles.secondPartItem}>
              <Text style={styles.detailText}>{flightType === 'departure' ? 'Departing' : 'Returning'} Flights</Text>
              <Image source={flightType === 'departure' ? icons.departure_flight : icons.return_flight} style={{ width: 20, height: 12, }} />
            </View>
            <View style={styles.secondPartItem}>
              <Text style={styles.detailText}>Recommended</Text>
              <Image source={icons.sort_ascending} style={{ width: 15, height: 12 }} />
            </View>
          </View>
          <ScrollView horizontal style={styles.horizontalScroll} contentContainerStyle={styles.scrollContent}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleChangeType('standard')}>
              <Text style={[styles.tabText, { color: bookingType === 'standard' ? COLORS.white : COLORS.lightGray, borderBottomColor: bookingType === 'standard' ? COLORS.white : COLORS.gray }]}>Standard</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleChangeType('business')}>
              <Text style={[styles.tabText, { color: bookingType === 'business' ? COLORS.white : COLORS.lightGray, borderBottomColor: bookingType === 'business' ? COLORS.white : COLORS.gray }]}>Business</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleChangeType('first')}>
              <Text style={[styles.tabText, { color: bookingType === 'first' ? COLORS.white : COLORS.lightGray, borderBottomColor: bookingType === 'first' ? COLORS.white : COLORS.gray }]}>First</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleChangeType('premium')}>
              <Text style={[styles.tabText, { color: bookingType === 'premium' ? COLORS.white : COLORS.lightGray, borderBottomColor: bookingType === 'premium' ? COLORS.white : COLORS.gray }]}>Premium</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.content}>
            {bookingType === 'standard' ? (
              <Standard handleSelectFlight={handleSelectFlight} flightType={flightType} />
            ) : bookingType === 'business' ? (
              <Business handleSelectFlight={handleSelectFlight} flightType={flightType} />
            ) : bookingType === 'first' ? (
              <First handleSelectFlight={handleSelectFlight} flightType={flightType} />
            ) : bookingType === 'premium' ? (
              <Premium handleSelectFlight={handleSelectFlight} flightType={flightType} />
            ) : null}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
  firstPart: {
    gap: 15,
    paddingTop: 25,
    marginLeft: 30,
    marginRight: 30,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  detailText: {
    color: COLORS.white,
    ...FONTS.body4,
  },
  detailButton: {
    height: 37,
    fontSize: 12,
    color: COLORS.white,
    backgroundColor: COLORS.gray,
    verticalAlign: 'middle',
    textAlign: 'center',
    borderRadius: 10,
  },
  secondPart: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 25,
    marginLeft: 30,
    marginRight: 30,
  },
  secondPartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  datePicker: {
    backgroundColor: COLORS.gray,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
  },
  horizontalScroll: {
    height: 43,
    borderTopColor: COLORS.lighterGray,
    borderBottomColor: COLORS.lighterGray,
    borderWidth: 1,
    marginTop: 15,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
  tabText: {
    height: '100%',
    borderBottomWidth: 1,
    verticalAlign: 'middle',
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingLeft: 30,
    paddingRight: 30,
  },
  option: {
    padding: 10,
    width: '100%',
    marginTop: 108,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    color: COLORS.white,
  },

  dropdownOptions: {
    position: 'absolute',
    top: 108,
    width: '100%',
    height: 200,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray,
  },
  searchInput: {
    padding: 10,
    color: COLORS.white,
  },
  item: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: COLORS.lightWhite,
  },
  content: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
  },
});
export default RoundTrip;
