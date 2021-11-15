import { observable, action } from "mobx";
import { ToastAndroid } from "react-native";

import Local from "../constants/Local";

BACK_END_URL = Local.API_URL;

class MemberController {
  @observable members = [];

  @action getAll() {
    if (!this.members.length) {
      //https://jsonplaceholder.typicode.com/users
      return fetch(BACK_END_URL + "/Member")
        .then((resp) => resp.json())
        .then((arr) => {
          this.members = arr;
          [...this.members];
          return this.members;
        })
        .catch((err) => {
          ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
        });
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.members);
        }, 200);
      });
    }
  }

  @action add(memberModel) {
    this.initializeMembers();
    return fetch(BACK_END_URL + "/Member", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberModel),
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

  @action update(memberModel) {
    this.initializeMembers();
    return fetch(BACK_END_URL + "/Member", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberModel),
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
    return fetch(BACK_END_URL + "/Member" + id, {
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

  initializeMembers() {
    this.members = [];
  }
}

const memberController = new MemberController();
export default memberController;
