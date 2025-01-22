import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CircleEllipsisIcon,
  EllipsisIcon,
  FamilyFillIcon,
  FamilyIcon,
  GroupsIcon,
  HandHoldingHeartFillIcon,
  HandHoldingHeartIcon,
  HouseIcon,
  IdCardFillIcon,
  IdCardIcon,
  StatsTabIcon,
  StoreIcon,
  TrainingIcon,
} from '@tallo/assets';
import { LocalSVGSource, SVG } from '@tallo/core-ui-library';
import { NavigableRoute } from '@tallo/navigation';
import { ms } from '@tallo/utilities';
import { GroupsStackNavigator } from '../stacks/groups-stack';
import { HomeStackNavigator } from '../stacks/home-stack';
import { StatsStackNavigator } from '../stacks/stats-stack';
import { StoreStackNavigator } from '../stacks/store-stack';
import { TrainingStackNavigator } from '../stacks/training-stack';
import { NavigatorParamList } from '../types';
import { TabBarWidget } from './tab-bar-widget';

const createNavigationOptions = (title: string, fillSVG: LocalSVGSource, outlineSVG: LocalSVGSource) => () => ({
  tabBarIcon: (props: { focused: boolean }) => (
    <SVG
      localSVG={{
        SVG: props.focused ? fillSVG.SVG : outlineSVG.SVG,
        size: { width: ms(22), height: ms(22) },
      }}
      tint={props.focused ? 'brand' : 'secondary'}
    />
  ),
  title,
});

const HomeOptions = createNavigationOptions('home.NAV_TITLE', HouseIcon, HouseIcon);
const TrainingOptions = createNavigationOptions('training.NAV_TITLE', TrainingIcon, TrainingIcon);
const GroupsOptions = createNavigationOptions('groups.NAV_TITLE', GroupsIcon, GroupsIcon);
const StatsOptions = createNavigationOptions('stats.NAV_TITLE', StatsTabIcon, StatsTabIcon);
const StoreOptions = createNavigationOptions('store.NAV_TITLE', StoreIcon, StoreIcon);

export const TabRoutes = [
  {
    name: NavigableRoute.HOME_STACK,
    routes: HomeStackNavigator,
    options: HomeOptions,
  },
  {
    name: NavigableRoute.TRAINING_STACK,
    routes: TrainingStackNavigator,
    options: TrainingOptions,
  },

  {
    name: NavigableRoute.GROUPS_STACK,
    routes: GroupsStackNavigator,
    options: GroupsOptions,
  },
  {
    name: NavigableRoute.STATS_STACK,
    routes: StatsStackNavigator,
    options: StatsOptions,
  },
  {
    name: NavigableRoute.STORE_STACK,
    routes: StoreStackNavigator,
    options: StoreOptions,
  },
];

const Tabs = createBottomTabNavigator();
const tabBarFunc = (props: BottomTabBarProps) => <TabBarWidget {...props} />;

const Stack = createNativeStackNavigator<NavigatorParamList>();

export const createStack = (routes: any, screenOptions?: any) => (
  <Stack.Navigator screenOptions={screenOptions}>
    {routes.map(({ name, component, options, initialParams }) => (
      <Stack.Screen key={name} name={name} component={component} options={options} initialParams={initialParams} />
    ))}
  </Stack.Navigator>
);

export const TabNavigator = () => (
  <Tabs.Navigator
    tabBar={tabBarFunc}
    initialRouteName={NavigableRoute.HOME_STACK}
    screenOptions={{
      headerShown: false,
    }}
  >
    {TabRoutes.map(
      ({ name, options, routes, screenOptions }: { name: any; options: any; routes: any; screenOptions?: any }) => (
        <Tabs.Screen key={name} name={name} options={options}>
          {() => createStack(routes, screenOptions)}
        </Tabs.Screen>
      ),
    )}
  </Tabs.Navigator>
);
