import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import NavigationBack from '../../common/NavigationBack';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDimensionContext} from '../../Context';
import style from './style';
import CustomButton from '../../Components/CustomButton';
import ActionSheet from 'react-native-actions-sheet';
import Snackbar from 'react-native-snackbar';
import CustomDropDown from '../../Components/CustomDropDown';
import firestore from '@react-native-firebase/firestore';

const OrderDetails = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const navigation = useNavigation();
  const route = useRoute();
  const order = route.params.order;
  const actionSheetRef = useRef(null);
  const [orderStatus, setOrderStatus] = useState(order?.orderStatus || '');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Orders')
      .doc(order.id)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          const updatedOrder = snapshot.data();
          setOrderStatus(
            typeof updatedOrder.orderStatus === 'string'
              ? updatedOrder.orderStatus
              : updatedOrder.orderStatus?.name || 'Unknown',
          );
        }
      });

    return () => unsubscribe();
  }, [order.id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Order Details',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  const handleUpdateOrder = async () => {
    try {
      if (order?.id && status !== '') {
        await firestore()
          .collection('Orders')
          .doc(order.id)
          .update({
            orderStatus: status,
          })
          .then(() => {
            actionSheetRef.current?.hide();
            setOrderStatus(status);
            setTimeout(() => {
              Snackbar.show({
                text: 'Order status has been updated.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: '#003200',
                textColor: 'white',
              });
            }, 1000);
          });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const statusData = [
    {name: 'Ordered'},
    {name: 'Order In Progress'},
    {name: 'Order Packed'},
    {name: 'Order Shipped'},
    {name: 'Out For Delivery'},
    {name: 'Delivered'},
    {name: 'Returned'},
    {name: 'Failed'},
  ];

  return (
    <View>
      <ActionSheet ref={actionSheetRef}>
        <View style={{padding: 15}}>
          <View style={responsiveStyle.sheetHead}>
            <Text style={responsiveStyle.sheetText}>Update Order</Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <Image
                style={responsiveStyle.close}
                source={require('../../assets/images/images/close-brown.png')}
              />
            </TouchableOpacity>
          </View>
          <View>
            <CustomDropDown
              data={statusData}
              setData={text => setStatus(text)}
              prevData={orderStatus}
            />
            <CustomButton text={'Update Order'} onPress={handleUpdateOrder} />
          </View>
        </View>
      </ActionSheet>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 150}}
        style={responsiveStyle.scrollView}>
        <View style={responsiveStyle.firstBox}>
          <View>
            <Feather name="box" size={55} color="#fff" />
          </View>
          <View style={responsiveStyle.txtView}>
            <Text style={responsiveStyle.orderId}>
              Order Id: #{order?.orderId}
            </Text>
            <Text style={responsiveStyle.orderStatus}>{orderStatus}</Text>
          </View>
        </View>
        {/* ############################################################ */}
        <View style={responsiveStyle.secondMainView}>
          <Text style={responsiveStyle.headTxt}>Items:</Text>
          {order &&
            order?.cartItems.map((item, index) => {
              return (
                <View style={responsiveStyle.disView} key={item.id || index}>
                  <View style={responsiveStyle.quaView}>
                    <Text style={responsiveStyle.quaText}>{item.quantity}</Text>
                  </View>

                  <View style={responsiveStyle.inDisView}>
                    <Text style={responsiveStyle.nameTxt}>{item.name}</Text>
                    <Text style={responsiveStyle.disText}>
                      {item.description}
                    </Text>
                  </View>
                  <Text style={responsiveStyle.priceText}>₹ {item.price}</Text>
                </View>
              );
            })}
        </View>
        {/* ####################################################### */}
        <View style={responsiveStyle.thirdMainView}>
          <Text style={responsiveStyle.headTxt}>Payment Details</Text>
          <View style={responsiveStyle.thirdView}>
            <View>
              <Text style={responsiveStyle.thirdtexts}>Bag Total</Text>
              <Text style={responsiveStyle.thirdtexts}>Coupon Discount</Text>
              <Text style={responsiveStyle.thirdtexts}>Delivery</Text>
            </View>
            <View style={responsiveStyle.inThirdView}>
              <Text style={responsiveStyle.thirdtexts}>
                ₹ {parseFloat(order.totalAmount) - 50}
              </Text>
              <Text style={responsiveStyle.couponTxt}>Apply Coupon</Text>
              <Text style={responsiveStyle.thirdtexts}>₹ 50.00</Text>
            </View>
          </View>
          <View style={responsiveStyle.totalAmtView}>
            <Text style={responsiveStyle.totalAmtText}>Total Amount</Text>
            <Text style={responsiveStyle.totalAmtText}>
              ₹ {order.totalAmount}
            </Text>
          </View>
        </View>
        {/* ############################################################### */}
        <View style={responsiveStyle.thirdMainView}>
          <Text style={responsiveStyle.headTxt}>Address:</Text>
          <Text style={responsiveStyle.thirdtexts}>{order.userName}</Text>
          <Text style={responsiveStyle.thirdtexts}>
            {order.userPhone}, {order.userEmail}
          </Text>
          <Text style={responsiveStyle.thirdtexts}>
            {order.address
              ? order.address
              : 'NA Bogunevillas, 982388, London, US'}
          </Text>
        </View>
        <View style={responsiveStyle.thirdMainView}>
          <Text style={responsiveStyle.headTxt}>Payment Method:</Text>
          <View style={responsiveStyle.card}>
            <FontAwesome5 name="credit-card" size={30} color="#000" />
            <View style={responsiveStyle.cardDetails}>
              <Text style={responsiveStyle.thirdtexts}>
                **** **** **** 1802
              </Text>
              <Text style={responsiveStyle.thirdtexts}>
                {order.paymentMethod}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={responsiveStyle.finalBtn}>
        <CustomButton
          type="primary"
          text={'Update Status'}
          onPress={() => actionSheetRef.current?.show()}
        />
      </View>
    </View>
  );
};

export default OrderDetails;
