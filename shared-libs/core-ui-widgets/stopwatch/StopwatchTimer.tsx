import { ForwardedRef, forwardRef, } from 'react';
import { StyleSheet, View } from 'react-native';

import { Canvas, Text } from '@shopify/react-native-skia';
import { StopwatchTimerMethods, StopwatchTimerProps } from './types';

const DEFAULT_FONT_SIZE = 50;
const PADDING = 40;

function pad(n: number) {
  return n < 10 ? '0' + n : n;
}
function getFormattedTime(hour, min, ten, last) {
  const mins = pad(min);
  const hours = pad(hour);
  return `${hours}:${mins}:${ten}${last}`;
}

function Stopwatch(
  { mode = 'stopwatch', initialTimeInMs, onFinish, intervalMs = 16, font, hours, minutes, tens, lastDigit }: StopwatchTimerProps,
  ref: ForwardedRef<StopwatchTimerMethods>,
) {


  const text = getFormattedTime(hours, minutes, tens, lastDigit);
  const textWidth = font.getTextWidth(text);
  const widthForFullNumbers = font.getTextWidth('00:00:00');

  return (
    <View style={[styles.container, { backgroundColor: 'transparent', width: widthForFullNumbers + PADDING }]}>
      <Canvas style={{ width: textWidth + 20, height: DEFAULT_FONT_SIZE }}>
        <Text y={DEFAULT_FONT_SIZE * 0.9} x={12} text={text} font={font} color={'gold'} />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

const StopwatchTimer = forwardRef<StopwatchTimerMethods, StopwatchTimerProps>(Stopwatch);

export default StopwatchTimer;
