import { TransitionPresets, type StackNavigationOptions } from '@react-navigation/stack';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import { AnimationType } from '@tallo/constants';
import { Easing } from 'react-native';

/**
 * Navigation Elements
 */

/**
 * The extra click action is useful for screen-specific analytics events.
 * @param extraClickAction callback that will be called when close is pressed
 */

/**
 * Transition Configs
 */

const modalDialogOverlayTransitionConfig: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 350,
    easing: Easing.inOut(Easing.poly(2)),
    useNativeDriver: true,
  },
};

const modalCardOverlayTransitionConfig: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 10,
    useNativeDriver: true,
  },
};

/**
 * Screen Options
 */
export const FullScreenModalNoAnimateOptions: StackNavigationOptions = {
  animationEnabled: false,
};
export const FadeInFullScreen: StackNavigationOptions = {
  gestureEnabled: false,
  headerShown: false,
  // ...TransitionPresets.ModalSlideFromBottomIOS,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  // transitionSpec: {
  //   open: {
  //     animation: 'timing',

  //     config: {
  //       duration: AnimationType.Opens,
  //       easing: Easing.out(Easing.ease),
  //     },
  //   },
  //   close: {
  //     animation: 'timing',
  //     config: {
  //       duration: AnimationType.ExitsAndClosings,
  //       easing: Easing.out(Easing.ease),
  //     },
  //   },
  // },
};
export const ForcedFullScreenModalOptions: StackNavigationOptions = {
  gestureEnabled: false,
  headerShown: false,
  // ...TransitionPresets.ModalSlideFromBottomIOS,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  transitionSpec: {
    open: {
      animation: 'timing',

      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
};

export const FullScreenModalOptions: StackNavigationOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
  gestureEnabled: false,
  headerShown: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
};

export const PushPopStackAnimationOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  gestureEnabled: false,
  headerShown: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
};

export const ModalDialogOverlayOptions: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'transparent' },
  detachPreviousScreen: false,
  headerShown: false,
  cardOverlayEnabled: true,
  presentation: 'modal',
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  transitionSpec: {
    open: modalDialogOverlayTransitionConfig,
    close: modalDialogOverlayTransitionConfig,
  },
};
export const ModalDialogOverlayOptionsSide: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'transparent' },
  detachPreviousScreen: false,
  headerShown: false,
  cardOverlayEnabled: true,

  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
};
export const BottomModalOptions: StackNavigationOptions = {
  ...FullScreenModalOptions,
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  headerShown: false,
  detachPreviousScreen: false,
  cardStyleInterpolator: ({ current: { progress }, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0],
          }),
        },
      ],
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.7],
      }),
      backgroundColor: '#00BDED',
    },
  }),
};

export const ModalCardOverlayOption: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  headerShown: false,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  transitionSpec: {
    open: modalCardOverlayTransitionConfig,
    close: modalCardOverlayTransitionConfig,
  },
};
export const ModalNoGestureOverlayOption: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  gestureEnabled: false,
  headerShown: false,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),

  transitionSpec: {
    open: modalCardOverlayTransitionConfig,
    close: modalCardOverlayTransitionConfig,
  },
};
