import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//screens
import {
  FirstScreenNavigator,
  SecondScreenNavigator,
  ThirdScreenNavigator,
} from "./CustomNavigation";

//screen names
const SportName = "Sports";
const MemberName = "Members";
const ManageName = "Manage";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={SportName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routeName = route.name;

            if (routeName === SportName) {
              iconName = focused ? "basketball" : "basketball-outline";
            } else if (routeName === MemberName) {
              iconName = focused ? "people" : "people-outline";
            } else if (routeName === ManageName) {
              iconName = focused ? "list" : "list-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={SportName} component={FirstScreenNavigator} />
        <Tab.Screen name={MemberName} component={SecondScreenNavigator} />
        <Tab.Screen name={ManageName} component={ThirdScreenNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
