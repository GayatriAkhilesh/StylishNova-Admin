import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    main: {
      flex: 1,
    },
    container: {
      height: height,
    },
    reviewCard: {
      backgroundColor: '#f2f2f2',
      borderRadius: 8,
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    reviewUser: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#48301f',
    },
    reviewText: {
      fontSize: 14,
      color: '#000',
      marginBottom: 10,
    },
    adminReply: {
      fontSize: 13,
      color: 'green',
      marginTop: 5,
    },
    replyButton: {
      alignSelf: 'flex-start',
      backgroundColor: '#48301f',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    replyButtonText: {
      fontSize: 14,
      color: '#fff',
    },
    ItemHedText: {
      color: '#48301f',
      fontSize: 22,
      fontWeight: 'bold',
    },
  });

export default style;
