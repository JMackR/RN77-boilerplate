import { ActionRightChevron } from '@tallo/assets';
import { Button, LocalSVGSource, RemoteImage, SVG, Text, Toggle } from '@tallo/core-ui-library';
import { ToggleProps } from '@tallo/core-ui-library/toggle';
import { useColorForBackgroundColor, useMargin } from '@tallo/themes';
import invariant from 'invariant';
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { formattedSubContentRowFromProps } from './common';
import { FlexibleAction, FlexibleMainContentRow, FlexibleRowProps } from './flexible-row-props';

const MARGIN_MULTIPLIER = 4;

/**
 * FlexibleRow:
 *
 * consists of different combinations, layed out in the following columns:
 *    - left icon / left action
 *    - mainContent
 *        can be multiple rows
 *    - rightNotification
 *    - right icon / right action
 */

export const FlexibleRow = memo((props: FlexibleRowProps) => {
  const { baseMargin } = useMargin();
  const { doNotApplyHorizontalPadding, testID } = props;
  const horizontalRowPadding = doNotApplyHorizontalPadding ? undefined : baseMargin * MARGIN_MULTIPLIER;
  const styles = StyleSheet.create({
    container: {
      paddingLeft: horizontalRowPadding,
      paddingRight: horizontalRowPadding,
      paddingTop: props.height ? 0 : baseMargin * MARGIN_MULTIPLIER,
      paddingBottom: props.height ? 0 : baseMargin * MARGIN_MULTIPLIER,
      minHeight: 42,
      height: props.height,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: props.transparentBg
        ? useColorForBackgroundColor('clear')
        : useColorForBackgroundColor('primary'),
    },
    flex: {
      flexGrow: 1,
    },
    leftIconColumn: {
      marginRight: 12,
      alignSelf: props.leftAlignIconTop ? 'flex-start' : 'center',
    },
    leftActionColumn: {
      paddingRight: 8,
      alignSelf: 'center',
    },
    mainContentColumn: {
      flexShrink: 1,
      flexGrow: 1,
      flexDirection: 'column',
    },
    rightIconNotificationText: {
      alignSelf: 'flex-start',
    },
    rightIconNotificationBadge: {
      alignSelf: 'flex-end',
      width: 6,
      height: 6,
      borderRadius: 10,
      position: 'absolute',
      zIndex: 1,
      right: -5,
      backgroundColor: useColorForBackgroundColor('error'),
    },
    rightIconColumn: {
      paddingLeft: 8,
    },
    rightActionColumn: {
      paddingLeft: 8,
      alignSelf: 'center',
    },
    mainContentRow: {
      height: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    mainContentRowWithPadding: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    mainContentRowLeftText: {
      alignSelf: 'center',
      flexDirection: 'row',
      // flex: 1,
      width: '80%',
      flexWrap: 'wrap',
    },
    mainContentRowLeftHelpIcon: {
      flex: 1,
      paddingLeft: 4,
      justifyContent: 'center',
    },
    mainContentRowSpacer: {
      flex: 1,
    },
    mainContentRowRightText: {
      // flex: 1,
      alignItems: 'flex-end',
      alignSelf: 'center',
    },
    subtextContainer: {
      paddingTop: 4,
    },
  });
  const renderFlexibleMainRows = () => {
    const MainText = ({ testID, children }: { testID?: string; children?: React.ReactNode }) => {
      return (
        <Text
          textType={props.mainContentTextType || 'bodyRegular1'}
          color={props.mainContentTint || 'primary'}
          testID={testID}
        >
          {children}
        </Text>
      );
    };

    if (typeof props.mainContent === 'string') {
      return (
        <MainText testID={(testID || 'flex-row') + '.main-content'}>
          {props.mainContent}
          {props.additionalMainText && <Text textType={'bodyRegular2'}>{props.additionalMainText}</Text>}
        </MainText>
      );
    }
    const outputRows: React.ReactNode[] = [];
    // flexible row can be an array of rows or just one row
    // make our propRows object
    let formattedPropRows: FlexibleMainContentRow[];
    let count: number;
    if ((props.mainContent as FlexibleMainContentRow).mainText) {
      // it's a FlexibleMainContentRow
      count = 1;
      formattedPropRows = [];
      formattedPropRows.push(props.mainContent as FlexibleMainContentRow);
    } else {
      // it's a FlexibleMainContentRow[]
      formattedPropRows = props.mainContent as FlexibleMainContentRow[];
      count = formattedPropRows.length;
    }
    // iterate through our formatted prop rows
    formattedPropRows.forEach((row, index) => {
      const lastRow = count - 1 === index;
      const mainContentTestID = (testID || 'flex-row') + '.main-content.row.';
      outputRows.push(
        <View
          key={index}
          style={lastRow ? styles.mainContentRow : styles.mainContentRowWithPadding}
          testID={mainContentTestID + index}
          accessibilityLabel={mainContentTestID + index}
        >
          <View style={styles.mainContentRowLeftText}>
            <MainText testID={mainContentTestID + index + '.main-text'}>{row.mainText}</MainText>
          </View>
          {row.mainTextHelpTooltipClickAction ? (
            <TouchableOpacity
              onPress={row.mainTextHelpTooltipClickAction}
              testID={mainContentTestID + index + '.main-text-tooltip'}
              accessibilityLabel={mainContentTestID + index + '.main-text-tooltip'}
            >
              <View style={styles.mainContentRowLeftHelpIcon}>
                <View collapsable={false} ref={row.helperIconRef}>
                  {/*<SVG tint="grey400" localSVG={{ SVG: AlertHelpLine.SVG, size: { width: 16, height: 16 } }} />*/}
                </View>
              </View>
            </TouchableOpacity>
          ) : null}
          <View style={styles.mainContentRowSpacer} />
          {row.rightText ? (
            <View style={styles.mainContentRowRightText}>
              <Text
                textType={row.rightTextType || 'bodyMedium3'}
                color={row.rightTextTint}
                testID={mainContentTestID + index + '.right-text'}
              >
                {row.rightText}
              </Text>
            </View>
          ) : null}
        </View>,
      );
    });
    return outputRows;
  };
  const renderSubContent = () => {
    const formattedSubContentRow = formattedSubContentRowFromProps(props);
    return (
      <>
        {!!formattedSubContentRow && (
          <View style={styles.subtextContainer}>
            {!!formattedSubContentRow.subText && (
              <Text
                textType={formattedSubContentRow.subTextType || 'bodyRegular2'}
                color={formattedSubContentRow.subTextTint || 'primary'}
                testID="flex-row.sub-content.sub-text"
              >
                {formattedSubContentRow.subText}
              </Text>
            )}
            {!!formattedSubContentRow.clickableSubText && (
              <Text
                textType={formattedSubContentRow.subTextType || 'bodyRegular4'}
                color={formattedSubContentRow.subTextTint || 'primary'}
                onPress={formattedSubContentRow.clickableSubTextClickAction}
                testID="flex-row.sub-content.sub-text"
              >
                {formattedSubContentRow.clickableSubText}
              </Text>
            )}
          </View>
        )}
      </>
    );
  };
  const renderAction = (action?: FlexibleAction) => {
    if (action === undefined) {
      return;
    }
    let actionItem;
    switch (action.type) {
      default:
        return;
      case 'linktext':
        invariant(typeof action.props === 'string', 'FlexibleAction props must be a string with linktext type');
        actionItem = () => (
          <Text textType="bodyHeavyMedium2" testID={(testID || 'flex-row') + '.action.text'}>
            {action.props}
          </Text>
        );
        break;
      case 'switch':
        const castedProps: ToggleProps = { ...(action.props as ToggleProps) };
        actionItem = () => <Toggle {...castedProps} testID="flex-row.action.toggle" />;
        break;
      case 'button':
        const buttonProps: ButtonPropsNative = { ...(action.props as ButtonPropsNative) };
        actionItem = () => <Button {...buttonProps} />;
        break;
    }
    return actionItem();
  };

  const iconTypes = {
    avatar: () => (
      <Avatar
        size={props.leftIcon?.size}
        borderWidth={props.leftIcon?.borderWidth}
        borderColor={props.leftIcon?.borderColor}
        source={props.leftIcon?.source}
        label={(props.leftIcon as RemoteImageProps).label}
      />
    ),
    image: () => (
      <RemoteImage
        width={props.leftIcon?.width}
        height={props.leftIcon?.height}
        resizeMode={'contain'}
        source={{ uri: (props.leftIcon as RemoteImageProps).source as string }}
      />
    ),
    svg: () => (
      <SVG
        tint={props.iconTint || 'grey600'}
        localSVG={{
          SVG: props.leftIcon.SVG,
          size: { width: props.leftIcon?.size || 24, height: props.leftIcon?.size || 24 },
          type: 'svg',
        }}
      />
    ),
    remoteSvg: () => (
      <SVG
        remoteSVG={{ uri: props.leftIcon?.source, size: { width: 100, height: 100 } }}

      />
    ),
  };

  const renderImageOrSVG = (leftIcon: RemoteImageProps | LocalSVGSource) => {
    const { type } = leftIcon;
    const renderType = iconTypes[type];
    return renderType();
  };

  const renderLeftIconOrAction = () => {
    return (
      <>
        {props.leftIcon ? (
          <View style={styles.leftIconColumn} testID="flex-row.left-action" accessibilityLabel="flex-row.left-action">
            {renderImageOrSVG(props.leftIcon)}
            {/* <SVG
              tint={props.iconTint || 'primary'}
              localSVG={{ SVG: props.leftIcon.SVG, size: { width: 24, height: 24 } }}
            /> */}
          </View>
        ) : props.leftAction ? (
          <View style={styles.leftActionColumn} testID="flex-row.left-action" accessibilityLabel="flex-row.left-action">
            {renderAction(props.leftAction)}
          </View>
        ) : null}
      </>
    );
  };
  const renderRightNotificationText = () => {
    return (
      <>
        {props.rightNotification ? (
          <View style={styles.rightIconNotificationText}>
            <Text color="error" textType="bodyRegular2" testID="flex-row.right-notification.text">
              {props.rightNotification}
            </Text>
          </View>
        ) : null}
      </>
    );
  };
  const renderRightIconOrAction = () => {
    return (
      <>
        {props.rightIcon ? (
          <RightIcon />
        ) : props.rightAction ? (
          <View
            style={styles.rightActionColumn}
            testID="flex-row.right-action"
            accessibilityLabel="flex-row.right-action"
          >
            {renderAction(props.rightAction)}
          </View>
        ) : null}
      </>
    );
  };
  const renderRightArrow = () => {
    const showArrow = !props.rightArrowHidden && props.clickAction !== undefined;
    return (
      <>
        {showArrow ? (
          <View style={styles.rightIconColumn} testID="flex-row.right-arrow" accessibilityLabel="flex-row.right-arrow">
            <SVG
              tint={props.iconTint || 'grey600'}
              localSVG={{ SVG: ActionRightChevron.SVG, size: { height: 15, width: 15 } }}
            />
          </View>
        ) : null}
      </>
    );
  };
  const RightIcon = () => {
    const nobadge = (
      <View style={styles.rightIconColumn} testID="flex-row.right-action" accessibilityLabel="flex-row.right-action">
        {props.rightIcon ? <SVG tint={props.iconTint || 'grey600'} localSVG={props.rightIcon} /> : null}
      </View>
    );
    const badge = (
      <View style={styles.rightIconColumn} testID="flex-row.right-action" accessibilityLabel="flex-row.right-action">
        {props.rightIcon ? (
          <View testID="flex-row.right-action.badge" accessibilityLabel={'flex-row.right-action.badge'}>
            <View style={styles.rightIconNotificationBadge} />
            <SVG tint={props.iconTint || 'grey600'} localSVG={props.rightIcon} />
          </View>
        ) : null}
      </View>
    );
    return props.rightNotification ? badge : nobadge;
  };
  const FlexContainer = props.clickAction ? TouchableOpacity : TouchableWithoutFeedback;
  return (
    <FlexContainer
      style={styles.flex}
      onPress={props.clickAction}
      testID={testID || 'flexible-row'}
      accessibilityLabel={testID || 'flexible-row'}
    >
      <View style={styles.container}>
        {renderLeftIconOrAction()}
        <View style={styles.mainContentColumn}>
          {renderFlexibleMainRows()}
          {renderSubContent()}
        </View>
        {renderRightNotificationText()}
        {renderRightIconOrAction()}
        {renderRightArrow()}
      </View>
    </FlexContainer>
  );
});
