import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import style from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-actions-sheet';
import Clipboard from '@react-native-clipboard/clipboard';
import NavigationBack from '../../common/NavigationBack';
import CustomButton from '../../Components/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput';
import {useDimensionContext} from '../../Context';

const Offers = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);
  const [offercode, setOffercode] = useState('');
  const [offer, setOffer] = useState('');
  const [head, setHead] = useState('');
  const [subhead, setSubhead] = useState('');
  const [type, setType] = useState(null);
  const actionSheetRef = useRef(null);
  const actionSheetRefChooseOption = useRef(null);
  const [selected, setSelected] = useState(null);
  const [offerId, setOfferId] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Offers',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setType('add');
          actionSheetRef.current?.show();
        }}>
        <AntDesign name="plussquareo" size={28} color={'#000'} />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getOffers();
    }, []),
  );

  const getOffers = async () => {
    await firestore()
      .collection('Offers')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Offers Found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'red',
            textColor: '#fff',
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOffers(objArray);
          // console.warn(objArray)
        }
      });
  };

  const handleCreate = async () => {
    if (head !== '' && subhead !== '' && offer !== '' && offercode !== '') {
      // const responseUri = await uploadImage(uploadUri);
      const product = {
        head: head,
        subhead: subhead,
        offer: offer,
        offercode: offercode,
      };
      await firestore()
        .collection('Offers')
        .add(product)
        .then(() => {
          setTimeout(() => {
            Snackbar.show({
              text: 'Offer Added Successfully',
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: 'green',
              textColor: '#fff',
            });
          }, 1000);
          actionSheetRef.current?.hide();
          setHead('');
          setSubhead('');
          setOffer('');
          setOffercode('');
          getOffers();
        });
    } else {
      Snackbar.show({
        text: 'Fill up all the fields to continue',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
        textColor: '#fff',
      });
    }
  };

  const handleEdit = () => {
    actionSheetRefChooseOption.current.hide();
    setTimeout(() => {
      setOfferId(selected.id);
      setHead(selected.head);
      setSubhead(selected.subhead);
      setOffer(selected.offer);
      setOffercode(selected.offercode);
      setType('edit');
      actionSheetRef.current?.show();
    }, 500);
  };

  const handleUpdateOffer = async () => {
    if (
      offerId &&
      head !== '' &&
      subhead !== '' &&
      offer !== '' &&
      offercode !== ''
    ) {
      // const responseUri = uploadUri.includes('file://') ? await uploadImage(uploadUri) : uploadUri ;
      const product = {
        head: head,
        subhead: subhead,
        offer: offer,
        offercode: offercode,
      };
      await firestore()
        .collection('Offers')
        .doc(offerId)
        .update(product)
        .then(() => {
          setTimeout(() => {
            Snackbar.show({
              text: 'Offer Updated Successfully',
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: 'green',
              textColor: '#fff',
            });
          }, 1000);
          actionSheetRef.current?.hide();
          setHead('');
          setSubhead('');
          setOffer('');
          setOffercode('');
          getOffers();
        });
    } else {
      Snackbar.show({
        text: 'Fill up all the fields to continue',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
        textColor: '#fff',
      });
    }
  };

  const handleCopy = async () => {
    actionSheetRefChooseOption.current.hide();
    setTimeout(() => {
      Clipboard.setString(selected.offercode);
    }, 500);
  };

  const handleDelete = async () => {
    actionSheetRefChooseOption.current.hide();
    Alert.alert('CONFIRM  DELETION', 'Do you want to DELETE this Offer ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'DELETE Offer',
        onPress: async () => {
          await firestore()
            .collection('Offers')
            .doc(selected.id)
            .delete()
            .then(() => {
              setTimeout(() => {
                Snackbar.show({
                  text: 'Offer Deleted Successfully',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: '#fff',
                  textColor: '#000',
                });
              }, 1000);
            });
          setSelected(null);
          getOffers();
        },
      },
    ]);
  };

  return (
    <View style={responsiveStyle.main}>
      <ScrollView
        style={responsiveStyle.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <ActionSheet ref={actionSheetRef}>
          <View style={{padding: 15}}>
            <View
              style={{
                paddingBottom: 15,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#48301f',
              }}>
              <Text style={responsiveStyle.ItemHedText}>
                {type === 'add' ? 'Create Offer' : 'Update Offer'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  actionSheetRef.current?.hide();
                  setType(null);
                  setSelected(null);
                  setHead('');
                  setSubhead('');
                  setOffer('');
                  setOffercode('');
                }}>
                <AntDesign name="closecircleo" size={25} color={'#000'} />
              </TouchableOpacity>
            </View>

            <CustomTextInput
              value={head}
              width={'100%'}
             border={true}
              placeholder={'Heading'}
              onChangeText={text => setHead(text)}
            />

            <CustomTextInput
              value={subhead}
              width={'100%'}
             border={true}
              placeholder={'Description'}
              onChangeText={text => setSubhead(text)}
            />

            <CustomTextInput
              value={offer}
              width={'100%'}
             border={true}
              placeholder={'Offer Value'}
              onChangeText={text => setOffer(text)}
            />

            <CustomTextInput
              value={offercode}
              width={'100%'}
             border={true}
              placeholder={'Offer Code'}
              onChangeText={text => setOffercode(text)}
            />

            <View style={{marginVertical: 5}}>
              <CustomButton
                width={'100%'}
                height={55}
                type="primary"
                handleButtonPress={
                  type === 'add' ? handleCreate : handleUpdateOffer
                }
                text={type === 'add' ? 'Create' : 'Update'}
              />
            </View>
          </View>
        </ActionSheet>

        <ActionSheet ref={actionSheetRefChooseOption}>
          <View style={{padding: 15}}>
            <View
              style={{
                paddingBottom: 15,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#48301f',
              }}>
              <Text style={responsiveStyle.ItemHedText}>Choose Action</Text>
              <TouchableOpacity
                onPress={() => actionSheetRefChooseOption.current.hide()}>
                <AntDesign name="closecircleo" size={25} color={'#000'} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                margin: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={responsiveStyle.ChooseIconView}>
                <Feather
                  onPress={handleEdit}
                  name="edit"
                  size={28}
                  color={'#000'}
                />
                <Text style={responsiveStyle.ChooseIconText}>Edit</Text>
              </View>

              <View style={responsiveStyle.ChooseIconView}>
                <AntDesign
                  onPress={handleCopy}
                  name="copy1"
                  size={28}
                  color={'#000'}
                />
                <Text style={responsiveStyle.ChooseIconText}>Copy</Text>
              </View>

              <View style={responsiveStyle.ChooseIconView}>
                <AntDesign
                  onPress={handleDelete}
                  name="delete"
                  size={28}
                  color={'#000'}
                />
                <Text style={responsiveStyle.ChooseIconText}>Delete</Text>
              </View>
            </View>
          </View>
        </ActionSheet>

        <FlatList
          data={offers}
          extraData={offers}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={responsiveStyle.contentStyle}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelected(item);
                  actionSheetRefChooseOption.current.show();
                }}
                style={responsiveStyle.renderView}>
                {/* startcode */}
                <View style={responsiveStyle.offCircleView}>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                </View>

                <View
                  style={{
                    width: '67%',
                    height: 100,
                    backgroundColor: '#c6ab80',
                    padding: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Bold',
                        color: '#48301f',
                        fontSize: 50,
                        marginTop: -7,
                        marginLeft: -4,
                      }}>
                      {item.offer}
                    </Text>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: '#48301f',
                          fontSize: 25,
                          marginTop: 10,
                        }}>
                        %
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Light',
                          color: '#48301f',
                          fontSize: 12,
                        }}>
                        OFF
                      </Text>
                    </View>
                    <View style={{marginLeft: 5}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-SemiBold',
                          color: '#000',
                          fontSize: 22,
                        }}>
                        {item.head}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color: '#000',
                          fontSize: 16,
                        }}>
                        {item.subhead}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    height: 100,
                    backgroundColor: '#c6ab80',
                  }}>
                  <View style={responsiveStyle.circleCenter}></View>
                  <View
                    style={[
                      responsiveStyle.circleCenter,
                      {marginBottom: -25 / 2},
                    ]}></View>
                </View>
                <View
                  style={{
                    width: '25%',
                    height: 100,
                    backgroundColor: '#c6ab80',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: '#000',
                      fontSize: 14,
                    }}>
                    Use Code
                  </Text>
                  <View
                    style={{
                      marginVertical: 10,
                      padding: 8,
                      justifyContent: 'center',
                      borderRadius: 15,
                      backgroundColor: '#48301f',
                      overflow: 'hidden',
                      marginRight: 7,
                      marginLeft: -5,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#FFF',
                        alignSelf: 'center',
                        fontSize: 10,
                      }}>
                      {item.offercode}
                    </Text>
                  </View>
                </View>

                {/* end code */}
                <View style={{marginLeft: -25 / 2}}>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Offers;
