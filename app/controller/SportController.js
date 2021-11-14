import { observable, action } from "mobx";
import { ToastAndroid } from "react-native";

import localhost from "../environments/local";

class SportController {
  @observable sports = [];

  @action getAll() {
    if (!this.sports.length) {
      return fetch(localhost.API_URL + "Sport")
        .then((resp) => resp.json())
        .then((arr) => {
          this.sports = arr;
          [...this.sports];
          return this.sports;
        })
        .catch((err) => {
          ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
        });
    } else {
      return this.sports;
    }
  }

  @action add(sportModel) {
    this.initializeSports();
    debugger;
  }

  @action update(sportModel) {
    this.initializeSports();
    debugger;
  }

  @action delete(id) {
    this.initializeSports();
    debugger;
  }

  initializeSports() {
    this.sports = [];
  }
}

const sportController = new SportController();
export default sportController;
