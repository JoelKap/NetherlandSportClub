import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import memberController from "../controller/MemberController";
import MemberModel from "../models/MemberModel";

export default class ManageMemberComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: "",
      firstname: "",
      surname: "",
      firstnameError: "",
      surnameNameError: "",
      isEdit: false,
    };
  }

  componentDidMount() {
    const member = this.props.navigation.params;
    if (member.isEdit) {
      this.setState({
        firstname: member.firstname,
        surname: member.surname,
        isEdit: member.isEdit,
        memberId: member.memberId,
      });
    }
  }

  save() {
    const memberModel = this.setMemberValues();
    memberController.add(memberModel);
  }

  update() {
    const memberModel = this.setMemberValues();
    memberController.update(memberModel);
  }

  delete() {
    memberController.delete(this.state.memberId);
  }

  nameValidator() {
    if (this.state.firstname == "") {
      this.setState({ nameError: "Firstname is a required field" });
    } else if (this.state.surname == "") {
      this.setState({ nameError: "Surname is a required field" });
    } else {
      this.setState({ nameError: "" });
    }
  }

  setMemberValues() {
    const memberModel = new MemberModel();
    memberModel.id = this.state.memberId;
    memberModel.firstname = this.state.firstname;
    memberModel.surname = this.state.surname;
    return memberModel;
  }

  render() {
    return (
      <View style={{ margin: 20, marginTop: 100 }}>
        <TextInput
          placeholder="Firstname"
          onBlur={() => this.nameValidator()}
          maxLength={50}
          value={this.state.firstname}
          onChangeText={(text) => {
            this.setState({ firstname: text });
          }}
          style={{ borderWidth: 2, borderColor: "skyblue", margin: 20 }}
        />
        <Text style={{ color: "red", marginLeft: 20 }}>
          {this.state.firstnameError}
        </Text>

        <TextInput
          placeholder="Surname"
          onBlur={() => this.nameValidator()}
          maxLength={50}
          value={this.state.surname}
          onChangeText={(text) => {
            this.setState({ surname: text });
          }}
          style={{ borderWidth: 2, borderColor: "skyblue", margin: 20 }}
        />
        <Text style={{ color: "red", marginLeft: 20 }}>
          {this.state.surnameNameError}
        </Text>

        {!this.state.isEdit ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.save();
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : this.state.isEdit ? (
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.update();
              }}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={() => {
                this.delete();
              }}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
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

  buttonDelete: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "red",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
