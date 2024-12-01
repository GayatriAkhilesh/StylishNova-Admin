import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useLayoutEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import EmptyData from '../../common/EmptyData';
import CustomTextInput from '../../Components/CustomTextInput';
import {useDimensionContext} from '../../Context';
import style from './style';
import NavigationBack from '../../common/NavigationBack';
import moment from 'moment';

const Orders = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();

  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Orders',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, []),
  );

  const getOrders = async () => {
    try {
      const snapshot = await firestore().collection('Orders').get();
      if (snapshot.empty) {
        Snackbar.show({
          text: 'No Orders found!',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#d20a2e',
          textColor: 'white',
        });
      } else {
        const objArray = snapshot.docs.map(document => ({
          id: document.id,
          ...document.data(),
        }));
        setOrders(objArray);
        console.log('objArray', objArray);
        console.log('setorders', setOrders);
      }
    } catch (error) {
      Snackbar.show({
        text: 'Failed to fetch orders. Please try again later.',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#d20a2e',
        textColor: 'white',
      });
    }
  };

  const handleSearch = async text => {
    setSearchText(text);
    await firestore()
      .collection('Orders')
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
          setOrders([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOrders(objArray);
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

  const dateFormat = time => {
    return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
  };

  return (
    <FlatList
      style={responsiveStyle.container}
      data={orders}
      extraData={orders}
      ListHeaderComponent={() => <Header />}
      ListEmptyComponent={() => <EmptyData />}
      contentContainerStyle={{paddingBottom: 50}}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({item, index}) => {
        if (item.username === 'Admin') {
          return null;
        } else {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('OrderDetails', {order: item})}
              style={responsiveStyle.userContainer}>
              <View style={responsiveStyle.textsView}>
                <View style={responsiveStyle.upperView}>
                  <Text style={responsiveStyle.textsName}>
                    ID: #{item.orderId || 'N/A'}
                  </Text>
                  <Text>Ordered on: {dateFormat(item.created)}</Text>
                  <Text style={responsiveStyle.texts}>
                    Paid: ₹ {item.totalAmount || 'N/A'}
                  </Text>
                  <Text style={responsiveStyle.texts}>
                    {item.address ||
                      'HA Restro Caps Villa, 836532, London, US.'}
                  </Text>
                </View>
                <View style={responsiveStyle.downView}>
                  <Text style={responsiveStyle.textsMail}>
                    {typeof item.orderStatus === 'string'
                      ? item.orderStatus
                      : item.orderStatus?.name || 'Unknown Status'}
                  </Text>

                  <Text>Rate & Preview order</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }
      }}
    />
  );
};

export default Orders;
