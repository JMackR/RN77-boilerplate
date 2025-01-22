import { useColor, useColorForBackgroundColor, useColorForTextColor, useFont, useMargin } from '@tallo/themes/hooks';
import { ms, vs } from '@tallo/utilities';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, ImageStyle, Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle, TextInput, Text as RNText } from 'react-native';
import { Flex, Margin, Overlay, Stack, Text } from '..';
import { ActivityIndicator } from '../activity-indicator';
import { SVG } from '../image';
import { ButtonPropsBase } from './button-props';
import { isJSXElement, isLocalSVGSource, textColorForCurrentButtonType } from './button-shared';


const ANIMATION_DURATION = 100;

const styles = StyleSheet.create({
  button: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  icon: {
    marginRight: 5,
  },
  textContainer: {
    alignSelf: 'center',
    flex: 0,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
});

export const AnimatedButton = (props: ButtonPropsBase) => {
  const {
    onClick,
    onLongClick,
    placeholder,
    title,
    titleColor,
    titleDecoration,
    header,
    subtitle,
    disabled,
    testID,
    leftIcon,
    rightIcon,
    buttonColor,
    buttonType,
    buttonSize,
    onLayout,
    loading,
    centerIcon,
    doNotApplySidePadding,
    onPressHint,
    tint,
    loader,
    weight,
    clearIcon,
    titleStyle,
    overideButtonStyle,
    onComplete
  } = props;

  // invariant(buttonType !== undefined, "Must have button type");

  const { fonts } = useFont();
  const { colors } = useColor();

  const margin = useMargin().baseMargin;
  const backgroundColorAnimation = useRef(new Animated.Value(0)).current;
  const buttonStyles: StyleProp<ViewStyle> = [styles.button, titleStyle];
  const textStyles: StyleProp<TextStyle> = [styles.text];
  const subtitleStyles: StyleProp<TextStyle> = [styles.subtitle];
  const iconStyles: StyleProp<ImageStyle> = [styles.icon];

  const getBackgroundInterpolation = (from: string, to: string) => {
    return backgroundColorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [from, to],
      extrapolate: 'clamp',
    }) as any;
  };

  const applyBorderStyles = () => {
    switch (buttonType) {
      // NOTE: commented out as current designs have no borders -ls
      default:
      case 'primary':
      case 'text':
      case 'opaque':

      case 'dark':
        buttonStyles.push({
          borderRadius: ms(10),
        });
        break;
      case 'inverse':
        buttonStyles.push({
          borderWidth: 1,
          borderColor: '#e0e0e0',
          borderRadius: ms(10),
        });
        break;
      case 'disabled':
        buttonStyles.push({
          borderColor: colors.gray,
          borderRadius: ms(10),
        });
        break;
      case 'floating-button':
        buttonStyles.push({
          borderRadius: ms(8),
        });
        break;
      case 'date-picker':
        buttonStyles.push({
          borderColor: colors.gray,
          borderRadius: ms(10),
          borderWidth: 1,
        });

        break;
      case 'back-button':
        buttonStyles.push({
          borderRadius: 50,
        });
    }
  };

  const applyBackgroundColorToStyles = () => {
    let bgColor;
    switch (buttonType) {
      default:
      case 'primary':
        bgColor = getBackgroundInterpolation(colors.brand, colors.altBackground);
        break;
      case 'inverse':
        bgColor = getBackgroundInterpolation(colors.white, colors.white);
        break;
      case 'text':
        bgColor = getBackgroundInterpolation(colors.transparent, colors.transparent);
        break;
      case 'opaque':
      case 'back-button':
        bgColor = getBackgroundInterpolation(colors.opaque, colors.opaque);
        break;
      case 'dark':
        bgColor = getBackgroundInterpolation(colors.altBackground, colors.altBackground);
        break;
      case 'disabled':
        bgColor = getBackgroundInterpolation(colors.gray, colors.gray);
        break;
      case 'date-picker':
        bgColor = getBackgroundInterpolation(colors.gray, colors.gray);
        break;
      case 'floating-button':
        bgColor = getBackgroundInterpolation(
          useColorForBackgroundColor(buttonColor!),
          useColorForBackgroundColor(buttonColor!),
        );
    }
    buttonStyles.push({ backgroundColor: bgColor });
  };

  const textColorName = titleColor ? titleColor : textColorForCurrentButtonType(buttonType);
  const textColor = useColorForTextColor(textColorName);

  const applyTextColorStyles = () => {
    textStyles.push({ color: textColor });
    subtitleStyles.push({ color: textColor });
  };

  const applyTextDecorationStyles = () => {
    textStyles.push({ textDecorationLine: titleDecoration });
  };

  const applyTextDimensionStyles = () => {
    switch (buttonSize) {
      case 'large':
        textStyles.push(fonts.bodyMedium1);
        break;
      case 'medium':
        textStyles.push(fonts.bodyMedium2);
        break;
      case 'small':
        textStyles.push(fonts.bodyMedium3);
        break;
      default:
        break;
    }
  };
  const applyButtonDimensionStyles = () => {
    let buttonDimensions;
    switch (buttonSize) {
      default:
        break;
      case 'large':
        buttonDimensions = {
          paddingHorizontal: margin * vs(4),
          height: ms(57),
        };
        break;
      case 'medium':
        buttonDimensions = {
          paddingHorizontal: margin * vs(4),
          height: ms(40),
        };
        break;
      case 'small':
        buttonDimensions = {
          paddingHorizontal: margin * vs(4),
          height: ms(32),
        };
        break;
      case 'floating':
        buttonDimensions = {
          padding: margin * vs(4),
        };
        break;
      case 'back':
        buttonDimensions = {
          padding: 6,
        };
    }

    if (doNotApplySidePadding) {
      buttonDimensions = {
        ...buttonDimensions,
        paddingHorizontal: 0,
        minHeight: 30,
      };
    }
    buttonStyles.push(buttonDimensions);
  };

  const startBackgroundColorAnimation = (targetEndValue: number) => {
    requestAnimationFrame(() => {
      Animated.timing(backgroundColorAnimation, {
        toValue: targetEndValue,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    });
  };

  applyBackgroundColorToStyles();
  applyTextDimensionStyles();
  applyTextColorStyles();
  applyTextDecorationStyles();
  applyBorderStyles();
  applyButtonDimensionStyles();
  const renderLeftIcon = () => {
    let iconJSX;
    if (isJSXElement(leftIcon)) {
      iconJSX = leftIcon;
    } else if (isLocalSVGSource(leftIcon)) {
      iconJSX = (
        <Margin marginRightStep={1}>
          <SVG
            localSVG={{ ...leftIcon, size: { width: 20, height: 20 } }}
            tint={tint ? tint : titleColor}
            testID="LeftIconSVG"
          />
        </Margin>
      );
    } else {
      return undefined;
    }

    return <View style={title || subtitle ? iconStyles : {}}>{iconJSX}</View>;
  };
  const renderCenterIcon = () => {
    let iconJSX;

    if (isJSXElement(centerIcon)) {
      iconJSX = centerIcon;
    } else if (isLocalSVGSource(centerIcon)) {
      iconJSX = <SVG localSVG={{ ...centerIcon }} tint={tint ? tint : titleColor} testID="centerIconSVG" />;
    } else {
      return undefined;
    }

    return <View style={title || subtitle ? iconStyles : {}}>{iconJSX}</View>;
  };
  const renderRightIcon = () => {
    let iconJSX;
    if (isJSXElement(rightIcon)) {
      iconJSX = rightIcon;
    } else if (isLocalSVGSource(rightIcon)) {
      iconJSX = (
        <SVG
          localSVG={{ ...rightIcon, size: { width: 20, height: 20 } }}
          tint={tint ? tint : titleColor}
          testID="rightIconSVG"
        />
      );
    } else {
      return undefined;
    }

    return <View style={title || subtitle ? iconStyles : {}}>{iconJSX}</View>;
  };
  const renderClearIcon = () => {
    let iconJSX;
    if (isJSXElement(clearIcon)) {
      iconJSX = clearIcon;
    } else if (isLocalSVGSource(clearIcon)) {
      iconJSX = (
        <SVG
          localSVG={{ ...clearIcon, size: { width: 20, height: 20 } }}
          tint={tint ? tint : titleColor}
          testID="rightIconSVG"
        />
      );
    } else {
      return undefined;
    }

    return <View style={title || subtitle ? iconStyles : {}}>{iconJSX}</View>;
  };
  const clickHandler = () => {
    // AnalyticsController.trackClickableEvent({
    //     screenName,
    //     eventName: "Click",
    //     elementName: "Button",
    // });
    requestAnimationFrame(() => {
      if (onClick) {
        onClick();
      }
    });
  };
  const animation = useRef(new Animated.Value(0)).current;
  const duration = 3000;
  // console.log("animation", animation);
  const [countdown, setCountdown] = useState(duration / 1000);
  const startCountdown = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && onComplete) {
        onComplete(); // Call the onComplete callback if animation completes
      }
    });

    // Update countdown value every 100 ms
    animation.addListener(({ value }) => {
      const timeLeft = (1 - value) * (duration / 1000);
      setCountdown(Math.max(0, timeLeft.toFixed(1))); // Update countdown display
    });
  };

  // Reset the countdown animation
  const resetCountdown = () => {
    animation.stopAnimation(); // Stop the animation
    animation.setValue(0); // Reset the animation value
    setCountdown(duration / 1000); // Reset countdown display
  };


  const onPressIn = () => {
    startCountdown()
    startBackgroundColorAnimation(1);
  };

  const onPressOut = () => {
    resetCountdown()
    startBackgroundColorAnimation(0);
  };

  const ref = useRef<any>();

  // useEffect(() => {
  //   const listener = animation.addListener(({ value: num }) => {
  //     console.log("num", num);

  //     ref?.current?.setNativeProps({
  //       text: num < 0.1 ? '0' : Math.ceil(num).toString(),
  //     });
  //   });
  //   return () => {
  //     animation.removeListener(listener);
  //   };
  // }, []);

  return (
    <Flex direction={'column'}>




      <Pressable
        accessibilityRole={'button'}
        accessibilityHint={onPressHint}
        testID={testID || 'button'}
        disabled={disabled || loading}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Animated.View style={[buttonStyles, overideButtonStyle]} onLayout={onLayout}>
          <>

            {/* <Animated.View style={[{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              backgroundColor: '#BB86FC',
            }, { width: widthInterpolation }]} /> */}


            {placeholder && (
              <Text textType={weight ? weight : 'bodyMedium1'} testID={'button.placeholder'}>
                {placeholder}
              </Text>
            )}
            {title && (
              <View style={[styles.textContainer, { marginLeft: loader ? -35 : clearIcon ? -200 : 0 }]}>
                {loader && (
                  <ActivityIndicator size="small" color={textColor} animating={loading} testID="activity-indicator" />
                )}
                {title && (
                  <Text
                    textType={weight ? weight : 'bodyMedium1'}
                    testID={`${testID || 'button'}`}
                    color={textColorName}
                    textDecorationLine={titleDecoration}
                    numberOfLines={1}
                  >
                    {title}
                  </Text>
                )}
                {subtitle && (
                  <Text textType="bodyRegular3" testID={'button.subtitle'} numberOfLines={1}>
                    {subtitle}
                  </Text>
                )}
              </View>
            )}
            {centerIcon && renderCenterIcon()}
          </>
          {clearIcon && <Overlay insetRightStep={7}>{renderClearIcon()}</Overlay>}
          {rightIcon && <Overlay insetRightStep={clearIcon ? 1 : 2.5}>{renderRightIcon()}</Overlay>}
        </Animated.View>
      </Pressable>
      <Stack direction={'row'}>
        <Margin grow={1} crossAxisDistribution={'center'} marginBottomStep={2}>
          <Animated.View >
            <RNText style={{
              fontSize: 16,
              color: '#000',
              fontWeight: 'bold',
            }}>{`${countdown} seconds`}</RNText>

          </Animated.View>
        </Margin>
      </Stack>
    </Flex>
  );
};

const style = StyleSheet.create({

  countdownContainer: {
    flexDirection: 'column',


    marginLeft: 20,
    justifyContent: 'center',
  },
  countdownText: {
    padding: 5,
    height: 40,

    fontSize: 12,
    textAlign: 'center',
  },

})
