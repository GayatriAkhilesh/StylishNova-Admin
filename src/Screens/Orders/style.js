import {StyleSheet} from 'react-native';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
    },
    image: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
      overflow: 'hidden',
    },
    userContainer: {
      marginVertical: 8,
      borderRadius: 15,
      width: '95%',
      backgroundColor: '#efdecd',
      alignSelf: 'center',
      padding: 10,
    },
    textsView: {
      marginLeft: 10,
      justifyContent: 'space-evenly',
      overflow: 'hidden',
      width: '95%',
    },
    texts: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      color: '#48301f',
      lineHeight:25,
    },
    textsName: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
      color: '#48301f',
    },
    textsMail: {
      fontFamily: 'Poppins-Light',
      fontSize: 12,
      color: '#f42248',
    },
    searchIcon: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
    },
    upperView:{
      width:500,
      borderBottomWidth:1,
      borderBottomColor:'#000',
      marginVertical:15,
    },
    downView:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    }
  });

export default style;
