import {StyleSheet} from 'react-native';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
    },
    image: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
      overflow: 'hidden',
    },
    userContainer: {
      marginVertical:2,
      marginHorizontal:2,
      justifyContent:"space-evenly",
      width:'49%',
      height:height * 0.35,
      backgroundColor:'#fff',
      alignSelf:'center',
      padding:8,
      borderColor:'#c6c6c6',
      borderWidth:StyleSheet.hairlineWidth,
    },
    imageHolder:{
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#fff',
      width:'100%',
      height:'50%'
    },
    textsView:{
      marginLeft:10,
      justifyContent:'space-evenly',
      overflow:'hidden',
      width:'90%',
      alignSelf:'center',
    },
    texts:{
      fontFamily:'Poppins-SemiBold',
      fontSize:14,
      color:'#48301f',
    },
    textsName:{
      fontFamily:'Poppins-SemiBold',
      fontSize:16,
      color:'#48301f',
    },
    textsMail:{
      fontFamily:'Poppins-Light',
      fontSize:10,
      color:'#48301f',
    },
    searchIcon:{
      width:25,
      height:25,
      resizeMode:'contain',
    },
    edit:{
      width:25,
      height:25,
      resizeMode:'contain',
    },
    editDlt:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      
    }
  });

export default style;
