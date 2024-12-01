import { Text, TouchableOpacity, View } from "react-native"
import { useDimensionContext } from "../../Context";
import style from "./style";

const CustomButton = props =>{
    const {onPress, text} = props;

    const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

    return(
       <TouchableOpacity style={responsiveStyle.mainView}
       onPress={onPress}>
        <Text style={responsiveStyle.txt}>{text}</Text>
       </TouchableOpacity>
    )
}

export default CustomButton;