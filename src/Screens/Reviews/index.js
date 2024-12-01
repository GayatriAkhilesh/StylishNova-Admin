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
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import NavigationBack from '../../common/NavigationBack';
import {useDimensionContext} from '../../Context';

const Reviews = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
  const [reply, setReply] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const actionSheetRefReply = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Reviews',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      fetchReviews();
    }, []),
  );

  const fetchReviews = async () => {
    await firestore()
      .collection('Reviews')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Reviews Found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'red',
            textColor: '#fff',
          });
        } else {
          const reviewsArray = [];
          snapshot.docs.forEach(document => {
            const data = {id: document.id, ...document.data()};
            reviewsArray.push(data);
          });
          setReviews(reviewsArray);
        }
      });
  };

  const handleLikeReview = async review => {
    await firestore()
      .collection('Reviews')
      .doc(review.id)
      .update({likes: (review.likes || 0) + 1})
      .then(() => {
        Snackbar.show({
          text: 'Review Liked',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'green',
          textColor: '#fff',
        });
        fetchReviews();
      });
  };

  const handleReply = async () => {
    if (reply.trim() !== '') {
      await firestore()
        .collection('Reviews')
        .doc(selectedReview.id)
        .update({replies: firestore.FieldValue.arrayUnion(reply)})
        .then(() => {
          Snackbar.show({
            text: 'Reply Added Successfully',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'green',
            textColor: '#fff',
          });
          setReply('');
          actionSheetRefReply.current?.hide();
          fetchReviews();
        });
    } else {
      Snackbar.show({
        text: 'Reply cannot be empty',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
        textColor: '#fff',
      });
    }
  };

  return (
    <View style={responsiveStyle.main}>
      <ScrollView
        style={responsiveStyle.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <ActionSheet ref={actionSheetRefReply}>
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
              <Text style={responsiveStyle.ItemHedText}>Reply to Review</Text>
              <TouchableOpacity
                onPress={() => {
                  actionSheetRefReply.current?.hide();
                  setReply('');
                  setSelectedReview(null);
                }}>
                <AntDesign name="closecircleo" size={25} color={'#000'} />
              </TouchableOpacity>
            </View>

            <CustomTextInput
              value={reply}
              width={'100%'}
              border={true}
              placeholder={'Write your reply...'}
              onChangeText={text => setReply(text)}
            />
            <View style={{marginVertical: 10}}>
              <CustomButton
                width={'100%'}
                height={55}
                type="primary"
                onPress={handleReply}
                text="Submit  Reply"
              />
            </View>
          </View>
        </ActionSheet>

        <FlatList
          data={reviews}
          extraData={reviews}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => (
            <View style={responsiveStyle.reviewCard}>
              <View style={responsiveStyle.reviewHeader}>
                <Text style={responsiveStyle.reviewUser}>{item.userName}</Text>
                <TouchableOpacity onPress={() => handleLikeReview(item)}>
                  <Feather name="thumbs-up" size={20} color={'#000'} />
                </TouchableOpacity>
                <Text>{item.likes || 0}</Text>
              </View>
              <Text style={responsiveStyle.reviewText}>{item.reviewText}</Text>
              {item.reply && (
                <Text style={responsiveStyle.adminReply}>
                  Admin Reply: {item.replies}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  setSelectedReview(item);
                  actionSheetRefReply.current?.show();
                }}
                style={responsiveStyle.replyButton}>
                <Text style={responsiveStyle.replyButtonText}>Reply</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Reviews;
