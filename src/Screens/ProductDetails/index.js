import {useNavigation, useRoute} from '@react-navigation/native';
import {useLayoutEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import NavigationBack from '../../common/NavigationBack';
import {useDimensionContext} from '../../Context';
import style from './style';
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProductDetails = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const route = useRoute();
  const product = route.params.product;

  const [curActiveSections, setActiveSections] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Product Details',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', {product: item})}>
        <Image
          style={responsiveStyle.edit}
          source={require('../../assets/images/images/plus-product.png')}
        />
      </TouchableOpacity>
    );
  };

  const DetailsArray = [
    {
      title: 'Manufacturing Details',
      content:
        'Raw Materials: Cotton, silk, polyester, viscose, rayon, wool, and other synthetic or blended fabrics.Stitching & Assembly: High-speed sewing machines stitch the panels together. Some garments may undergo processes like embroidery or printing.Quality Control: Inspected for defects like loose threads, proper stitching, and fitting.',
    },
    {
      title: 'Product Disclaimer',
      content:
        'The products are designed for general consumer use. However, individual results and satisfaction may vary depending on personal preferences, lifestyle, and specific needs.',
    },
    {
      title: 'Features and Details',
      content:
        'Breathable, comfortable fabrics (cotton, silk, linen, and blends).Available in a wide range of sizes (XS to XXL and beyond).Trendy styles, including casual wear, formal outfits, party dresses, and activewear.Eco-friendly options available (organic cotton, recycled polyester).Easy-care options with wrinkle-free or machine-washable designs.',
    },
  ];
  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  const _renderContent = section => {
    return (
      <View>
        <Text style={responsiveStyle.detailedText}>{section.content}</Text>
      </View>
    );
  };
  const _renderHeader = section => {
    return (
      <View style={responsiveStyle.detailDrop}>
        <Text style={responsiveStyle.descriptionDropHead}>{section.title}</Text>
        <FontAwesome name="angle-down" size={25} color="#696969" />
      </View>
    );
  };

  return (
    <ScrollView>
      <Image source={{uri: product.image}} style={responsiveStyle.proImage} />
      <View style={responsiveStyle.secondView}>
        <Text style={responsiveStyle.name}>{product.name}</Text>
        <Text style={responsiveStyle.description}>{product.description}</Text>
        <Text style={responsiveStyle.price}>
          ₹ {product.price} {'  '}
          <Text style={responsiveStyle.greenTxt}>25%</Text>
        </Text>
      </View>

      <View style={responsiveStyle.descView}>
        <Text style={responsiveStyle.descriptionHead}>Product details</Text>
        <Text style={responsiveStyle.description}>
          {product?.description} Products are made from premium materials and
          undergo strict quality control to ensure durability and reliability.
          They offer superior performance, excellent craftsmanship, and
          attention to detail. Designed to meet customer expectations, these
          products provide long-lasting value and satisfaction.
        </Text>
      </View>

      <Accordion
        activeSections={curActiveSections}
        sections={DetailsArray}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        underlayColor={'transparent'}
        sectionContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderBottomColor: '#c0c0c0',
          borderBottomWidth: 1,
        }}
      />
    </ScrollView>
  );
};

export default ProductDetails;
