import {
    Alert,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDimensionContext} from '../../Context';
import style from './style';
import {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import NavigationBack from '../../common/NavigationBack';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from '../../Components/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import uploadImage from '../../common/storage';

const Banners = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const [banners, setBanners] = useState([]);
  const actionSheetRef = useRef(null);
  const [name, setName] = useState('');
  const [uploadUri, setUploadUri] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Banners',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity onPress={() => actionSheetRef.current?.show()}>
        <Image
          style={responsiveStyle.edit}
          source={require('../../assets/images/images/plus-product.png')}
        />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getBanners();
    }, []),
  );

  const getBanners = async () => {
    await firestore()
      .collection('Banners')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Banner found!',
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
          setBanners(objArray);
        }
      });
  };

  const handleCreate = async () => {
    if (uploadUri && name !== '') {
      const responseUri = await uploadImage(uploadUri);

      const product = {
        name: name,
        image: responseUri,
      };

      await firestore()
        .collection('Banners')
        .add(product)
        .then(() => {
          Snackbar.show({
            text: 'Banner Added Successfully',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'green',
            textColor: 'white',
          });
          actionSheetRef.current?.hide();
          getBanners();
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

  const handleCamera = async () => {
    const options = {
      mediaType: 'photo',
    };
    await launchCamera(options, response => {
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
      if (response && response?.assets) {
        setUploadUri(response?.assets[0]?.uri);
      }
    });
  };

  const handleDelete = async bannerData => {
    Alert.alert(
      'Confirm Delete!',
      'Do you want to delete this Banner permanently from the user Dashboard!',
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
              .collection('Banners')
              .doc(bannerData.id)
              .delete()
              .then(() => {
                Snackbar.show({
                  text: 'Banner Deleted Successfully',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: 'green',
                  textColor: 'white',
                });
              });
            getBanners();
          },
        },
      ],
    );
  };


  return (
    <View style={responsiveStyle.mainView}>
      <ActionSheet ref={actionSheetRef}>
        <View style={{padding: 15}}>
          <View style={responsiveStyle.sheetHead}>
            <Text style={responsiveStyle.sheetText}>Create Banner</Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <Image
                style={responsiveStyle.close}
                source={require('../../assets/images/images/close-brown.png')}
              />
            </TouchableOpacity>
          </View>
          <View>
            <CustomTextInput
              width={'100%'}
              value={name}
              border={true}
              placeholder={'Name / Category'}
              onChangeText={text => setName(text)}
            />
            <View style={responsiveStyle.imgPickerView}>
              <TouchableOpacity
                onPress={() => actionSheetRef.current?.show()}
                style={responsiveStyle.imageHolder}>
                <Text style={responsiveStyle.imgTxt}>Upload Product Image</Text>

                {uploadUri ? (
                  <View>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        zIndex: 9,
                        right: -3,
                        top: -9,
                      }}
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
                  <Entypo
                    style={responsiveStyle.imagesImg}
                    name="images"
                    size={50}
                    color="#48301f"
                  />
                )}
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
            <CustomButton text={'Create Banner'} onPress={handleCreate} />
          </View>
        </View>
      </ActionSheet>
      <FlatList
        data={banners}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View>
              <Image
                source={{uri: item.image}}
                style={responsiveStyle.banner}
              />
              <TouchableOpacity style={{alignSelf:'center',}} onPress={() => handleDelete(item)}>
                  <MaterialCommunityIcons
                  
                    name="delete-empty-outline"
                    size={30}
                    color="#fff"
                  />
                  </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Banners;
