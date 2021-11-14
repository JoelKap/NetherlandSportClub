import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import sportController from "../controller/SportController";
import SportModel from "../models/SportModel";

export default class ManageSportComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      nameError: "",
      isEdit: false,
    };
  }

  componentDidMount() {
    const sport = this.props.navigation.params;
    if (sport.isEdit) {
      this.setState({ name: sport.name, isEdit: sport.isEdit, id: sport.id });
    }
  }

  save() {
    const sportModel = new SportModel();
    sportModel.name = this.state.name;
    sportController.add(sportModel);
  }

  update() {
    const sportModel = new SportModel();
    sportModel.id = this.state.id;
    sportModel.name = this.state.name;
    sportController.update(sportModel);
  }

  delete() {
    sportController.delete(this.state.id);
  }

  nameValidator() {
    if (this.state.name == "") {
      this.setState({ nameError: "Name is a required field" });
    } else {
      this.setState({ nameError: "" });
    }
  }

  render() {
    return (
      <View style={{ margin: 20, marginTop: 100 }}>
        <TextInput
          placeholder="Sport Name"
          onBlur={() => this.nameValidator()}
          maxLength={50}
          value={this.state.name}
          onChangeText={(text) => {
            this.setState({ name: text });
          }}
          style={{ borderWidth: 2, borderColor: "skyblue", margin: 20 }}
        />
        <Text style={{ color: "red", marginLeft: 20 }}>
          {this.state.nameError}
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
