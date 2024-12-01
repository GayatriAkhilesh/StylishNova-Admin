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
      borderRadius: 40,
      overflow: 'hidden',
    },
    userContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical:8,
      borderRadius:15,
      width:'95%',
      backgroundColor:'#481f22',
      alignSelf:'center',
      padding:10,
    },
    textsView:{
      marginLeft:10,
      justifyContent:'space-evenly',
    },
    texts:{
      fontFamily:'Poppins-Regular',
      fontSize:14,
      color:'#c6ab80',
    },
    textsName:{
      fontFamily:'Poppins-SemiBold',
      fontSize:16,
      color:'#c6ab80',
    },
    textsMail:{
      fontFamily:'Poppins-Light',
      fontSize:10,
      color:'#f42248',
    },
    searchIcon:{
      width:25,
      height:25,
      resizeMode:'contain',
    },
    blkBtn:{
      
    },
    blkTxt:{
      
    }
  });

export default style;
