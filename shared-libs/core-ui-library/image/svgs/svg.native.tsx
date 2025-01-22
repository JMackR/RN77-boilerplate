
import { useColor, useColorForTextColor } from '@tallo/themes/hooks';
import { TouchableOpacity } from 'react-native';
import { LocalSVGSource } from './svg-props-base';
import { SvgPropsNative } from './svg-props';
import { SvgWithCssUri } from 'react-native-svg/css'
import invariant from 'invariant'

export const SVG = (props: SvgPropsNative) => {
  const { remoteSVG, localSVG, tint, testID, onPress, onPressHint } = props;
  const { colors } = useColor();
  const iconTintColor = useColorForTextColor(tint!);


  if (remoteSVG) {
    invariant(tint === undefined, 'The property "tint" is not supported for remoteSVGs: ' + JSON.stringify(tint))
    const { size, uri } = remoteSVG
    /**
     * NOTE TO FUTURE DEVELOPERS Typically svgs are created with fills and strokes... these svgs are made by the ignorant.
     */
    return <SvgWithCssUri {...size} uri={uri} onPress={props.onPress} />
  } else {
    const { SVG: SVGR, size } = localSVG as LocalSVGSource;
    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress} onPressHint={onPressHint} testID={testID} {...props}>
          <SVGR {...size} {...colors} fill={iconTintColor} />
        </TouchableOpacity>
      );
    }
    return <SVGR {...size} {...colors} fill={iconTintColor} />;
  }
};
