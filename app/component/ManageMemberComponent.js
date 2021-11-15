import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import MultiSelect from "react-native-multiple-select";

import memberController from "../controller/MemberController";
import sportController from "../controller/SportController";
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
      sports: [],
      selectedItems: [],
      userSports: [],
    };
  }

  componentDidMount() {
    this.loadSports();
  }

  save() {
    const memberModel = this.setMemberValuesToSave();
    memberController.add(memberModel);
  }

  update() {
    const memberModel = this.setMemberValuesToSave();
    memberController.update(memberModel);
  }

  delete() {
    memberController.delete(this.state.memberId);
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems: selectedItems });
  };

  nameValidator() {
    if (this.state.firstname == "") {
      this.setState({ nameError: "Firstname is a required field" });
    } else if (this.state.surname == "") {
      this.setState({ nameError: "Surname is a required field" });
    } else {
      this.setState({ nameError: "" });
    }
  }

  setMemberValuesToSave() {
    const memberModel = new MemberModel();
    memberModel.id = this.state.memberId;
    memberModel.firstname = this.state.firstname;
    memberModel.surname = this.state.surname;
    this.setUserSports(memberModel);
    return memberModel;
  }

  loadSports() {
    sportController.getAll().then((resp) => {
      this.setState({ sports: resp });
    });
    this.setMemberValuesForEdit();
  }

  setMemberValuesForEdit() {
    const member = this.props.navigation.params;
    if (member.isEdit) {
      this.setState({
        firstname: member.firstname,
        surname: member.surname,
        isEdit: member.isEdit,
        memberId: member.memberId,
      });
      if (member.userSports.length) {
        this.setState({ selectedItems: member.userSports });
      }
    }
  }

  setUserSports(memberModel) {
    memberModel.userSports = [];
    this.state.selectedItems.forEach((item) => {
      const sport = this.state.sports.find((x) => x.id === item);
      if (sport) {
        memberModel.userSports.push(sport);
      }
    });
  }

  render() {
    const { selectedItems } = this.state;
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

        <View style={styles.container}>
          {this.state.isEdit ? (
            <Text style={styles.titleText}>User Sports</Text>
          ) : (
            <Text style={styles.titleText}>Sports</Text>
          )}
          <MultiSelect
            hideTags
            items={this.state.sports}
            uniqueKey="id"
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Select Sport"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#CCC" }}
          />
        </View>

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
