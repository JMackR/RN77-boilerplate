import React, { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useColor, useColorForBackgroundColor, useMargin } from '@tallo/themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { HeaderHandle } from './modal-card-header';
import { ModalCardProps } from './modal-card.props';

const CARD_CORNER_RADIUS = 8;

/**
 * ModalCard. Do not use directly. Must be a child of ModalCardHost
 * @param props
 */
export const ModalCard = (props: ModalCardProps) => {
  const { useHeaderRadius, disableDefaultNavigationBar, content, onCloseEnd, onOpenEnd, snapPoints, headerContent } =
    props;
  const { colors } = useColor();
  const sheetRef = useRef<BottomSheet>(null);
  const snap = useMemo(() => snapPoints, []);
  const margin = useMargin().baseMargin;
  const cardCornerRadius = disableDefaultNavigationBar ? (useHeaderRadius ? CARD_CORNER_RADIUS : 0) : 0;
  const { bottom: bottomSafeArea, top } = useSafeAreaInsets();
  const topInset = useHeaderRadius ? 0 : top;

  const styles = StyleSheet.create({
    content: {
      height: '100%',
      backgroundColor: useColorForBackgroundColor('alwaysLight'),
      paddingHorizontal: margin,
      borderTopLeftRadius: cardCornerRadius,
      borderTopRightRadius: cardCornerRadius,
      overflow: 'hidden',
    },
    sheetContainer: {
      backgroundColor: '#000',
      opacity: 0,
    },
  });

  const WrappedHeader = () => {
    if (headerContent) {
      return <HeaderHandle {...props} />;
    } else {
      return null;
    }
  };
  const WrappedContent = () => {
    return <View style={styles.content}>{content()}</View>;
  };
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
        detached={true}
      />
    ),
    [],
  );

  const handleSheetChange = useCallback((index: any) => {
    switch (index) {
      case -1:
        onCloseEnd && onCloseEnd();
        break;
      case 0:
        {
          handleSnapPress(-1);
          onOpenEnd && onOpenEnd();
        }
        break;
      default:
        break;
    }
  }, []);

  const handleSnapPress = useCallback((index: any) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const onAnimate = (fromIndex: number, toIndex: number) => {};

  const sheetStyle = {
    ...styles.sheetContainer,
  };
  const renderHeader = () => <WrappedHeader />;

  const renderContent = () => <WrappedContent />;
  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={snap}
      style={sheetStyle}
      enableContentPanningGesture={true}
      animateOnMount={true}
      keyboardBehavior={'interactive'}
      keyboardBlurBehavior={'restore'}
      enablePanDownToClose={true}
      onChange={handleSheetChange}
      onAnimate={onAnimate}
      handleComponent={WrappedHeader}
      backdropComponent={renderBackdrop}
    >
      {renderContent()}
    </BottomSheet>
  );
};
