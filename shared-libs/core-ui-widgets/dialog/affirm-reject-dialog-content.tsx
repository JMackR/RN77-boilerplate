import React, { FC, useCallback } from 'react';
import { Button, Spacer, Margin, Stack, Text, Flex, SVG, Center } from '@tallo/core-ui-library';
import { AffirmRejectDialogProps, AffirmRejectButtonProps } from './affirm-reject-dialog-props';
import { Dialog } from './dialog';

const BUTTON_SPACER_STEP = 2;
const MARGIN = 6;
const ICON_SIZE = 48;

const RejectButton: FC<AffirmRejectButtonProps> = ({ text, onReject }) => {
  if (text) {
    return (
      <Flex direction={'column'} basis="50%" >
        <Button
          title={text}
          onClick={async () => onReject()}
          buttonType={'primary'}
          buttonSize={'large'}
          testID="ucl.affirm-reject-dialog.reject-button"
        />
      </Flex>
    );
  } else {
    return null;
  }
};

export const AffirmRejectDialog: FC<AffirmRejectDialogProps> = ({
  onAffirm,
  onReject,
  dismiss,
  affirmText,
  rejectText,
  title,
  body,
  icon,
  dismissOnReject = true,
}) => {
  const rejectHandler = useCallback(() => {
    dismissOnReject && dismiss();
    onReject && onReject();
  }, [dismissOnReject, dismiss, onReject]);

  const affirmHandler = useCallback(() => {
    dismiss();
    onAffirm();
  }, [dismiss, onAffirm]);

  return (
    <Dialog onPress={dismiss}>
      <Margin marginStep={MARGIN} >

        <Stack direction={'column'} childSeparationStep={MARGIN} crossAxisDistribution='center'>
          {icon && (
            <Center>
              <SVG
                localSVG={{
                  SVG: icon.SVG,
                  size: { width: ICON_SIZE, height: ICON_SIZE },
                }}
                tint={'primary'}
              />
            </Center>
          )}

          <Text textType={'bodyMedium1'} textAlign="left" testID="ucl.affirm-reject-dialog.title">
            {title}
          </Text>
          <Text textType={'bodyMedium1'} textAlign="left" testID="ucl.affirm-reject-dialog.body">
            {body}
          </Text>
          <Spacer sizeStep={MARGIN} direction={'column'} />
        </Stack>

        <Stack direction={'row'} childSeparationStep={BUTTON_SPACER_STEP}>
          <RejectButton text={rejectText} onReject={rejectHandler} />
          <Flex direction={'column'} basis="50%" >
            <Button
              title={affirmText}
              onClick={async () => affirmHandler()}
              buttonType={'primary'}
              buttonSize={'large'}
              testID="affirm-reject-dialog.affirm-button"
            />
          </Flex>
        </Stack>
        {/* <Stack direction={'column'} grow={1}>
          <Margin marginLeftStep={MARGIN} marginRightStep={MARGIN}>
            <Center>
              <Stack direction={'column'} childSeparationStep={MARGIN}>
                {icon && (
                  <Center>
                    <SVG
                      localSVG={{
                        SVG: icon.SVG,
                        size: { width: ICON_SIZE, height: ICON_SIZE },
                      }}
                      tint={'primary'}
                    />
                  </Center>
                )}
                <Text textType={'bodyMedium1'} textAlign="left" testID="ucl.affirm-reject-dialog.title">
                  {title}
                </Text>
                <Text textType={'bodyMedium2'} textAlign="left" testID="ucl.affirm-reject-dialog.body">
                  {body}
                </Text>
                <Spacer sizeStep={MARGIN} direction={'column'} />
              </Stack>
            </Center>
          </Margin>
          <Stack direction={'row'} childSeparationStep={BUTTON_SPACER_STEP}>
            <RejectButton text={rejectText} onReject={rejectHandler} />
            <Flex direction={'column'} grow={1} basis="100%">
              <Button
                title={affirmText}
                onClick={async () => affirmHandler()}
                buttonType={'primary'}
                buttonSize={'large'}
                testID="affirm-reject-dialog.affirm-button"
              />
            </Flex>
          </Stack>
        </Stack> */}
      </Margin>
    </Dialog>
  );
};
