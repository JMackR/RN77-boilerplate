import { FC, PropsWithChildren } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorsForBackgroundColorsCollection, shadow } from '@tallo/themes';
import { Margin } from '@tallo/core-ui-library';
import { ms } from '@tallo/utilities';

export type DialogProps = {
  onPress?: () => void;
  backgroundOveride?: string;
  top?: number;
  bottom?: number;
};
export const Dialog: FC<PropsWithChildren<DialogProps>> = (props) => {
  const [dialogBackground, scrimBackground] = useColorsForBackgroundColorsCollection(['alwaysLight', 'modal']);
  const { onPress, backgroundOveride, top, bottom } = props;
  const DIALOG_MARGIN_STEP = 6;

  const positionOveride = {
    marginTop: top,
    marginBottom: bottom,
  };
  const styles = StyleSheet.create({
    dialog: {
      backgroundColor: dialogBackground,
      borderRadius: 8,
      // width: '80%',
    },
    scrim: {
      flex: 1,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundOveride ? backgroundOveride : scrimBackground,
      ...shadow.screenShadow,
      ...positionOveride,

    },
  });
  const backPress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.scrim} activeOpacity={1} onPress={backPress}>
      <Margin marginStep={DIALOG_MARGIN_STEP}>
        <View style={styles.dialog}>{props.children}</View>
      </Margin>
    </TouchableOpacity>
  );
};
