import {Text, View} from 'react-native';

const EmptyData = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 8,
        borderRadius: 15,
        width: '95%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 10,
      }}>
      <Text
        style={{fontFamily: 'Poppins-SemiBold', fontSize: 20, color: '#f42248'}}>
        No data found!
      </Text>
    </View>
  );
};

export default EmptyData;
