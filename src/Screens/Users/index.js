import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NavigationBack from '../../common/NavigationBack';
import {useDimensionContext} from '../../Context';
import firestore from '@react-native-firebase/firestore';
import style from './style';
import CustomTextInput from '../../Components/CustomTextInput';
import Snackbar from 'react-native-snackbar';
import EmptyData from '../../common/EmptyData';

const Users = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Users',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
  );

  const getUser = async () => {
    await firestore()
      .collection('Users')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No users found!',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#d20a2e',
            textColor: 'white',
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setUsers(objArray);
        }
      });
  };

  const Header = () => {
    return (
      <CustomTextInput
        width={'95%'}
        border={true}
        value={searchText}
        placeholder={'Search here ...'}
        onChangeText={text => handleSearch(text)}
        icon={
          <Image
            style={responsiveStyle.searchIcon}
            source={require('../../assets/images/images/search-footer-brown.png')}
          />
        }
      />
    );
  };

  const handleSearch = async text => {
    setSearchText(text);
    await firestore()
      .collection('Users')
      .orderBy('username')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No results found!',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#d20a2e',
            textColor: 'white',
          });
          setUsers([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setUsers(objArray);
        }
      });
  };

  const BlockUser = ({data}) => (
    <TouchableOpacity
      onPress={() => handleBlockUser(data)}
      style={{
        position: 'absolute',
        top: 30,
        right: 0,
        backgroundColor: '#fff',
        padding: 5,
      }}>
      <Text
        style={{
          color: data?.active ? '#d20a2e' : 'green',
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
        }}>
        {data?.active ? 'Block' : 'Unblock'}
      </Text>
    </TouchableOpacity>
  );

  const handleBlockUser = async data => {
    try {
      await firestore()
        .collection('Users')
        .doc(data.id)
        .update({
          active: data?.active ? false : true,
        })
        .then(() => {
          const updated_users = users.map(obj => {
            if (obj?.id === data?.id) {
              obj.active = data?.active ? false : true;
            }
            return obj;
          });
          Snackbar.show({
            text: 'User status updated successfully!',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#28a745',
            textColor: 'white',
          });
          setUsers(updated_users);
        });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <FlatList
      style={responsiveStyle.container}
      data={users}
      extraData={users}
      ListHeaderComponent={() => <Header />}
      ListEmptyComponent={() => <EmptyData />}
      contentContainerStyle={{paddingBottom: 50}}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        if (item.username === 'Admin') {
          return null;
        } else {
          return (
            <View style={responsiveStyle.userContainer}>
              <Image
                source={
                  item?.profileimage
                    ? {uri: item?.profileimage}
                    : require('../../assets/images/images/profile-drawer.jpeg')
                }
                style={responsiveStyle.image}
              />
              <View style={responsiveStyle.textsView}>
                <Text style={responsiveStyle.textsName}>{item?.username}</Text>
                <Text style={responsiveStyle.textsMail}>{item?.email}</Text>
                <Text style={responsiveStyle.texts}>{item?.mobilenumber}</Text>
              </View>
              <BlockUser data={item} indexItem={index} />
            </View>
          );
        }
      }}
    />
  );
};

export default Users;
