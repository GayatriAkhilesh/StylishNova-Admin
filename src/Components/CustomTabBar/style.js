import {StyleSheet} from 'react-native';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 50,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    footerText: {
      fontSize: 10,
      fontFamily: 'Poppins-Light',
      color: '#000',
      alignSelf:'center',
    },
  });

export default style;
