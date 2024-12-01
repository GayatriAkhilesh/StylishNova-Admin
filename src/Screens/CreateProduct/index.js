import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDimensionContext} from '../../Context';
import style from './style';
import CustomButton from '../../Components/CustomButton';
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import NavigationBack from '../../common/NavigationBack';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from '../../Components/CustomTextInput';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import ActionSheet from 'react-native-actions-sheet';
import uploadImage from '../../common/storage';
import Snackbar from 'react-native-snackbar';
import CustomDropDown from '../../Components/CustomDropDown';

const CreateProduct = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const route = useRoute();
  const {type, data} = route.params;

  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const actionSheetRef = useRef(null);
  const [uploadUri, setUploadUri] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(
    data?.categoryId ? {id: data.categoryId, name: data.categoryName} : null,
  );
  const [qun, setQun] = useState(0);

  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setUploadUri(data.image || null);
      setDesc(data.description || '');
      setPrice(data.price || '');
      setQun(data?.quantity ?? 1);
    }
  }, [data]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: type === 'create' ? 'Create Product' : 'Edit Product',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation, type]);

  useFocusEffect(
    useCallback(() => {
      getCategories();
    }, []),
  );

  const getCategories = async () => {
    await firestore()
      .collection('Categories')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setCategories(objArray);
          setCategoryWithObj(objArray);
        }
      });
  };

  const setCategoryWithObj = objArray => {
    if (data && data.categoryId) {
      const selectedCategory = objArray.find(ele => ele.id === data.categoryId);
      if (selectedCategory) {
        setCategory(selectedCategory); // Set the category as an object
      }
    }
  };

  const handleCamera = async () => {
    const options = {
      mediaType: 'photo',
    };
    await launchCamera(options, response => {
      actionSheetRef.current?.hide();
      if (response && response?.assets) {
        setUploadUri(response?.assets[0]?.uri);
      }
    });
  };

  const handleGallery = async () => {
    const options = {
      mediaType: 'photo',
    };
    await launchImageLibrary(options, response => {
      actionSheetRef.current?.hide();
      if (response && response?.assets) {
        setUploadUri(response?.assets[0]?.uri);
      }
    });
  };

  const handleCreateProduct = async () => {
    console.log('Create button pressed');

    if (!category?.id || !category?.name) {
      Snackbar.show({
        text: 'Please select a category',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
        textColor: 'white',
      });
      return; // Prevent creating the product if category is not selected
    }


    try {
      const responseUri = await uploadImage(uploadUri);
      console.log('Image uploaded:', responseUri);
  
      const product = {
        created: Date.now(),
        updated: Date.now(),
        name: name,
        description: desc,
        categoryId: category.id,
        categoryName: category.name,
        price: price,
        quantity: qun,
        image: responseUri,
      };

      console.log('Product to add:', product);
  
      await firestore()
        .collection('Products')
        .add(product);
      Snackbar.show({
        text: 'Product Added Successfully',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'green',
        textColor: 'white',
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding product:', error);
      Snackbar.show({
        text: 'Failed to add product',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
        textColor: 'white',
      });
    }
  };
  

  const handleUpdateProduct = async () => {
    if (
      uploadUri &&
      name !== '' &&
      desc !== '' &&
      category !== '' &&
      qun !== 0 &&
      price !== ''
    ) {
      const responseUri = await uploadImage(uploadUri);
        console.log('Image uploaded:', responseUri)
      const product = {
        updated: Date.now(),
        name: name,
        description: desc,
        categoryId: category.id,
        categoryName: category.name,
        price: price,
        quantity: qun,
        image: responseUri,
      };

      await firestore()
        .collection('Products')
        .doc(data.id)
        .update(product)
        .then(() => {
          Snackbar.show({
            text: 'Product Updated Successfully',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'green',
            textColor: 'white',
          });
          navigation.goBack();
        });
    } else {
      Snackbar.show({
        text: 'All Fields Required',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
        textColor: 'white',
      });
    }
  };

  console.log('categories', categories);

  console.log('Current Category:', category);

  return (
    <ScrollView
      style={{padding: 15}}
      contentContainerStyle={{paddingBottom: 200}}
      showsVerticalScrollIndicator={false}>
      <ActionSheet ref={actionSheetRef}>
        <View style={{padding: 15}}>
          <View style={responsiveStyle.sheetHead}>
            <Text style={responsiveStyle.sheetText}>Select Option</Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <Image
                style={responsiveStyle.close}
                source={require('../../assets/images/images/close-brown.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={responsiveStyle.chooseView}>
            <TouchableOpacity onPress={handleCamera}>
              <Image
                source={require('../../assets/images/images/camera-brown.png')}
                style={responsiveStyle.camera}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGallery}>
              <Image
                source={require('../../assets/images/images/photo-brown.png')}
                style={responsiveStyle.gallery}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ActionSheet>
      <CustomTextInput
        width={'100%'}
        value={name}
        border={true}
        placeholder={'Name'}
        onChangeText={text => setName(text)}
      />
      <CustomTextInput
        width={'100%'}
        value={desc}
        border={true}
        placeholder={'Description'}
        onChangeText={text => setDesc(text)}
        multiline={true}
      />
      {categories?.length > 0 ? (
        <CustomDropDown
          data={categories}
          prevData={category}
          setData={obj => {
            setCategory(obj);
          }}
        />
      ) : null}

      <CustomTextInput
        width={'100%'}
        border={true}
        value={price}
        placeholder={'Price'}
        onChangeText={text => setPrice(text)}
      />
      <CustomTextInput
        width={'100%'}
        border={true}
        value={qun}
        placeholder={'Quantity'}
        onChangeText={text => setQun(Number(text))}
      />

      <TouchableOpacity
        onPress={() => actionSheetRef.current?.show()}
        style={responsiveStyle.imageHolder}>
        <Text style={responsiveStyle.imgTxt}>Upload Product Image</Text>
        {uploadUri ? (
          <View>
            <TouchableOpacity
              style={{position: 'absolute', zIndex: 9, right: -3, top: -9}}
              onPress={() => setUploadUri(null)}>
              <Image
                style={responsiveStyle.closeSmall}
                source={require('../../assets/images/images/close-brown.png')}
              />
            </TouchableOpacity>
            <Image
              source={{uri: uploadUri}}
              style={responsiveStyle.uploadedImage}
            />
          </View>
        ) : (
          <Entypo name="images" size={50} color="#48301f" />
        )}
      </TouchableOpacity>

      <TouchableOpacity>
        <CustomButton
          width={'100%'}
          text={type === 'create' ? 'Create' : 'Update'}
          onPress={
            type === 'create' ? handleCreateProduct : handleUpdateProduct
          }
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateProduct;
