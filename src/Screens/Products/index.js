import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useLayoutEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import EmptyData from '../../common/EmptyData';
import CustomTextInput from '../../Components/CustomTextInput';
import {useDimensionContext} from '../../Context';
import style from './style';
import NavigationBack from '../../common/NavigationBack';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Products = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Products',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateProduct', {type: 'create'})}>
        <Image
          style={responsiveStyle.edit}
          source={require('../../assets/images/images/plus-product.png')}
        />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, []),
  );

  const getProducts = async () => {
    await firestore()
      .collection('Products')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Products found!',
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
          setProducts(objArray);
        }
      });
  };

  const handleSearch = async text => {
    setSearchText(text);
    await firestore()
      .collection('Products')
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
          setProducts([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setProducts(objArray);
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
  const handleEdit = productData => {
    navigation.navigate('CreateProduct', {type: 'edit', data: productData});
  };
  const handleDelete = async productData => {
    Alert.alert(
      'Confirm Delete!',
      'Do you want to delete this product! Later it will not be avaiable in the user app!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await firestore()
              .collection('Products')
              .doc(productData.id)
              .delete()
              .then(() => {
                Snackbar.show({
                  text: 'Product Deleted Successfully',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: 'green',
                  textColor: 'white',
                });
              });
            getProducts();
          },
        },
      ],
    );
  };

  return (
    <FlatList
      style={responsiveStyle.container}
      data={products}
      extraData={products}
      numColumns={2}
      ListHeaderComponent={() => <Header />}
      ListEmptyComponent={() => <EmptyData />}
      contentContainerStyle={{paddingBottom: 50}}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        if (item.username === 'Admin') {
          return null;
        } else {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetails', {product: item})
              }
              style={responsiveStyle.userContainer}>
              <View style={responsiveStyle.imageHolder}>
                <Image
                  source={
                    item?.image
                      ? {uri: item?.image}
                      : require('../../assets/images/images/profile-drawer.jpeg')
                  }
                  style={responsiveStyle.image}
                />
              </View>
              <View style={responsiveStyle.textsView}>
                <Text style={responsiveStyle.textsName}>{item?.name}</Text>
                <Text style={responsiveStyle.textsMail} numberOfLines={2}>
                  {item?.description}
                </Text>
                <Text style={responsiveStyle.texts}>₹ {item?.price}</Text>
              </View>
              <View style={responsiveStyle.editDlt}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Feather name="edit" size={25} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <MaterialCommunityIcons
                    name="delete-empty-outline"
                    size={30}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }
      }}
    />
  );
};

export default Products;
