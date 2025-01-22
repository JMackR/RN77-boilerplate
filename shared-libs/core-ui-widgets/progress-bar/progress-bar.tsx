import { Margin, Stack, Text } from '@tallo/core-ui-library';
import { useColor } from '@tallo/themes';
import { percentageFormatter } from '@tallo/utilities';
import * as Progress from 'react-native-progress';

type ProgressBarProps = {
  selectedWeekChallenge: any;
  width: number;
};
export const ProgressBar = ({ selectedWeekChallenge, width }: ProgressBarProps) => {
  const color = useColor();

  const parsedProgress = selectedWeekChallenge?.info?.progress === 0 ? 0.001 : selectedWeekChallenge?.info?.progress / 100;

  return (
    <Margin marginStep={2} crossAxisDistribution="center">
      <Margin marginBottomStep={2}>
        <Text textType="bodyBold1" color={'primary'}>
          {selectedWeekChallenge?.planTitle}
        </Text>
      </Margin>
      <Stack direction="row" axisDistribution="center" crossAxisDistribution="center" height={25}>
        <></>
        {parsedProgress && (
          <>
            {width && (
              <Progress.Bar
                progress={parsedProgress}
                height={10}
                width={width * 0.7}
                borderColor={color.colors.lightBlue}
                color={color.colors.lightBlue}
              />
            )}
            <Margin crossAxisDistribution="center" marginLeftStep={2}>
              <Text textType="bodyMedium1" color={'primary'}>
                {percentageFormatter(parsedProgress)}
              </Text>
            </Margin>
          </>
        )}
      </Stack>
    </Margin>
  );
};
