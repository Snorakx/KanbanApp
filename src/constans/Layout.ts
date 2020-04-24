import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const wp = (percentage: number) => {
  const value = (percentage * width) / 100;
  return Math.round(value);
};

export default {
  window: {
    width,
    height
  },
  wp,
  statusBar: Constants.statusBarHeight,
  isSmallDevice: width < 375
};
