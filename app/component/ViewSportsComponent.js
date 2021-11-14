import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import SportController from "../controller/SportController";

export default class ViewSportsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sport: {},
      isEdit: false,
      isDelete: false,
    };
  }

  componentDidMount() {
    SportController.getAll().then((resp) => {
      this.setState({ data: resp });
    });
  }

  onAddSport = () => {
    this.props.navigation.navigate("ManageSport", { isEdit: false });
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ManageSport", {
                  ...item,
                  isEdit: true,
                })
              }
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onAddSport()}
          >
            <Text style={styles.buttonText}>Add a Sport</Text>
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
