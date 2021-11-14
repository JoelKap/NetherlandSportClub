import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import memberController from "../controller/MemberController";

export default class ViewMembersComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      member: {},
      isEdit: false,
      isDelete: false,
    };
  }

  componentDidMount() {
    memberController.getAll().then((resp) => {
      this.setState({ data: resp });
    });
  }

  onAddMember = () => {
    this.props.navigation.navigate("ManageMember", { isEdit: false });
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ManageMember", {
                  ...item,
                  isEdit: true,
                })
              }
            >
              <Text>
                {item.firstname} {item.surname}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onAddMember()}
          >
            <Text style={styles.buttonText}>Add a Member</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#59cbbd",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
