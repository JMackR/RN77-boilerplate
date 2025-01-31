import React, { FC, useState } from 'react';
import { useColorForBackgroundColor } from '@tallo/themes/hooks';
import invariant from 'invariant';
import { Image, View } from 'react-native';
import { LocalImageProps } from './local-image-props';

const sanitizeAndValidateImageLayoutProps = (props: LocalImageProps) => {
  let { width, height } = props;
  const { aspectRatio } = props;
  const hasWidthAndHeight = width !== undefined && height !== undefined;
  const hasWidthOrHeight = width !== undefined || height !== undefined;
  const hasAspectRatio = aspectRatio !== undefined;
  const layoutPropsValid = hasWidthAndHeight || (hasWidthOrHeight && hasAspectRatio);

  invariant(
    layoutPropsValid === true,
    "LocalImage's layout props are not satisfied.\n(width and height) or ((width or height) and aspectRatio) must be set",
  );

  if (hasAspectRatio) {
    if (width === undefined && typeof height === 'number') {
      width = (aspectRatio as number) * (height as number);
    } else if (typeof width === 'number') {
      height = (width as number) / (aspectRatio as number);
    }
  }

  return { width, height, aspectRatio };
};

export const LocalImage: FC<LocalImageProps> = (props) => {
  const { width, height, aspectRatio } = sanitizeAndValidateImageLayoutProps(props);
  const { resizeMode, source, borderRadius, testID } = props;

  const [isLoading, setIsLoading] = useState(true);

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const LoadingView = () => (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: useColorForBackgroundColor('onBackground'),
      }}
    />
  );

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height,
        aspectRatio,
      }}
      testID={testID || 'local-image'}
      accessibilityLabel={testID || 'local-image'}
    >
      <Image
        source={source}
        resizeMode={resizeMode}
        onLoadEnd={handleLoadEnd}
        style={{
          width,
          height,
          aspectRatio,
          borderRadius,
        }}
      />
      {isLoading && <LoadingView />}
    </View>
  );
};
