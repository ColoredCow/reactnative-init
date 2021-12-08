import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from 'src/screens/HomeScreen';
import DrawerView from 'src/shared/drawer/DrawerView';

const Drawer = createDrawerNavigator();

export const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerView {...props} />}
      screenOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen
        name="home"
        options={{drawerLabel: 'Home', title: 'Home'}}
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
};
