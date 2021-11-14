import React from "react";
import { View, Text } from "react-native";

export default function ManageScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert("This is happening")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Manage Screen
      </Text>
    </View>
  );
}
