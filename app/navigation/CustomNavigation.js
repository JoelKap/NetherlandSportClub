import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ManageSportScreen from "../screens/ManageSport";
import ViewMembersScreen from "../screens/ViewMembers";
import ManageMembersScreen from "../screens/ManageMember";
import ViewSportsScreen from "../screens/ViewSports";

const Stack = createStackNavigator();

const FirstScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="View Sports" component={ViewSportsScreen} />
      <Stack.Screen name="ManageSport" component={ManageSportScreen} />
    </Stack.Navigator>
  );
};

export { FirstScreenNavigator };

const SecondScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="View Members" component={ViewMembersScreen} />
      <Stack.Screen name="ManageMember" component={ManageMembersScreen} />
    </Stack.Navigator>
  );
};

export { SecondScreenNavigator };
