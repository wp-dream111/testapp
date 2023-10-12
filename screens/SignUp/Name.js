import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS } from '../../constants';

const Name = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const isFormValidation = () => {
    if (firstName, lastName) {
      return true;
    }
    return false;
  }

  const goToNext = () => {
    if (isFormValidation()) {
      navigation.navigate('Phone');
    }
  }

  const handleEmailChange = (newEmail) => {
    setFirstName(newEmail);
  }

  const handlePasswordChange = (newPassword) => {
    setLastName(newPassword);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, paddingTop: 100, paddingBottom: 60, paddingLeft: 36, paddingRight: 36 }}>
        <View>
          <Text style={{ ...FONTS.body3, color: COLORS.lighterGray }}>Welcome to Tunnel.</Text>
          <Text style={{ ...FONTS.body3, color: COLORS.white }}>Let's get personal.</Text>
        </View>
        <View style={{ paddingTop: 32, gap: 16 }}>
          <TextInput
            placeholder='First Name'
            placeholderTextColor={COLORS.lightGray}
            style={[styles.input, { borderWidth: 1, borderColor: firstName ? COLORS.white : COLORS.lightGray }]}
            value={firstName}
            onChangeText={handleEmailChange}
          />
          <TextInput
            placeholder='Last Name'
            placeholderTextColor={COLORS.lightGray}
            style={[styles.input, { borderWidth: 1, borderColor: lastName ? COLORS.white : COLORS.lightGray }]}
            value={lastName}
            onChangeText={handlePasswordChange}
          />
        </View>
        <TouchableOpacity
          onPress={goToNext}
          disabled={!firstName || !lastName}
          style={[
            styles.shadow,
            {
              marginTop: 40,
              width: '100%',
              height: 43,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: (firstName && lastName) ? COLORS.white : COLORS.lightWhite,
            }}
          >
            <Text style={{ color: (firstName && lastName) ? COLORS.black : COLORS.lightGray, ...FONTS.body4 }}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
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
  input: {
    backgroundColor: COLORS.gray,
    color: COLORS.white,
    borderRadius: 10,
    paddingLeft: 13,
  },
  icon: {
    width: 10,
    height: 10,
  },
  iconText: {
    ...FONTS.body5,
  },
  invalidText: {
    color: COLORS.red,
    ...FONTS.body5,
  }
});
export default Name;
