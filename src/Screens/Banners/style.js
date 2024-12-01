import {StyleSheet} from 'react-native';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    edit: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
    },
    banner: {
      width: width * 0.95,
      height: height * 0.25,
      resizeMode: 'cover',
      marginVertical: 10,
    },
    mainView: {
      padding: 15,
      backgroundColor: '#48301f',
    },
    close: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
    },
    sheetHead: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
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
    closeSmall: {
      width: 13,
      height: 13,
      resizeMode: 'contain',
    },
    uploadedImage: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    imagesImg: {
      alignSelf: 'center',
    },
    imgPickerView: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      marginVertical: 10,
      borderColor: '#48301f',
      borderWidth: 1,
      borderStyle: 'dashed',
      height: height*0.18
    },
  });

export default style;
