import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, FONTS, icons } from '../../constants';

const EmailPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isEight, setIsEight] = useState(false);
  const [isCapital, setIsCapital] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    if (emailPattern.test(value)) {
      setIsValidEmail(true);
      return true;
    } else {
      setIsValidEmail(false);
      return false;
    }
  }

  const validatePassword = (value) => {
    const lengthPattern = /^.{8,}$/;
    const capitalLetterPattern = /[A-Z]/;
    const numberPattern = /\d/;
    const specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    let flag = true;

    if (lengthPattern.test(value)) {
      setIsEight(true);
    } else {
      setIsEight(false);
      flag = false;
    }

    if (capitalLetterPattern.test(value)) {
      setIsCapital(true);
    } else {
      setIsCapital(false);
      flag = false;
    }

    if (numberPattern.test(value)) {
      setIsNumber(true);
    } else {
      setIsNumber(false);
      flag = false;
    }

    if (specialCharacterPattern.test(value)) {
      setIsSpecial(true);
    } else {
      setIsSpecial(false);
      flag = false;
    }

    setIsValidPassword(flag)
    return flag;
  }

  const isFormValidation = () => {
    if (validateEmail(email) && validatePassword(password)) {
      return true;
    }
    return false;
  }

  const goToNext = () => {
    if (isFormValidation()) {
      navigation.navigate('Name');
    }
  }

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  }

  const handlePasswordChange = (newPassword) => {
    validatePassword(newPassword);
    setPassword(newPassword);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingTop: 100, paddingBottom: 60, paddingLeft: 36, paddingRight: 36 }}>
        <View>
          <Text style={{ ...FONTS.body3, color: COLORS.lighterGray }}>Welcome to Tunnel.</Text>
          <Text style={{ ...FONTS.body3, color: COLORS.white }}>Create your account.</Text>
        </View>
        <View style={{ paddingTop: 32, gap: 16 }}>
          <View style={[styles.email, { borderColor: isValidEmail ? COLORS.gray : COLORS.red }]}>
            <TextInput
              keyboardType='email-address'
              placeholder='Email'
              placeholderTextColor={COLORS.lightGray}
              style={[styles.input, { flex: 1 }]}
              value={email}
              onChangeText={handleEmailChange}
            />
            <View style={{ padding: 13, display: isValidEmail ? 'none' : 'flex' }}>
              <Text style={styles.invalidText}>Invalid</Text>
            </View>
          </View>
          <TextInput
            secureTextEntry={true}
            placeholder='Password'
            placeholderTextColor={COLORS.lightGray}
            style={[styles.input, { borderWidth: 1, borderColor: isValidPassword ? COLORS.white : COLORS.lightGray }]}
            value={password}
            onChangeText={handlePasswordChange}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: 16, paddingTop: 14 }}>
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Image
                source={icons.cancel}
                resizeMode="cover"
                style={[styles.icon, { tintColor: isEight ? COLORS.white : COLORS.lightGray }]}
              />
              <Text style={[styles.iconText, { color: isEight ? COLORS.white : COLORS.lightGray }]}>8 characters</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Image
                source={icons.cancel}
                resizeMode="cover"
                style={[styles.icon, { tintColor: isCapital ? COLORS.white : COLORS.lightGray, }]}
              />
              <Text style={[styles.iconText, { color: isCapital ? COLORS.white : COLORS.lightGray, }]}>1 capital letter</Text>
            </View>
          </View>
          <View style={{ gap: SIZES.base }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Image
                source={icons.cancel}
                resizeMode="cover"
                style={[styles.icon, { tintColor: isNumber ? COLORS.white : COLORS.lightGray, }]}
              />
              <Text style={[styles.iconText, { color: isNumber ? COLORS.white : COLORS.lightGray, }]}>Any number</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Image
                source={icons.cancel}
                resizeMode="cover"
                style={[styles.icon, { tintColor: isSpecial ? COLORS.white : COLORS.lightGray, }]}
              />
              <Text style={[styles.iconText, { color: isSpecial ? COLORS.white : COLORS.lightGray, }]}>Any special characters</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={goToNext}
          disabled={!email || !password}
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
              backgroundColor: (email && password) ? COLORS.white : COLORS.lightWhite,
            }}
          >
            <Text style={{ color: (email && password) ? COLORS.black : COLORS.lightGray, ...FONTS.body4 }}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
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
  email: {
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    paddingLeft: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
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
export default EmailPassword;
