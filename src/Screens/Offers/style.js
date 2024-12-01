import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    main: {
      flex: 1,
    },
    container: {
      height: height,
    },
    contentStyle: {
      alignSelf: 'center',
      marginVertical: height * 0.05,
    },
    renderView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: width,
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: height * 0.018,
    },
    offCircleView: {
      marginRight: (-height * 0.025) / 2,
      zIndex: 99,
    },
    circleRight: {
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: '#f2f2f2',
    },
    circleCenter: {
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor:'#f2f2f2',
      marginTop: -25 / 2,
    },
    ItemHedText: {
      color: '#48301f',
      fontFamily: 'Lato-Black',
      fontSize: 25,
    },
    ChooseIconView: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    ChooseIconText: {
      color: '#000',
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      marginTop: 10,
    },
  });

export default style;
