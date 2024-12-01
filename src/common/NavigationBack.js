import {TouchableOpacity, Image} from 'react-native';
import React from 'react';

const NavigationBack = props => {
  const { handleButtonPress} = props;
  return (
    <TouchableOpacity onPress={handleButtonPress}>
      <Image
        source={require('../assets/images/images/left-arrow-header.png')}
        style={{
          width: 20,
          height: 20,
          resizeMode: 'contain',
          marginRight: 10,
        }}
      />
    </TouchableOpacity>
  );
};
export default NavigationBack;
