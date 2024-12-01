import {Text, View} from 'react-native';
import {useDimensionContext} from '../../Context';
import style from './style';
import MarqueeText from 'react-native-marquee';

const CustomTabBar = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  return (
    <View style={responsiveStyle.container}>
      <Text style={responsiveStyle.footerText}>
      © Copyright 2024. All Rights Reserved
      </Text>
    </View>
  );
};

export default CustomTabBar;
