import {StyleSheet} from 'react-native';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    finalBtn: {
      
    },
    edit: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
    },
    imageHolder: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      marginVertical: 10,
      borderColor: '#48301f',
      borderWidth: 1,
      borderStyle: 'dashed',
    },
    imgTxt: {
      color: '#c6ab80',
      fontFamily: 'Poppins-Light',
      fontSize: 16,
      lineHeight: 55,
    },
    close: {
      width: 18,
      height: 18,
      resizeMode: 'contain',
    },
    closeSmall: {
      width: 13,
      height: 13,
      resizeMode: 'contain',
    },
    sheetHead: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#c6ab80',
    },
    sheetText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 20,
      color: '#48301f',
    },
    chooseView: {
      backgroundColor: '#fff',
      borderRadius: 10,
      height: 100,
      width: 275,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      alignSelf: 'center',
    },
    cameraHolder: {
      backgroundColor: '#48301f',
      height: 50,
      width: 60,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    galleryHolder: {
      backgroundColor: '#48301f',
      height: 50,
      width: 60,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    camera: {
      height: 35,
      width: 35,
    },
    gallery: {
      height: 35,
      width: 35,
    },
    uploadedImage: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
  });

export default style;
