import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { percentageFormatter } from '@tallo/utilities/strings/string-utils';
import { RootState, useAppDispatch, useAppSelector } from '@tallo/store/store';

type ProgressBarProps = {
  selectedWeekChallenge: any;
  //width?: number;
};

export const ProgressBarWeb = () => {
  const theme = useTheme();
  const selectedWeekChallenge = useAppSelector((state: RootState) => state.weeklyChallengeSelection.selectedWeekChallenge);
  const parsedProgress = selectedWeekChallenge?.info?.progress === 0 ? 0.001 : selectedWeekChallenge?.info?.progress / 100;

  return (
    <Grid container alignItems="center">
      {/*<Box>
        <Typography variant="h6" color="primary.main">
          {selectedWeekChallenge?.info?.name}
        </Typography>
      </Box>*/}
      <Grid container item alignItems="center" xs={12} height={25}>
        {parsedProgress ? (
          <>
            <LinearProgress
              variant="determinate"
              value={parsedProgress * 100}
              style={{ width: 200 * 0.7, height: 10 }}
              sx={{
                '& .MuiLinearProgress-bar': {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            />

            <Grid container item xs={2} lg={4} alignItems="center" pl={2}>
              <Typography variant="body1" color="primary">
                {percentageFormatter(parsedProgress)}
              </Typography>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};
