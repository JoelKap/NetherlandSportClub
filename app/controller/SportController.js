import { observable, action } from "mobx";
import { ToastAndroid } from "react-native";

import Local from "../constants/Local";

BACK_END_URL = Local.API_URL;

class SportController {
  @observable sports = [];

  @action getAll() {
    if (!this.sports.length) {
      debugger;
      //https://jsonplaceholder.typicode.com/users
      return fetch(BACK_END_URL + "/Sport")
        .then((resp) => resp.json())
        .then((arr) => {
          debugger;
          this.sports = arr;
          [...this.sports];
          return this.sports;
        })
        .catch((err) => {
          debugger;
          ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
        });
    } else {
      return this.sports;
    }
  }

  @action add(sportModel) {
    debugger;
    this.initializeMembers();
    return fetch(BACK_END_URL + "/Sport", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sportModel),
    })
      .then((resp) => resp.json())
      .then((arr) => {
        this.members = arr;
        [...this.members];
        return this.members;
      })
      .catch((err) => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      });
  }

  @action update(sportModel) {
    debugger;
    this.initializeMembers();
    return fetch(BACK_END_URL + "/Sport", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sportModel),
    })
      .then((resp) => resp.json())
      .then((arr) => {
        this.members = arr;
        [...this.members];
        return this.members;
      })
      .catch((err) => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      });
  }

  @action delete(id) {
    debugger;
    this.initializeMembers();
    return fetch(BACK_END_URL + "/Sport" + id, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((arr) => {
        this.members = arr;
        [...this.members];
        return this.members;
      })
      .catch((err) => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      });
  }

  initializeSports() {
    this.sports = [];
  }
}

const sportController = new SportController();
export default sportController;
