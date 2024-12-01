import {StyleSheet} from 'react-native';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 15,
      
    },
    logoOnLeft:{
      width:120,
      height:25,
    },
    firstBox: {
      width: '94%',
      height: 70,
      borderWidth: 2,
      borderColor: '#c6ab80',
      backgroundColor: '#fff',
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 8,
      justifyContent:'flex-end',
      alignItems:'flex-end',
    },

    firstText: {
      color: '#c6ab80',
      fontFamily: 'Poppins-Regular',
      fontSize: 30,
    },
    secondText: {
      color: '#c6ab80',
      fontFamily: 'Poppins-Light',
      fontSize: 20,
      
    },
    innerView: {
      width: 120,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    icons: {
      height: 30,
      width: 30,
    },
    innerSpace:{
      width:'99%',
      flexDirection:'row',
      alignItems:'center',
       justifyContent:'space-evenly',
    }
  });

export default style;
