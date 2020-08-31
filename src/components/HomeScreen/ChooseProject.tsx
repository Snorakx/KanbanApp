import React, { FC, useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../reducers";
import { ITodoListReducer } from "../../reducers/todoListReducer";
import { ISingleUserList } from "../../entities/todoSingleEl";
import {
  filterTaskLevel,
  deleteList,
} from "../../actions/todoList/todoListActions";
import { db } from "../../constans/Config";
import Layout from "../../constans/Layout";
import TaskScreen from "../../components/InGreenScreen/InGreenList";
import firebase from "firebase";
import { AntDesign } from "react-native-vector-icons";

const wW = Layout.window.width;
const hW = Layout.window.height;

const buttonHeight = 0.1 * hW;
const buttonWidth = 0.3 * wW;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2C3E",
  },
  buttonListContainer: {
    flexDirection: "row",
    height: 0.15 * wW,
  },
  buttonList: {
    width: buttonWidth,
    height: buttonHeight,
    marginLeft: 0.03 * wW,
    borderRadius: wW / 50,
    marginTop: 0.04 * wW,
    backgroundColor: "#FF4D00",
  },
  addBtnIcon: {
    textAlign: "center",
    fontSize: 0.08 * wW,
    color: "white",
    marginTop: 0.04 * wW,
  },

  touchableButtonList: {
    width: buttonWidth,
    height: buttonHeight / 1.5,
    backgroundColor: "white",
  },
  addListBtn: {
    width: buttonWidth,
    height: buttonHeight,
    marginLeft: 0.03 * wW,
    borderRadius: wW / 50,
    marginTop: 0.04 * wW,
    backgroundColor: "#FF4D00",
  },
  Title: {
    color: "white",
    textAlign: "center",
    marginTop: "15%",
    position: "absolute",
    width: "80%",
    left: "10%",
    fontSize: 0.05 * wW,
  },
});

type FilterTaskLevel = ReturnType<typeof filterTaskLevel>;
type DeleteList = ReturnType<typeof deleteList>;

const ChooseProject: FC<{ switchView(formView: boolean) }> = (props) => {
  const dispatch = useDispatch();
  let user = firebase.auth().currentUser.uid;

  const todoListState = useSelector<IState, ITodoListReducer>(
    (state) => state.todoList
  );

  const goToForm = () => {
    props.switchView(true);
    // console.log(todoListState.singleUserList);
  };
  useEffect(() => {
    db.ref("users/" + user + "/tasks").on("value", (snapshot) => {
      let data = snapshot.val() || {};
      let datanum = snapshot.numChildren();
      let keys = Object.keys(data);

      keys.forEach((key) => {
        if (todoListState.singleUserList.length === datanum) {
          console.log("to samo");
        } else {
          todoListState.singleUserList.push(data[key]);
        }
      });
    });
    // Run! Like go get some data from an API.
  }, []);

  const filterList = (index: number) => {
    dispatch<FilterTaskLevel>(filterTaskLevel(index));
    db.ref("users/" + user + "/tasks").on("value", (snapshot) => {
      let data = snapshot.val() || {};
      let datanum = snapshot.numChildren();
      let keys = Object.keys(data);

      keys.forEach((key) => {
        if (todoListState.singleUserList.length === datanum) {
          console.log("to samo");
        } else {
          todoListState.singleUserList.push(data[key]);
        }
      });
    });
  };

  const deleteThisList = (id: number, index: number) => {
    dispatch<DeleteList>(deleteList(id, index));

    db.ref("users/" + user + "/lists").once("value", (snapshot) => {
      let data = snapshot.val() || {};
      let keys = Object.keys(data);

      keys.forEach((key) => {
        if (data[key].id === id) {
          db.ref("users/" + user + "/lists")
            .child(key)
            .remove();
          db.ref("users/" + user + "/tasks").once("value", (snapshot) => {
            const tasks = snapshot.val();
            let taskKeys = Object.keys(tasks);
            taskKeys.forEach((key) => {
              if (tasks[key].taskLevel === index) {
                db.ref("users/" + user + "/tasks/" + key).remove();
              } else if (tasks[key].taskLevel > index) {
                return db
                  .ref("users/" + user + "/tasks/" + key)
                  .child("taskLevel")
                  .set(firebase.database.ServerValue.increment(-1));
              }
            });
          });
        } else {
          console.log("nie tu");
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.buttonListContainer}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        {todoListState.userList.map((elem: ISingleUserList, index: number) => (
          <TouchableHighlight
            style={styles.buttonList}
            onPress={() => {
              filterList(index);
            }}
            onLongPress={() => {
              deleteThisList(elem.id, index);
            }}
            key={index}
          >
            <View style={styles.list}>
              <Text style={styles.Title}>{elem.name}</Text>
            </View>
          </TouchableHighlight>
        ))}
        <TouchableHighlight style={styles.addListBtn} onPress={goToForm}>
          <AntDesign name="plus" style={styles.addBtnIcon} />
        </TouchableHighlight>
      </ScrollView>
      <TaskScreen />
    </View>
  );
};

export default ChooseProject;
