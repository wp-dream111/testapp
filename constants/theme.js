import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  //base colors
  primary: '#5390ff',
  secondary: '#cacfd9',
  //colors
  black: '#1E1F20',
  white: '#FFFFFF',
  lightWhite: '#A8A8A8',
  lighterGray: '#575757',
  lightGray: '#494949',
  gray: '#292929',
  red: '#ff0000',
};

export const SIZES = {
  //global size
  base: 8,
  font: 14,
  radius: 10,
  padding: 24,
  //font sizes
  largeTitle: 50,
  h1: 30,
  h2: 20,
  h3: 18,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 20,
  body3: 18,
  body4: 14,
  body5: 12,
  body6: 8,
  //app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: { fontFamily: "Roboto-Black", fontSize: SIZES.largeTitle, lineHeight: 55 },
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 24 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 20 },
  h5: { fontFamily: "Roboto-Bold", fontSize: SIZES.h5, lineHeight: 14 },
  body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 24 },
  body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 20 },
  body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 14 },
  body6: { fontFamily: "Roboto-Regular", fontSize: SIZES.body6, lineHeight: 10 },
}

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;