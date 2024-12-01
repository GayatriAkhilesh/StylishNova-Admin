import { useEffect, useState } from "react";
import { useDimensionContext } from "../../Context";
import style from "./style";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Accordion from "react-native-collapsible/Accordion";


const CustomDropDown = props => {
  const {data= [], setData, prevData = null} = props;

  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const [curActiveSections, setActiveSections] = useState([]);
  const [selected, setSelected] = useState('');

  const processedData = Array.isArray(data)
  ? data.map(item => (typeof item === 'object' && item.name ? item.name : item))
  : [];


  useEffect(() => {
    if (processedData.length > 0) {
      const initialValue = prevData || processedData[0];
      setSelected(initialValue);
    }
  }, [processedData, prevData]);

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  const SECTIONS = [
    { id: 0, sectionData: prevData || (data[0] ? data[0].name : '') },
  ];
  
  const _renderHeader = () => {
    return (
      <View style={responsiveStyle.detailDrop}>
        <Text style={responsiveStyle.descriptionDropHead}>{selected}</Text>
        <FontAwesome name="angle-down" size={25} color="#696969" />
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()} // Use index as key
        renderItem={({item, index}) => {
          if (item.name === selected) {
            return null;
          } else {
            return (
              <TouchableOpacity
                onPress={() => {
                  setData(item.name); // Pass item.name instead of entire object
                  setSelected(item.name);
                  setActiveSections([]);
                }}
                style={responsiveStyle.inDropItems}>
                <Text style={responsiveStyle.descriptionDropHead}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }
         
        }}
      />
    );
  };

  console.log('CustomDropDown data:', data);
console.log('CustomDropDown prevData:', prevData);


  return (
    <View>
      <Accordion
        activeSections={curActiveSections}
        sections={SECTIONS}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        underlayColor={'transparent'}
        sectionContainerStyle={{
          borderRadius: 8,
          borderWidth: 1,
          padding: 15,
          borderColor: '#696969',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderBottomColor: '#c0c0c0',
          borderBottomWidth: 1,
        }}
      />
    </View>
  );
};

export default CustomDropDown;