import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useDimensionContext} from '../../Context';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {signout} from '../../store/action';
import {Screen} from 'react-native-screens';

const CustomDrawer = () => {
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

  const contents = [
    {
      itemId: 0,
      itemName: 'Home',
      navigationTo: 'Footer',
      icon: require('../../assets/images/images/home-admin.png'),
    },
    {
      itemId: 1,
      itemName: 'Products',
      navigationTo: {
        name: 'SideBar',
        params: {
          screen: 'Footer',
          params: {
            screen: 'StackNav',
            params: {
              screen: 'Products',
            },
          },
        },
      },
      icon: require('../../assets/images/images/Products-admin.png'),
    },
    
    {
      itemId: 2,
      itemName: 'Categories',
      navigationTo: {
        name: 'SideBar',
        params: {
          screen: 'Footer',
          params: {
            screen: 'StackNav',
            params: {
              screen: 'Categories',
            },
          },
        },
      },
      icon: require('../../assets/images/images/category-admin.png'),
    },
    {
      itemId: 3,
      itemName: 'Orders',
      navigationTo: {
        name: 'SideBar',
        params: {
          screen: 'Footer',
          params: {
            screen: 'StackNav',
            params: {
              screen: 'Orders',
            },
          },
        },
      },
      icon: require('../../assets/images/images/order-admin.png'),
    },
    {
      itemId: 4,
      itemName: 'Offers',
      navigationTo: {
        name: 'SideBar',
        params: {
          screen: 'Footer',
          params: {
            screen: 'StackNav',
            params: {
              screen: 'Offers',
            },
          },
        },
      },
      icon: require('../../assets/images/images/offers-admin.png'),
    },
    {
      itemId: 5,
      itemName: 'Reviews',
      navigationTo: 'Footer',
      icon: require('../../assets/images/images/review-admin.png'),
    },
    {
      itemId: 6,
      itemName: 'Banners',
      navigationTo: 'Banners',
      icon: require('../../assets/images/images/banners-admin.png'),
    },
    {
      itemId: 7,
      itemName: 'Logout',
      onPress: handleSignOut,
      icon: require('../../assets/images/images/logout-admin.png'),
    },
  ];

  const handleTouch = (itemData) => {
    if (itemData.navigationTo) {
      if (typeof itemData.navigationTo === 'string') {
        navigation.navigate(itemData.navigationTo);
      } else {
        navigation.navigate(itemData.navigationTo.name, {
          screen: itemData.navigationTo.params.screen,
          params: itemData.navigationTo.params.params,
        });
      }
    } else if (itemData.onPress) {
      itemData.onPress();
    }
  };
  

  

  return (
    <View>
      <View style={responsiveStyle.headView}>
        <Text style={responsiveStyle.drawerHead}>Admin</Text>
        <Text style={responsiveStyle.drawersubTxt}>admin@yopmail.com</Text>
      </View>
      <View style={responsiveStyle.secondMain}>
        {contents.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => handleTouch(item)}
              key={String(item.itemId)}
              style={responsiveStyle.items}>
              <View style={responsiveStyle.inDrawerView}>
                <Image style={responsiveStyle.drawerImage} source={item.icon} />
                <Text style={responsiveStyle.drawerText}>{item.itemName}</Text>
              </View>
              <Image
                style={responsiveStyle.rightArrow}
                source={require('../../assets/images/images/right-sign-admin.png')}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 60,
        }}>
        <Image
          source={require('../../assets/images/images/BLACK-WRITTEN-LOGO.png')}
          style={{
            width: 230,
            height: 50,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            fontSize: 10,
            fontFamily: 'Poppins-Light',
            color: '#000',
          }}>
          © Copyright 2024. All Rights Reserved
        </Text>
      </View>
    </View>
  );
};
export default CustomDrawer;
