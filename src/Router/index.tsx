import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import Today from 'screens/tasks/Today';
import Backlog from 'screens/tasks/Backlog';
import Completed from 'screens/tasks/Completed';
import Watching from 'screens/tasks/Watching';
import AddTask from 'screens/tasks/Add';
import MoreMain from 'screens/more/Main';
import TaskDetails from 'screens/tasks/Details';
import { Ionicons } from '@expo/vector-icons';

type TaskStackParamList = {
  TaskDetails: { id: string };
};

type TaskStackNavigationProps = StackNavigationProp<TaskStackParamList>;

const TaskStack = createStackNavigator<TaskStackParamList>();

const TaskStackScreen: React.FC<{}> = () => (
  <TaskStack.Navigator screenOptions={{ headerShown: false }}>
    <TaskStack.Screen name="TaskDetails" component={TaskDetails} />
  </TaskStack.Navigator>
);

type MoreStackParamList = {
  Main: undefined;
  Completed: undefined;
  Watching: undefined;
};

type MoreStackNavigationProps = StackNavigationProp<MoreStackParamList>;

const MoreStack = createStackNavigator();

const MoreStackScreen: React.FC<{}> = () => (
  <MoreStack.Navigator
    screenOptions={{ animationEnabled: true, headerShown: false }}
  >
    <MoreStack.Screen name="Main" component={MoreMain} />
    <MoreStack.Screen name="Watching" component={Watching} />
    <MoreStack.Screen name="Completed" component={Completed} />
  </MoreStack.Navigator>
);

type MainTabParamList = {
  Today: undefined;
  Planning: undefined;
  Watching: undefined;
  More: StackNavigationProp<MoreStackParamList>;
};

type MainTabNavigationProps = BottomTabNavigationProp<MainTabParamList>;

const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainTabScreen: React.FC<{}> = () => (
  <MainTab.Navigator screenOptions={{ headerShown: false }}>
    <MainTab.Screen
      options={{
        tabBarIcon: () => <Ionicons name="bookmark-outline" size={26} />,
      }}
      name="Today"
      component={Today}
    />
    <MainTab.Screen
      options={{
        tabBarIcon: () => <Ionicons name="albums-outline" size={26} />,
      }}
      name="Planning"
      component={Backlog}
    />
    <MainTab.Screen
      options={{ tabBarIcon: () => <Ionicons name="menu" size={26} /> }}
      name="More"
      component={MoreStackScreen}
    />
  </MainTab.Navigator>
);

type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  AddTask: undefined;
  Task: NavigatorScreenParams<TaskStackParamList>;
};

type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;

const RootStack = createStackNavigator<RootStackParamList>();

const RootStackScreen: React.FC<{}> = () => (
  <RootStack.Navigator
    screenOptions={{ animationEnabled: true, headerShown: false }}
  >
    <RootStack.Group>
      <RootStack.Screen name="Main" component={MainTabScreen} />
    </RootStack.Group>
    <RootStack.Group screenOptions={{ presentation: 'modal' }}>
      <RootStack.Screen name="AddTask" component={AddTask} />
    </RootStack.Group>
    <RootStack.Group screenOptions={{ presentation: 'modal' }}>
      <RootStack.Screen name="Task" component={TaskStackScreen} />
    </RootStack.Group>
  </RootStack.Navigator>
);

const Router: React.FC<{}> = () => (
  <NavigationContainer>
    <RootStackScreen />
  </NavigationContainer>
);

export type {
  TaskStackParamList,
  TaskStackNavigationProps,
  MoreStackParamList,
  MoreStackNavigationProps,
  MainTabParamList,
  MainTabNavigationProps,
  RootStackParamList,
  RootStackNavigationProps,
};

export default Router;
