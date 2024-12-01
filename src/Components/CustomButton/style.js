import {StyleSheet} from 'react-native';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    mainView:{
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        padding:10,
        // borderRadius:28,
        backgroundColor:'#48301f',
        alignSelf:'center',
        marginVertical:18,
    },
    txt:{
        fontSize:20,
        color:'#fff',
        fontFamily:'Poppins-SemiBold',
    }
  });

export default style;
