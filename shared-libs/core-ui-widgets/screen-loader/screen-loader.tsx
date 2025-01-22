import { ActivityIndicator } from '@tallo/core-ui-library';
import { useColorsForBackgroundColorsCollection } from '@tallo/themes';
import React from 'react';
import { View } from 'react-native';

export const ScreenLoader = () => {
  const [scrimBackground] = useColorsForBackgroundColorsCollection(['loader']);
  return (
    <View
      style={{
        backgroundColor: scrimBackground,
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator testID="activityIndicator" animating={true} size={'large'} />
    </View>
  );
};
