import { observable, action } from "mobx";
import { ToastAndroid } from "react-native";

class MemberController {
  @observable members = [];

  @action getAll() {
    if (!this.members.length) {
      return fetch("https://jsonplaceholder.typicode.com/users")
        .then((resp) => resp.json())
        .then((arr) => {
          const members = [
            { memberId: "1", firstname: "Joel", surname: "Kaps" },
            { memberId: "2", firstname: "Boss", surname: "Kangi" },
          ];
          this.members = members;
          [...this.members];
          return this.members;
        })
        .catch((err) => {
          ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
        });
    } else {
      return this.members;
    }
  }

  @action add(memberModel) {
    this.initializeMembers();
    debugger;
  }

  @action update(memberModel) {
    this.initializeMembers();
    debugger;
  }

  @action delete(id) {
    this.initializeMembers();
    debugger;
  }

  initializeMembers() {
    this.members = [];
  }
}

const memberController = new MemberController();
export default memberController;
