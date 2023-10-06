import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, SIZES, images, FONTS } from '../../constants';

const Loading = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 5000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', gap: 36 }}>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: COLORS.white,
              marginTop: SIZES.padding,
              textAlign: 'center',
              ...FONTS.body4,
            }}
          >
            Creating your account...
          </Text>
        </View>
        <Image
          source={images.loading}
          resizeMode="contain"
          style={{
            width: '40%',
          }}
        />
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
});
export default Loading;
