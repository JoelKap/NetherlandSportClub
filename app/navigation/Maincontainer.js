import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//screens
import {
  FirstScreenNavigator,
  SecondScreenNavigator,
} from "./CustomNavigation";

//screen names
const SportName = "Sports";
const MemberName = "Members";

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
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={SportName} component={FirstScreenNavigator} />
        <Tab.Screen name={MemberName} component={SecondScreenNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
