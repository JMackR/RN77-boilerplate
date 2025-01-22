import { useColor, useColorForBackgroundColor, useColorForTextColor, useFont, useMargin } from '@tallo/themes/hooks';
import { ms, vs } from '@tallo/utilities';
import { useRef } from 'react';
import { Animated, ImageStyle, Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
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
    marginLeft: -100,
  },
  text: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
});

export const Button = (props: ButtonPropsBase) => {
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
    overRideTitleStyle
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
      case 'brand-alt':
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
      case 'outline':
        buttonStyles.push({
          borderWidth: 3,
          borderColor: '#fff',
          borderRadius: ms(10),
          backgroundColor: 'transparent',
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
          borderWidth: 0,
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
      case 'brand-alt':
        bgColor = getBackgroundInterpolation(colors.gold, colors.gold);
        break;
      case 'disabled':
        bgColor = getBackgroundInterpolation(colors.gray, colors.gray);
        break;
      case 'date-picker':
        bgColor = getBackgroundInterpolation(colors.paceBlue, colors.paceBlue);
        break;
      case 'floating-button':
        bgColor = getBackgroundInterpolation(useColorForBackgroundColor(buttonColor!), useColorForBackgroundColor(buttonColor!));
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
          <SVG localSVG={{ ...leftIcon, size: { width: 20, height: 20 } }} tint={tint ? tint : titleColor} testID="LeftIconSVG" />
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
      iconJSX = <SVG localSVG={{ ...rightIcon, size: { width: 20, height: 20 } }} tint={tint ? tint : titleColor} testID="rightIconSVG" />;
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
      iconJSX = <SVG localSVG={{ ...clearIcon, size: { width: 20, height: 20 } }} tint={tint ? tint : titleColor} testID="rightIconSVG" />;
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

  const onPressIn = () => {
    startBackgroundColorAnimation(1);
  };

  const onPressOut = () => {
    startBackgroundColorAnimation(0);
  };


  return (
    <Flex direction={'column'}>
      {header && (
        <Stack direction={'row'}>
          <Margin grow={1} direction={'row'} crossAxisDistribution={'flex-start'} marginBottomStep={2}>
            <Text textType="bodyMedium1" testID={`${testID}.header`}>
              {header}
            </Text>
          </Margin>
        </Stack>
      )}

      <Pressable
        accessibilityRole={'button'}
        accessibilityHint={onPressHint}
        testID={testID || 'button'}
        disabled={disabled || loading}
        onPress={clickHandler}
        onLongPress={onLongClick}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        delayLongPress={2000}
      >
        <Animated.View style={[buttonStyles, overideButtonStyle]} onLayout={onLayout}>
          <>
            {leftIcon && renderLeftIcon()}
            {placeholder && (
              <Text textType={'bodyMedium1'} testID={'button.placeholder'}>
                {placeholder}
              </Text>
            )}
            {title && (
              <View style={[styles.textContainer, { marginLeft: loader ? -35 : clearIcon ? -200 : 0, }, overRideTitleStyle]}>
                {loader && <ActivityIndicator size="small" color={textColor} animating={loading} testID="activity-indicator" />}
                {title && (
                  <Text
                    textType={'bodyMedium1'}
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
    </Flex>
  );
};
