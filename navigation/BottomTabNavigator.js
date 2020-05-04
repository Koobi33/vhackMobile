import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import ScheduleScreen from '../screens/ScheduleScreen';
import VideoScreen from '../screens/VideoScreen';
import PersonalScreen from '../screens/Personal/PersonalScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });


  const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title='Личный кабинет' icon={PersonIcon} />
      <BottomNavigationTab title='Трансляция' icon={TranslationIcon} />
      <BottomNavigationTab title='Расписание' icon={ScheduleIcon} />
    </BottomNavigation>
  );

  const PersonIcon = (props) => (
    <Icon {...props} name='person-outline'/>
  );

  const TranslationIcon = (props) => (
    <Icon {...props} name='video-outline'/>
  );

  const ScheduleIcon = (props) => (
    <Icon {...props} name='calendar-outline'/>
  );


  return (
    <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />} initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
      name="Personal"
      component={PersonalScreen}
      options={{
        title: 'Личный кабинет',
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
      }}
    />
      <BottomTab.Screen
        name="Video"
        component={VideoScreen}
        options={{
          title: 'Трансляция',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-videocam" />,
        }}
      />
      <BottomTab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          title: 'Расписание',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Schedule':
      return 'Расписание';
    case 'Lesson':
      return 'Урок';
  }
}
