import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import JobsScreen from './screens/JobsScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function JobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Jobs" component={JobsScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
    </Stack.Navigator>
  );
}

function BookmarksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Jobs') {
              iconName = 'briefcase-outline';
            } else if (route.name === 'Bookmarks') {
              iconName = 'bookmark-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Jobs" component={JobsStack} />
        <Tab.Screen name="Bookmarks" component={BookmarksStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
