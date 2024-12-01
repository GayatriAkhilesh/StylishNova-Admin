import {Text, TextInput, View} from 'react-native';
import {useDimensionContext} from '../../Context';
import style from './style';
import {useEffect, useState} from 'react';

const CustomTextInput = props => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const {
    placeholder,
    value,
    onChangeText,
    icon,
    border,
    width,
    securedTextEntry,
    multiline,
  } = props;

  return (
    <View
      style={{
        flexDirection: icon ? 'row' : 'column',
        borderWidth: border ? 1 : 0,
        borderColor: '#48301f',
        width: width,
        padding: 5,
        marginVertical: 10,
        alignSelf: 'center',
        alignItems: icon ? 'center' : 'baseline',
        justifyContent: 'space-between',
      }}>
      <TextInput
        selectionColor={'#48301f'}
        placeholderTextColor={'#c6ab80'}
        placeholder={placeholder}
        multiline={multiline}
        value={value}
        onChangeText={text => onChangeText(text)}
        secureTextEntry={securedTextEntry}
        style={[responsiveStyle.text, {height: multiline ? 100 : 'default'}]}
      />
      {icon ? icon : null}
    </View>
  );
};

export default CustomTextInput;
