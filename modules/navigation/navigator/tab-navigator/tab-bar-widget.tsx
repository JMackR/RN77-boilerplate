import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationState, StackActions, useNavigationState } from '@react-navigation/native';
import { NavigableRoute } from '@tallo/navigation';
import { RootState, useAppSelector } from '@tallo/store';
import { useGetApiUserCurrentUserInfoQuery } from '@tallo/store/upwardapi';
import { useColorForBackgroundColor } from '@tallo/themes';
import { ms } from '@tallo/utilities';
import { StyleSheet, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabBarButton } from './tab-bar-button';

export const TabBarHeight = 80;

const TabStyles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
  },
});

const canPopTabStack = (state: NavigationState, stackRoute: string): boolean => {
  const homeTabInfo = state.routes.find((route) => {
    return route.name === NavigableRoute.HOME_STACK;
  });
  const homeTabInfoState = homeTabInfo?.state as NavigationState;
  if (!homeTabInfoState) {
    return false;
  }

  const stackInfo = homeTabInfoState.routes.find((route) => route.name === stackRoute);
  const stackInfoState = stackInfo?.state as NavigationState;
  if (!stackInfoState) {
    return false;
  }

  return stackInfoState.index > 0;
};

const TabBarWidget = (props: BottomTabBarProps) => {
  const { navigation } = props;
  const insets = useSafeAreaInsets();
  //const dispatch = useAppDispatch();
  const rememberNoPlanChoice = useAppSelector((state: RootState) => state.training.rememberNoPlanChoice);
  const { data } = useGetApiUserCurrentUserInfoQuery();
  const backgroundColor = useColorForBackgroundColor('brandAlt');
  const navState = useNavigationState((state) => state);

  const currentChallenge = data?.currentChallengeID;


  // Set up tab bar styles verses in the return
  const tabBarStyles = {
    backgroundColor: backgroundColor,
    paddingBottom: insets.bottom - 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: 'rgba(0,0,0,0.10)',
    shadowOffset: { width: 1, height: 1 },
    elevation: 1,
    shadowRadius: 5,
    shadowOpacity: 1,
  };

  return (
    // The container for the whole tab bar
    <View
      style={[
        {
          ...tabBarStyles,
          marginTop: ms(-10),
          alignItems: 'center',
        },
      ]}
      testID={'tab-navigator.tab-bar-widget'}
      accessibilityLabel={'tab-navigator.tab-bar-widget'}
    >
      <View
        style={[
          TabStyles.tabContainer,
          {
            // paddingTop: ms(20),
            width: isTablet() ? '70%' : '100%',
            alignItems: 'center',
            justifyContent: 'center',
            height: TabBarHeight,
          },
        ]}
      >
        {/* Build the tab buttons from the routes */}
        {props.state.routes.map((route, index: number) => {
          const { options } = props.descriptors[route.key];
          const label = options.title || route.name;
          const isFocused = props.state.index === index;
          const icon = options.tabBarIcon! as (props: { focused: boolean }) => React.ReactNode;

          const onPress = () => {
            if (!isFocused) {
              // dispatch(resetCurrentPlan()) // USED TO RESET THE PLANS
              if (
                !currentChallenge &&
                route.name === NavigableRoute.TRAINING_STACK &&
                !rememberNoPlanChoice
              ) {
                navigation.navigate(NavigableRoute.SELECT_PLAN_MODAL, { returnRoute: 'APP_STACK', isRandom: true });
              } else if (
                !currentChallenge &&
                route.name === NavigableRoute.TRAINING_STACK &&
                rememberNoPlanChoice
              ) {
                navigation.navigate(NavigableRoute.NO_PLAN_RUN_TRACKER, { returnRoute: 'APP_STACK', isRandom: true });
              } else {
                navigation.navigate(route.name);
              }
              if (canPopTabStack(navState, route.name)) {
                navigation.dispatch(StackActions.popToTop());
              }
            } else {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabBarButton
              key={index}
              index={index}
              onPress={onPress}
              active={isFocused}
              labelText={label}
              renderIcon={icon({ focused: isFocused })}
              testID={label}
            />
          );
        })}
      </View>
    </View>
  );
};

export { TabBarWidget };
