import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDimensionContext} from '../../Context';
import style from './style';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';
import { login } from '../../store/action';

const Login = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const [securedTextEntry, setSecuredTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (email.trim() === 'admin@gmail.com' && password.trim() === '143') {
      await firestore()
        .collection('Users')
        .where('email', '==', email.trim().toLocaleLowerCase())
        .get()
        .then(async snapshot => {
          if (!snapshot.empty) {
            snapshot.forEach(documentSnapshot => {
              const respData = documentSnapshot.data();
              if (password.trim() === respData.password) {

                dispatch(login({userId: documentSnapshot.id}))

                Snackbar.show({
                  text: 'Login Successfull',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: 'green',
                  textColor: 'white',
                });
              } else {
                Snackbar.show({
                  text: 'The Password is incorrect.',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: '#d20a2e',
                  textColor: 'white',
                });
              }
            });
          }
        })
        .catch(err => console.warn(err));
    } else {
      Snackbar.show({
        text: 'The entered credentials are wrong. Please recheck.',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#d20a2e',
        textColor: 'white',
      });
    }
  };

  const handleSecuredTextEntry = () => {
    setSecuredTextEntry(!securedTextEntry);
  };

  return (
    <View style={responsiveStyle.container}>
      <Image
        source={require('../../assets/images/images/aesthetic-login.png')}
        style={responsiveStyle.bgImage}
      />
      <ScrollView style={responsiveStyle.content}>
        <Image
          source={require('../../assets/images/images/BLACK-WRITTEN-LOGO.png')}
          style={responsiveStyle.logo}
        />
        <CustomTextInput
          width={'90%'}
          border={true}
          placeholder={'E-mail'}
          onChangeText={text => setEmail(text)}
        />
        <CustomTextInput
          width={'90%'}
          onChangeText={text => setPassword(text)}
          border={true}
          placeholder={'Password'}
          securedTextEntry={securedTextEntry}
          icon={
            <TouchableOpacity onPress={handleSecuredTextEntry}>
              <Image
                source={
                  securedTextEntry
                    ? require('../../assets/images/images/hide-eye.png')
                    : require('../../assets/images/images/eye-open.png')
                }
                style={responsiveStyle.boxIcon}
              />
            </TouchableOpacity>
          }
        />
        <CustomButton text={'Login'} onPress={handleLogin} />
      </ScrollView>
    </View>
  );
};

export default Login;
