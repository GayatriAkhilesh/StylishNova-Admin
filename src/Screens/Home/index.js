import {useNavigation} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {useDimensionContext} from '../../Context';
import style from './style';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {signout} from '../../store/action';

const Home = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signout());
  };

  const [orders, setOrders] = useState(0);
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [offers, setOffers] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [banners, setBanners] = useState(0);

  useEffect(() => {
    getAllCount();
  }, []);

  const getAllCount = async () => {
    const productRef = await firestore().collection('Products').get();
    const userRef = await firestore().collection('Users').get();
    const ordersRef = await firestore().collection('Orders').get();
    const offersRef = await firestore().collection('Offers').get();
    const reviewsRef = await firestore().collection('Reviews').get();
    const bannersRef = await firestore().collection('Banners').get();

    setProducts(productRef.size);
    setUsers(userRef.size);
    setOrders(ordersRef.size);
    setOffers(offersRef.size);
    setReviews(reviewsRef.size);
    setBanners(bannersRef.size);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Admin Panel',
      
      headerRight: () => (
        <Image
          source={require('../../assets/images/images/BLACK-LOGO.png')}
          style={{
            width: 280,
            height: 85,
            resizeMode: 'contain',
            marginRight: -120,
          }}
        />
      ),
      headerTitleStyle:{fontSize: 20, 
        color: '#c6ab80', 
        fontFamily: 'Poppins-Light', }
    });
  }, [navigation]);

  const data = [
    {key: 'Orders', value: orders, screen: 'Orders'},
    {key: 'Products', value: products, screen: 'Products'},
    {key: 'Offers', value: offers, screen: 'Offers'},
    {key: 'Reviews', value: reviews, screen: 'Reviews'},
    {key: 'Banners', value: banners, screen: 'Banners'},
    {key: 'Users', value: users, screen: 'Users'},
    {key: 'Profile', value: products, screen: 'Profile'},
    {
      key: 'Logout',
      value: '',
      icon: require('../../assets/images/images/logout.png'),
      onPress: handleSignOut,
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={responsiveStyle.container}
      showsVerticalScrollIndicator={false}>
      {data.map(item => (
        <TouchableOpacity
          key={item.key}
          onPress={() => {
            if (item.onPress) {
              item.onPress();
            } else if (item.screen) {
              navigation.navigate(item.screen);
            } else {
              console.warn(`No action defined for ${item.key}`);
            }
          }}
          style={responsiveStyle.firstBox}>
          <View style={responsiveStyle.innerSpace}>
            <View style={responsiveStyle.innerView}>
              {item.value !== '' && (
                <Text style={responsiveStyle.firstText}>{item.value}</Text>
              )}
              <Image style={responsiveStyle.icons} source={item.icon} />
            </View>
            <Text style={responsiveStyle.secondText}>{item.key}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Home;
