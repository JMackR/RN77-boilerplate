import React from 'react';
import { View } from 'react-native';
import { useColorForBackgroundColor } from '@tallo/themes/hooks';
import { BackgroundProps } from './background.d';

const OVERLAY_OPACITY = 0.8;

export const Background: React.FunctionComponent<BackgroundProps> = (props) => {
  const { type, children, testID, isOverlay, borderRadius } = props;
  const background = useColorForBackgroundColor(type || 'baseBackground');

  const color = type === 'transparent' ? 'transparent' : background;
  const opacity = isOverlay && type !== 'overlay' ? OVERLAY_OPACITY : 1.0;
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity,
        backgroundColor: color,
        borderRadius: borderRadius,
      }}
      testID={testID}
      accessibilityLabel={testID}
    >
      {children}
    </View>
  );
};
