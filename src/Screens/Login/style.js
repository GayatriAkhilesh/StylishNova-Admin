import {StyleSheet} from 'react-native';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container:{
      flex:1,
    },
    bgImage:{
        width:'100%',
        height:200,
    },
    logo:{
      width:'75%',
      height:45,
      resizeMode:'contain',
      alignSelf:'center',
     marginTop:15,
    },
    content:{
      marginTop:-25,
      borderTopLeftRadius:25,
      borderTopRightRadius:25,
      backgroundColor:'#f8f8f8',
    },
    boxIcon:{
      width:25,
      height:25,
      resizeMode:'contain',
    }
  });

export default style;
