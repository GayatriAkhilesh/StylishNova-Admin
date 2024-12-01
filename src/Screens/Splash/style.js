import {StyleSheet} from 'react-native';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    imagesplash:{
        width:width,
        height:height,
        resizeMode:'cover',
        alignSelf:'center',
    }
  });

export default style;
