import { TextInput, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PhoneInput from 'react-native-phone-input';
import { COLORS, SIZES, FONTS } from '../../constants';
import { authActions } from '../../redux/auth.slice';

const Phone = ({ navigation, login }) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('us');
  const [code, setCode] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [showValidationCode, setShowValidateionCode] = useState(false);
  const [isValidatedCode, setIsValidatedCode] = useState(false);

  const isPhoneNumberValidation = (value) => {
    const phoneRegex = /^\+\d{1}\s?\d{10}$/;

    if (phoneRegex.test(value)) {
      setIsValidPhone(true);
      return true;
    } else {
      setIsValidPhone(false);
      return false;
    }
  }

  const goToNext = () => {
    if (isPhoneNumberValidation(phoneNumber)) {
      if (showValidationCode) {
        if (validateCode(code)) {
          if (login) {
            dispatch(authActions.setLoadingTitle('Loading dashboard...'));
            navigation.navigate('Loading');
            setTimeout(() => {
              navigation.navigate('HomeScreen');
            }, 2000);
          } else {
            dispatch(authActions.setLoadingTitle('Creating your account...'));
            navigation.navigate('Loading');
            setTimeout(() => {
              navigation.navigate('HomeScreen');
            }, 2000);
          }
        }
      } else {
        setShowValidateionCode(true);
      }
    }
  }

  const handlePhoneNumberChange = (value) => {
    isPhoneNumberValidation(value);
    setShowValidateionCode(false);
    setIsValidatedCode(false);
    setPhoneNumber(value);
  }

  const handleCountryCodeChange = (value) => {
    setCountryCode(value);
  };

  const handleCodeChange = (value) => {
    validateCode(value);
    setCode(value);
  }

  const validateCode = (value) => {
    const codeRegex = /^[0-9]{6}$/;
    if (value && codeRegex.test(value)) {
      setIsValidatedCode(true);
      return true;
    } else {
      setIsValidatedCode(false);
      return false;
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, paddingTop: 100, paddingBottom: 60, paddingLeft: 36, paddingRight: 36 }}>
        <View>
          <Text style={{ ...FONTS.body3, color: COLORS.lighterGray }}>Welcome to Tunnel.</Text>
          <Text style={{ ...FONTS.body3, color: COLORS.white }}>
            {showValidationCode ? "Enter the verification code you receive." : login ? "Login using your phone number." : "Enter your number. We'll never spam."}
          </Text>
        </View>
        <View style={{ paddingTop: 32, gap: 16 }}>
          <PhoneInput
            style={[styles.phoneInput, { borderColor: isValidPhone ? COLORS.white : COLORS.gray }]}
            textStyle={styles.phoneInputText}
            onChangePhoneNumber={handlePhoneNumberChange}
            onPressFlag={() => { }}
            initialCountry={'us'}
            textProps={{
              placeholder: '1234567890',
              placeholderTextColor: COLORS.lightGray
            }}
            onChangeCountryCode={handleCountryCodeChange}
          />
          {showValidationCode ? (
            <TextInput
              keyboardType='numeric'
              placeholderTextColor={COLORS.lightGray}
              style={[styles.input, { borderColor: isValidatedCode ? COLORS.white : COLORS.gray }]}
              value={code}
              onChangeText={handleCodeChange}
            />
          ) : null}
        </View>
        <TouchableOpacity
          onPress={goToNext}
          disabled={(!showValidationCode && !isValidPhone) || (showValidationCode && !isValidatedCode)}
          style={[
            styles.shadow,
            {
              marginTop: '17%',
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
              backgroundColor: ((!showValidationCode && !isValidPhone) || (showValidationCode && !isValidatedCode)) ? COLORS.lightWhite : COLORS.white,
            }}
          >
            <Text style={{ color: ((!showValidationCode && !isValidPhone) || (showValidationCode && !isValidatedCode)) ? COLORS.lightGray : COLORS.black, ...FONTS.body4 }}>{login ? "Continue" : (showValidationCode && isValidatedCode) ? "Create Account" : "Continue"}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ paddingTop: 8 }}>
          <Text style={{ ...FONTS.body6, color: COLORS.white }}>
            By clicking Create Account, you agree to our Terms and Private Policy and consent to receive text messages and notifications from us related to your flight. Message and data rates apply. Text STOP to cancel.
          </Text>
        </View>
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
    borderRadius: SIZES.radius,
    paddingLeft: 13,
    borderWidth: 1,
    height: 43,
  },
  phoneInput: {
    width: '100%',
    height: 43,
    backgroundColor: COLORS.gray,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    color: COLORS.lightGray,
  },
  phoneInputText: {
    fontSize: 16,
    color: COLORS.white
  },
});
export default Phone;
