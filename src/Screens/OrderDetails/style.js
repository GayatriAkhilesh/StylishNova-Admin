import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    mainView:{
      flex:1,
    },
    scrollView: {
      padding: 15,
    },
    firstBox: {
      backgroundColor: '#48301f',
      borderRadius: 15,
      padding: 15,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical:15,
    },
    orderId: {
      color: '#fff',
      fontFamily: 'Poppins-Light',
      fontSize: 20,
    },
    orderStatus: {
      color: '#fff',
      fontFamily: 'Poppins-Regular',
      fontSize: 15,
    },
    txtView: {
      marginLeft: 15,
    },
    disView: {
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'center',
      marginVertical: 5,
    },
    inDisView: {
      width: '50%',
      overflow: 'hidden',
      marginLeft:15,
    },
    quaView: {
      backgroundColor: '#48301f',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      marginRight: 15,
    },
    quaText: {
      color: '#fff',
      fontFamily: 'Poppins-Semibold',
      fontSize: 18,
    },
    secondMainView: {
      marginVertical: 15,
    },
    headTxt:{
      color:'#48301f',
      fontFamily:'Poppins-SemiBold',
      fontSize:22,
    },
    nameTxt:{
      color: '#000',
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
    },
    disText:{
      color: '#000',
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
    },
    priceText:{
      color: '#000',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 14,
    },
    thirdMainView:{
      marginVertical:15,
    },
    thirdView:{
      marginVertical:10,
      justifyContent:'space-between',
      flexDirection:'row',
      paddingBottom:20,
      alignItems:'center',
      borderBottomColor:'#000',
      borderBottomWidth:1,
    },
    couponTxt:{
      color: '#d20a2e',
      lineHeight:28,
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
    },
    thirdtexts:{
      color: '#000',
      lineHeight:28,
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
    },
    inThirdView:{
      alignItems:'flex-end',
    },
    totalAmtText:{
      color:'#000',
      fontFamily:'Poppins-SemiBold',
      fontSize:20,
    },
    totalAmtView:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    },
    card:{
      marginVertical:15,
      justifyContent:'flex-start',
      alignItems:'center',
      flexDirection:'row',
    },
    cardDetails:{
      marginLeft:15,
    },
    finalBtn:{
      position:'absolute',
      bottom:0,
      width:'100%',
      padding:15,
      backgroundColor:'#fff',
    },
    activityIndi:{
      height:'100%',
      width:'100%',
      backgroundColor:'rgba(0,0,0,0.7)',
      justifyContent:'center',
      alignItems:'center',
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
