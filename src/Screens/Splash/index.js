import { Image, Text, View } from "react-native"
import { useDimensionContext } from "../../Context";
import style from "./style";

const Splash = () =>{
    const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
    return(
        <View>
            <Image style={responsiveStyle.imagesplash} source={require('../../assets/images/images/STYLISH.png')}/>
        </View>
    )
}

export default Splash;