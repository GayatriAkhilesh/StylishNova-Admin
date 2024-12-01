import {StyleSheet} from 'react-native';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    proImage: {
      width: width * 0.9,
      height: width * 0.8,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: 20,
    },
    secondView: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 15,
      marginTop: 10,
    },
    name: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 22,
      color: '#000',
      marginBottom: 3,
    },
    description: {
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      color: '#000',
      marginBottom: 3,
    },
    price: {
      fontFamily: 'Poppins-Regular',
      fontSize: 18,
      color: '#000',
      marginBottom: 3,
    },
    greenTxt: {
      fontFamily: 'Poppins-Regular',
      fontSize: 18,
      color: '#c6ab80',
      marginBottom: 3,
    },
    dropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    timeView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: width * 0.45,
      justifyContent: 'space-evenly',
      backgroundColor: '#E9EAEC',

      padding: 5,
      borderRadius: 5,
    },
    timeText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 15,
    },
    descriptionDropHead: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
      color: '#000',
    },
    description: {
      fontFamily: 'Poppins-Regular',
      fontSize: 13,
      color: '#48301f',
      lineHeight: 30,
    },
    detailDrop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    detailedText: {
      fontFamily: 'Poppins-Regular',
    },
    descView: {
      borderBottomWidth: 1,
      borderBottomColor: '#C0C0C0',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#C0C0C0',
      paddingBottom: 10,
      backgroundColor:'#fff',
      padding:15,
    },
    descriptionHead: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 18,
      color: '#000',
      paddingVertical:8,
    },
    description: {
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      color: '#48301f',
    },
    edit:{
      width:25,
      height:25,
      resizeMode:'contain',
    },
    close:{
      width:20,
      height:20,
      resizeMode:'contain',
    },
    sheetHead:{
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems:'center',
    },
    sheetText:{
      fontFamily:'Poppins-SemiBold',
      fontSize:20,
      color:'#48301f'
    }
  });

export default style;
