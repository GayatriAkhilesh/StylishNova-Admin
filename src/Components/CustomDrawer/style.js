import {StyleSheet} from 'react-native';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    items: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    secondMain: {
      marginTop: 20,
    },
    inDrawerView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    drawerImage: {
      width: 23,
      height: 23,
      resizeMode: 'contain',
      marginRight: 15,
      marginLeft:10,
    },
    drawerText:{
      fontFamily:'Poppins-Regular',
      fontSize:18,
      color:'#48301f',
    },
    rightArrow:{
      width: 35,
      height: 35,
      resizeMode: 'contain',
    },
    headView:{
      width:'100%',
      padding:10,
      marginTop:20,
      borderBottomWidth:StyleSheet.hairlineWidth,
      borderBottomColor:'#c6ab80',
    },
    drawerHead:{
      fontFamily:'Poppins-Light',
      fontSize:20,
      color:'#48301f',
      alignSelf:'center',

    },
    drawersubTxt:{
      fontFamily:'Poppins-Light',
      fontSize:15,
      color:'#48301f',
      alignSelf:'center',

    },
  });

export default style;
