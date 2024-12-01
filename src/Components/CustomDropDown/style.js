import {StyleSheet} from 'react-native';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    detailDrop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    descriptionDropHead: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      color: '#000',
    },
    inDropItems:{
      borderBottomColor:'#c0c0c0',
      borderBottomWidth:StyleSheet.hairlineWidth,
      paddingVertical:5
    }
  });

export default style;
